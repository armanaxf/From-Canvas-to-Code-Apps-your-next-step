# Module 01: Tooling Setup

> Get your development environment ready and confirm everything works.

**Duration:** 40 minutes (10:00–10:40)

## Learning Objectives

By the end of this module, you will:

- Have VS Code installed and configured for Power Platform development
- Have GitHub Copilot active and making suggestions
- Have the Power Platform CLI connected to your dev environment
- Understand the basic layout of VS Code (it's not as different from the Canvas App studio as you think!)

## What You'll Build

Nothing to "build" yet - this module is about making sure your tools are ready. Think of it like laying out your paintbrushes before you start painting.

You'll verify your setup by running a few simple commands and seeing the expected output.

## Step-by-Step Instructions

### Step 1: Open VS Code (2 min)

1. Find **Visual Studio Code** in your Start menu (or Applications on Mac) and open it
2. You'll see a Welcome tab - feel free to close it
3. Take a moment to look around. Notice the **sidebar** on the left, the **editor area** in the middle, and the **status bar** at the bottom

> **Canvas App parallel:** This is your new studio. The sidebar is like the left panel in Power Apps Studio where you see your screens and components. The editor area is where you'll write code instead of dragging controls.

### Step 2: Open the integrated terminal (2 min)

1. Press **Ctrl + `** (the backtick key, usually above Tab) to open the terminal
2. A panel will appear at the bottom of VS Code - this is your command line
3. You'll type commands here instead of clicking buttons

> **Canvas App parallel:** Think of the terminal as the formula bar, but for your whole computer. Instead of writing `Set(myVar, 42)`, you'll type commands like `npm install`.

### Step 3: Verify Git is installed (2 min)

Type this in the terminal and press Enter:

```bash
git --version
```

**Expected output:** Something like `git version 2.43.0` (the exact number doesn't matter)

**If you see an error:** Raise your hand - we'll get it sorted. Or check the [setup guide](../../docs/SETUP.md#step-2-install-git).

### Step 4: Verify Node.js is installed (2 min)

```bash
node --version
```

**Expected output:** Something like `v20.11.0` (should start with `v18` or `v20`)

```bash
npm --version
```

**Expected output:** A number like `10.2.4`

**If you see an error:** Check the [setup guide](../../docs/SETUP.md#step-3-install-nodejs).

### Step 5: Verify the Power Platform CLI (3 min)

```bash
pac --version
```

**Expected output:** A version number like `1.29.5`

If you get "command not found", install it now:

```bash
npm install -g pac-cli
```

Then try `pac --version` again.

### Step 6: Connect to your Power Platform environment (5 min)

This is the important one - it connects your machine to your Dataverse environment.

```bash
pac auth create
```

A browser window will open. Sign in with your **Microsoft 365 work account** (the same one you use for Power Apps).

Once you've signed in, verify it worked:

```bash
pac auth list
```

**Expected output:** You should see your environment listed with a `*` next to the active one.

> **Canvas App parallel:** This is like adding a data connection in Canvas Apps - you're telling your tools which environment to talk to.

### Step 7: Check GitHub Copilot is active (3 min)

1. Look at the **bottom-right** of VS Code's status bar
2. You should see a small Copilot icon (it looks like two overlapping brackets)
3. If it says "Copilot" with a green dot - you're good!
4. If it's greyed out or missing, click the Extensions icon in the sidebar (it looks like four squares), search for "GitHub Copilot", and install it

**Quick test:** Create a new file (File > New File), save it as `test.ts`, and type:

```typescript
// function to add two numbers
```

Wait a second. Copilot should suggest the rest of the function in grey text. Press **Tab** to accept it.

> **Magic moment:** Copilot just wrote code for you. It'll do this throughout the workshop, helping you write things you've never written before.

Delete the test file when you're done - you won't need it.

### Step 8: Clone the workshop repo and open the starter app (10 min)

1. In the terminal, navigate to where you want to put the project:

```bash
cd ~/Desktop
```

2. Clone this repository:

```bash
git clone https://github.com/armanaxf/From-Canvas-to-Code-Apps-your-next-step.git
```

3. Open the folder in VS Code:

```bash
cd From-Canvas-to-Code-Apps-your-next-step
code .
```

(VS Code may reopen in a new window - that's fine.)

4. Navigate to the starter app and install its dependencies:

```bash
cd starter-app
npm install
```

**Expected output:** A progress bar, then "added X packages". This might take a minute or two.

5. Confirm it builds:

```bash
npm run build
```

**Expected output:** A successful build with no errors.

### Step 9: Explore the project structure (5 min)

Take a moment to look at what you've got:

1. In the VS Code sidebar, expand the `starter-app` folder
2. Open `TeamAssetRegister/components/App.tsx` - this is the main file
3. Read the comments at the top - they explain what each part does in Canvas App terms
4. Open `TeamAssetRegister/components/AssetList.tsx` and `AssetForm.tsx` too

Don't worry about understanding every line. The comments will guide you, and we'll walk through everything in Module 02.

### Checkpoint: Are You Ready?

Run through this checklist before we move on:

- [ ] VS Code is open and you can see the project files
- [ ] `git --version` shows a version number
- [ ] `node --version` shows v18 or v20
- [ ] `pac --version` shows a version number
- [ ] `pac auth list` shows your environment
- [ ] GitHub Copilot is active (green icon in status bar)
- [ ] `npm install` completed successfully in the starter-app folder
- [ ] `npm run build` completed without errors

**All green? You're ready for Module 02!**

## Key Commands / Concepts

| Command | What It Does |
|---------|-------------|
| `git --version` | Checks that Git is installed |
| `node --version` | Checks that Node.js is installed |
| `pac --version` | Checks that the Power Platform CLI is installed |
| `pac auth create` | Connects your machine to a Power Platform environment |
| `pac auth list` | Shows your connected environments |
| `` Ctrl + ` `` | Opens the terminal in VS Code |
| `npm install` | Downloads all the packages your project needs |
| `npm run build` | Compiles your project (turns your code into something Power Platform can run) |

## Stuck?

- Double-check the [setup guide](../../docs/SETUP.md) - it covers common problems and fixes
- Ask a neighbour - they might have just solved the same issue
- Raise your hand - Charles, Josh, or a helper will come to you
- Still stuck after the event? [Open an issue](../../issues/new/choose)
