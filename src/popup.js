$(document).ready(ready);
function displayUrls() {
    chrome.storage.local.get({ urls: [] }, function (result) {
        let urlList = $("#urlList");
        urlList.empty();
        result.urls.forEach(function (url) {
            let listItem = $("<li>").text(url);
            let deleteButton = $("<button>").text("X");
            deleteButton.click(function () {
                removeUrl(url);
            });
            listItem.append(deleteButton);
            urlList.append(listItem);
        });
    });
}
function removeUrl(url) {
    chrome.storage.local.get({ urls: [] }, function (result) {
        let urls = result.urls.filter((item) => item !== url);
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
                if (!urls.includes(url)) {
                    urls.push(url);
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
