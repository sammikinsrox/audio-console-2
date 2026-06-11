const tabData   = new Map();
const groupData = new Map(); // groupId → { name, color }
let sidebarPort = null;

// @chrome-only
if (typeof chrome !== 'undefined' && chrome.sidePanel) {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => {});
}
// @end-chrome-only

function broadcastTabList() {
  if (!sidebarPort) return;
  sidebarPort.postMessage({
    type: 'TAB_LIST',
    tabs: Array.from(tabData.values()),
    groups: Object.fromEntries(groupData)
  });
}

function makeTabEntry(tab) {
  return {
    tabId:    tab.id,
    title:    tab.title    || `Tab ${tab.id}`,
    favicon:  tab.favIconUrl || '',
    url:      tab.url      || '',
    hasMedia: false,
    peak:     0,
    groupId:  tab.groupId  ?? -1,
    windowId: tab.windowId ?? -1
  };
}

browser.tabs.query({}).then(tabs => {
  for (const tab of tabs) tabData.set(tab.id, makeTabEntry(tab));
  broadcastTabList();
});

// Tab group support (Firefox 134+) — guarded in case API is absent
if (typeof browser.tabGroups !== 'undefined') {
  browser.tabGroups.query({}).then(groups => {
    for (const g of groups) groupData.set(g.id, { name: g.title || '', color: g.color || '' });
    broadcastTabList();
  }).catch(() => {});
  browser.tabGroups.onCreated.addListener(g => {
    groupData.set(g.id, { name: g.title || '', color: g.color || '' });
    broadcastTabList();
  });
  browser.tabGroups.onRemoved.addListener(g => {
    groupData.delete(g.id);
    broadcastTabList();
  });
  browser.tabGroups.onUpdated.addListener(g => {
    groupData.set(g.id, { name: g.title || '', color: g.color || '' });
    broadcastTabList();
  });
}

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tabData.has(tabId)) {
    tabData.set(tabId, makeTabEntry(tab));
  } else {
    const d = tabData.get(tabId);
    if (tab.title)       d.title   = tab.title;
    if (tab.favIconUrl)  d.favicon = tab.favIconUrl;
    if (tab.url)         d.url     = tab.url;
    if (changeInfo.status === 'complete') d.hasMedia = false;
    if (tab.groupId  != null) d.groupId  = tab.groupId;
    if (tab.windowId != null) d.windowId = tab.windowId;
  }
  broadcastTabList();
});

browser.tabs.onRemoved.addListener(tabId => {
  tabData.delete(tabId);
  broadcastTabList();
});

browser.runtime.onConnect.addListener(port => {
  if (port.name !== 'sidebar') return;
  sidebarPort = port;
  broadcastTabList();

  port.onMessage.addListener(msg => {
    if (msg.type === 'SET_PARAM') {
      browser.tabs.sendMessage(msg.tabId, {
        type: 'SET_PARAM', path: msg.path, value: msg.value
      }).catch(() => {});
    }
    if (msg.type === 'SET_PARAMS') {
      browser.tabs.sendMessage(msg.tabId, {
        type: 'SET_PARAMS', params: msg.params
      }).catch(() => {});
    }
    if (msg.type === 'UPDATE_REVERB_IR') {
      browser.tabs.sendMessage(msg.tabId, {
        type: 'UPDATE_REVERB_IR', size: msg.size, decay: msg.decay
      }).catch(() => {});
    }
    if (msg.type === 'RESUME_CONTEXT') {
      browser.tabs.sendMessage(msg.tabId, { type: 'RESUME_CONTEXT' }).catch(() => {});
    }
    if (msg.type === 'GET_PARAMS') {
      browser.tabs.sendMessage(msg.tabId, { type: 'GET_PARAMS' })
        .then(params => {
          if (sidebarPort) sidebarPort.postMessage({ type: 'PARAMS_RESPONSE', tabId: msg.tabId, params });
        })
        .catch(() => {});
    }
  });

  port.onDisconnect.addListener(() => { sidebarPort = null; });
});

browser.runtime.onMessage.addListener((msg, sender) => {
  // Chrome/Opera: content script requests a tab capture stream ID.
  // @chrome-only
  if (msg.type === 'GET_TAB_STREAM_ID') {
    const tabId = sender.tab?.id;
    if (!tabId || typeof chrome === 'undefined' || !chrome.tabCapture) return false;
    return new Promise(resolve => {
      chrome.tabCapture.getMediaStreamId({ targetTabId: tabId }, streamId => {
        resolve({ streamId: streamId ?? null });
      });
    });
  }
  // @end-chrome-only

  const tabId = sender.tab?.id;
  if (!tabId) return;

  if (msg.type === 'TAB_READY') {
    if (tabData.has(tabId)) {
      tabData.get(tabId).hasMedia = msg.hasMedia;
      broadcastTabList();
    }
  }

  if (msg.type === 'ANALYSER_DATA') {
    if (tabData.has(tabId)) {
      tabData.get(tabId).peak = msg.peak;
    }
    if (sidebarPort) {
      sidebarPort.postMessage({
        type: 'ANALYSER_DATA', tabId,
        fft: msg.fft, peak: msg.peak, truePeak: msg.truePeak, rms: msg.rms, lufs: msg.lufs,
        peakL: msg.peakL, peakR: msg.peakR, correlation: msg.correlation,
        hasAudio: msg.hasAudio, ctxState: msg.ctxState,
        gateGr: msg.gateGr, expanderGr: msg.expanderGr, compGr: msg.compGr, limiterGr: msg.limiterGr
      });
    }
  }
});
