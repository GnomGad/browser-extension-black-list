$(document).ready(ready);

function displayUrls() {
    chrome.storage.local.get({ urls: [] }, function (result) {
        let urlList = $("#urlList");
        urlList.empty();
        result.urls.forEach(function (urlObj) {
            let listItem = $("<li>");
            let urlText = $("<span>").text(urlObj.url);
            let buttonGroup = $("<div>").addClass("button-group");
            let toggleButton = $("<button>")
                .text(urlObj.enabled ? "Enabled" : "Disabled")
                .addClass(urlObj.enabled ? "enabled" : "disabled");
            toggleButton.click(function () {
                toggleUrl(urlObj.url);
            });
            let deleteButton = $("<button>")
                .text("X")
                .addClass("delete");
            deleteButton.click(function () {
                removeUrl(urlObj.url);
            });
            buttonGroup.append(toggleButton).append(deleteButton);
            listItem.append(urlText).append(buttonGroup);
            urlList.append(listItem);
        });
    });
}

function toggleUrl(url) {
    chrome.storage.local.get({ urls: [] }, function (result) {
        let urls = result.urls.map(urlObj => {
            if (urlObj.url === url) {
                urlObj.enabled = !urlObj.enabled;
            }
            return urlObj;
        });
        chrome.storage.local.set({ urls: urls }, function () {
            displayUrls();
        });
    });
}

function removeUrl(url) {
    chrome.storage.local.get({ urls: [] }, function (result) {
        let urls = result.urls.filter(urlObj => urlObj.url !== url);
        chrome.storage.local.set({ urls: urls }, function () {
            displayUrls();
        });
    });
}

function ready() {
    displayUrls();

    $("#urlInput").on("input", function () {
        let value = $(this).val();
        let filteredValue = value.replace(/[^a-zA-Z0-9.:\/\-]/g, "");
        if (value !== filteredValue) {
            $(this).val(filteredValue);
            $("#resultMessage").text("Only English characters, numbers, and certain symbols (.:/-) are allowed.");
        } else {
            $("#resultMessage").text("");
        }
    });

    $("#addUrlButton").click(function () {
        let url = $("#urlInput").val();
        if (url) {
            chrome.storage.local.get({ urls: [] }, function (result) {
                let urls = result.urls;
                if (!urls.some(urlObj => urlObj.url === url)) {
                    urls.push({ url: url, enabled: true });
                    chrome.storage.local.set({ urls: urls }, function () {
                        $("#resultMessage").text("URL successfully added!");
                        $("#urlInput").val("");
                        displayUrls();
                    });
                } else {
                    $("#resultMessage").text("URL already exists.");
                }
            });
        } else {
            $("#resultMessage").text("Please enter a valid URL.");
        }
    });
}
