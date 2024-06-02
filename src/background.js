chrome.runtime.onInstalled.addListener(function () {
    updateBlockedUrls();
});

function updateBlockedUrls() {
    chrome.declarativeNetRequest.getDynamicRules((existingRules) => {
        const existingRuleIds = existingRules.map((rule) => rule.id);
        const lastFreeIndex = existingRuleIds.length === 0 ? 1 : existingRuleIds[existingRuleIds.length - 1] + 1;

        chrome.storage.local.get({ urls: [] }, function (result) {
            const urls = result.urls.filter(urlObj => urlObj.enabled);
            const rules = urls.map((urlObj, index) => {
                const isDomain = !urlObj.url.includes("://");
                const urlFilter = isDomain ? `*://*${urlObj.url}*/*` : item;

                return {
                    id: lastFreeIndex + index,
                    priority: 1,
                    action: { type: "block" },
                    condition: { urlFilter: urlFilter, resourceTypes: ["main_frame"] },
                };
            });
            chrome.declarativeNetRequest.updateDynamicRules(
                {
                    removeRuleIds: existingRuleIds,
                    addRules: rules,
                },
                () => {
                    if (chrome.runtime.lastError) {
                        console.error("Error updating rules: ", chrome.runtime.lastError);
                    }
                }
            );
        });
    });
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (namespace === "local" && changes.urls) {
        updateBlockedUrls();
    }
});
