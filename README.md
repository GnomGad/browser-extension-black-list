# Simple black list extension

### A simple browser plugin to block access to distracting or harmful websites and links.

---

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Version](https://img.shields.io/github/v/release/GnomGad/browser-extension-black-list?color=green)](https://github.com/GnomGad/browser-extension-black-list/releases)
[![Issues](https://img.shields.io/github/issues/GnomGad/browser-extension-black-list.svg)](https://github.com/GnomGad/browser-extension-black-list/issues)


## Features

- [x] **Add URL to Block List**: Easily add full URLs to the block list to prevent access to specific websites.
- [x] **Add Domain to Block List**: Block all resources containing a specific domain or part of a URL, ignoring case sensitivity.
- [x] **View Blocked URLs/Domains**: View a list of all blocked URLs and domains in the plugin's popup.
- [x] **Remove URL/Domain from Block List**: Remove specific URLs or domains from the block list with a single click.
- [x] **Persistent Storage**: Block lists are stored using the browser's local storage, ensuring persistence across sessions.
- [x] **Dynamic Rule Update**: Automatically updates blocking rules when URLs or domains are added or removed.
- [ ] **Enable/Disable Individual Rules**: Allow users to enable or disable specific rules without removing them.


## Installation

1. Clone or download the repository.
2. Open your browser and navigate to the extensions page (e.g., `chrome://extensions/` in Chrome).
3. Enable "Developer mode".
4. Click on "Load unpacked" and select the `src` folder from the downloaded repository.

## Usage

1. Click on the extension icon to open the popup.
2. Enter the URL or domain you wish to block in the input field.
3. Click the "Add URL" button to add it to the block list.
4. View the list of blocked URLs and domains in the popup.
5. Click the "X" button next to a URL or domain to remove it from the block list.

## How It Works

### Background Script

The background script (`background.js`) handles the following:

-   On installation, it initializes the block list rules.
-   Listens for changes in the local storage to update blocking rules dynamically.
-   Uses the `chrome.declarativeNetRequest` API to set up blocking rules based on the block list.

### Popup Script

The popup script (`popup.js`) handles the following:

-   Provides an interface for adding and removing URLs and domains from the block list.
-   Displays the current list of blocked URLs and domains.
-   Sends messages to the background script to update the blocking rules when changes are made.

## License

This project is licensed under the GNU General Public License Version 3. See the [LICENSE](LICENSE) file for details.
