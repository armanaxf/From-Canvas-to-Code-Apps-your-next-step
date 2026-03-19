# Environment Setup Guide

> **Who is this for?** Anyone attending the workshop. No terminal experience required — we'll walk you through every step.

This guide will get your machine ready for the workshop. Set aside about 20–30 minutes and follow each section in order. If something doesn't work, skip to the [Troubleshooting](#troubleshooting) section at the bottom.

---

## 1. Install Visual Studio Code

VS Code is the code editor we'll use throughout the day. Think of it as the "studio" where you'll build your Code App — similar to the Canvas App editor, but more flexible.

1. Go to [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. Click the big **Download** button (it will detect your operating system automatically)
3. Once downloaded:
   - **Windows**: Run the `.exe` file and follow the installer prompts. Leave all the default options ticked.
   - **Mac**: Open the `.zip` file, then drag **Visual Studio Code** into your **Applications** folder.
4. Open VS Code to make sure it launches. You should see a Welcome tab.

> **You'll know it worked when:** VS Code opens and you see the Welcome screen.

---

## 2. Install Git

Git is a tool that tracks changes to your files — like version history in SharePoint, but for code.

1. Go to [https://git-scm.com/downloads](https://git-scm.com/downloads)
2. Download the installer for your operating system
3. Run the installer:
   - **Windows**: Use all default settings. When it asks about your editor, choose **Visual Studio Code**.
   - **Mac**: If prompted, you may need to install the Xcode Command Line Tools — just follow the on-screen instructions.
4. To confirm it installed, open VS Code and press:
   - **Windows**: `` Ctrl + ` `` (that's the backtick key, next to the 1 key)
   - **Mac**: `` Cmd + ` ``
5. This opens the **Terminal** inside VS Code. Type the following and press Enter:
   ```
   git --version
   ```

> **You'll know it worked when:** You see something like `git version 2.44.0` (the exact number doesn't matter).

---

## 3. Install Node.js

Node.js is a tool that lets you run JavaScript — the language behind Code Apps — on your computer.

1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS** version (the one on the left — LTS stands for "Long Term Support" and is the most stable)
3. Run the installer with all default settings
4. In the VS Code terminal (the same one from the previous step), type:
   ```
   node --version
   ```

> **You'll know it worked when:** You see something like `v20.11.0` (the exact number doesn't matter, as long as it starts with `v18` or higher).

---

## 4. Install the Power Platform CLI (pac)

The Power Platform CLI lets you work with your Power Platform environments from the terminal — think of it as the command-line equivalent of the maker portal.

1. In the VS Code terminal, type:
   ```
   npm install -g microsoft-power-platform-cli
   ```
2. Wait for it to finish (you'll see the cursor blinking on a new line when it's done)
3. Confirm it installed:
   ```
   pac --version
   ```

> **You'll know it worked when:** You see a version number like `1.32.x`.

---

## 5. Activate GitHub Copilot in VS Code

GitHub Copilot is your AI pair-programmer. It'll suggest code as you type — like autocomplete, but much smarter.

1. If you don't have a GitHub account yet, create one at [https://github.com/signup](https://github.com/signup)
2. Make sure you have access to GitHub Copilot:
   - Your organisation may already provide it
   - Otherwise, start a [free trial](https://github.com/features/copilot)
3. In VS Code, click the **Extensions** icon in the left sidebar (it looks like four squares)
4. Search for **GitHub Copilot**
5. Click **Install** on the extension by GitHub
6. You'll be prompted to sign in to GitHub — follow the steps to authorise VS Code
7. Once signed in, you should see a small Copilot icon in the bottom-right status bar of VS Code

> **You'll know it worked when:** You see the Copilot icon in the VS Code status bar and it doesn't show a warning.

---

## 6. Connect to Your Dataverse Dev Environment

This connects your local machine to the Power Platform environment you'll use during the workshop.

1. In the VS Code terminal, type:
   ```
   pac auth create --environment "https://yourorg.crm11.dynamics.com"
   ```
   Replace `yourorg.crm11.dynamics.com` with the URL of your dev environment. (We'll provide this on the day if you're unsure.)
2. A browser window will open — sign in with your Microsoft 365 account
3. Once signed in, confirm the connection:
   ```
   pac auth list
   ```

> **You'll know it worked when:** You see your environment listed with a green `Active` status.

> **Don't have a dev environment yet?** No problem — we'll set one up together at the start of the workshop. You can still complete all the other steps above.

---

## Troubleshooting

### "command not found" or "'X' is not recognized"

This usually means the tool didn't install properly, or your terminal needs to be restarted.

- **Try closing and reopening VS Code**, then run the command again
- **Windows users**: Try opening VS Code as Administrator (right-click > Run as administrator)
- **Mac users**: If `pac` isn't found, try running `export PATH="$PATH:$HOME/.dotnet/tools"` in the terminal, then retry

### "Permission denied" errors on Mac

Try adding `sudo` before the command:
```
sudo npm install -g microsoft-power-platform-cli
```
You'll be asked for your Mac login password (the cursor won't move as you type — that's normal).

### GitHub Copilot isn't showing suggestions

- Make sure you're signed in to GitHub in VS Code (check the bottom-left corner for your avatar)
- Make sure your Copilot subscription is active at [https://github.com/settings/copilot](https://github.com/settings/copilot)
- Try reloading VS Code: press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac), type "Reload Window", and press Enter

### Still stuck?

Don't worry — bring your laptop on the day and we'll help you sort it out in the first session. You can also [open an issue](../../issues/new/choose) on this repo and we'll get back to you before the event.
