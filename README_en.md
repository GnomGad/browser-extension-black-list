# NoBan by IP

[Russian](README)

### A simple browser extension to block access to specific websites when using a specified IPv4.

---

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Version](https://img.shields.io/github/v/release/GnomGad/browser-extension-black-list?color=green)](https://github.com/GnomGad/browser-extension-black-list/releases)
[![Issues](https://img.shields.io/github/issues/GnomGad/browser-extension-black-list.svg)](https://github.com/GnomGad/browser-extension-black-list/issues)

## Problem

When using a certain IPv4, accounts are instantly banned on some services. This extension is designed to block access to these sites to prevent automatic bans when using the specified IPv4. As a workaround, either use VPN or Proxy.

## Solution

Create a browser extension where I can enter a list of IPv4 addresses and a list of domains/URLs to block access to when using the specified IPv4.

## Features

-   [x] **Add URL/Domain to Blacklist**: Block all resources containing a specific domain or part of a URL, case insensitive.
-   [x] **View Blocked URLs/Domains**: View a list of all blocked URLs and domains in the plugin's popup.
-   [x] **Remove URL/Domain from Blacklist**: Remove specific URLs or domains from the blacklist with a single click.
-   [x] **Persistent Storage**: Blacklists are stored using the browser's local storage, ensuring persistence across sessions.
-   [x] **Dynamic Rule Update**: Automatically updates blocking rules when URLs or domains are added or removed.
-   [x] **Enable/Disable Individual Rules**: Allows users to enable or disable specific rules without removing them.
-   [ ] **IPv4 Integration**: Support your API to block sites when using the specified IPv4.
-   [ ] **Export/Import Rules**: Ability to export and import blocking rules for convenient management and transfer of settings.

## Installation

1. Clone or download the repository.
2. Open your browser and navigate to the extensions page (e.g., `chrome://extensions/` in Chrome).
3. Enable "Developer mode".
4. Click "Load unpacked" and select the `src` folder from the downloaded repository.

## Usage

1. Click the extension icon to open the popup.
2. Enter the URL or domain you wish to block in the input field.
3. Click the "Add URL" button to add it to the blacklist.
4. View the list of blocked URLs and domains in the popup.
5. Click the "X" button next to a URL or domain to remove it from the blacklist.

## How It Works

### Background Script

The background script (`background.js`) performs the following tasks:

-   On installation, initializes the blacklist rules.
-   Listens for changes in local storage to dynamically update blocking rules.
-   Uses the `chrome.declarativeNetRequest` API to set up blocking rules based on the blacklist.

### Popup Script

The popup script (`popup.js`) performs the following tasks:

-   Provides an interface for adding and removing URLs and domains from the blacklist.
-   Displays the current list of blocked URLs and domains.
-   Sends messages to the background script to update blocking rules when changes are made.

## License

This project is licensed under the GNU General Public License Version 3. See the [LICENSE](LICENSE) file for details.
