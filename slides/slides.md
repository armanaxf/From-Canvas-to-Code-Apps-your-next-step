---
theme: seriph
title: "From Canvas to Code Apps: Your Next Step"
info: |
  Workshop at the East of England Power Platform Summit (EoEPPS)
  1 May 2026 - Hosted by Charles Sexton & Josh Giles
author: Charles Sexton & Josh Giles
fonts:
  sans: Lora
  serif: Playfair Display
  mono: JetBrains Mono
transition: slide-left
mdc: true
---

# From Canvas to Code Apps

## Your Next Step (It's Easier Than You Think)

<div class="flourish">~ ~ ~</div>

**East of England Power Platform Summit**

1 May 2026

<br>

Hosted by **Charles Sexton** & **Josh Giles**

---
layout: center
---

# Welcome!

<br>

If you can build a Canvas App, you can build a Code App.

That's not a sales pitch. It's a fact.

<br>

Today you'll prove it to yourself.

<div class="flourish">~ ~ ~</div>

---

# What We're Building Today

A **Team Asset Register** - a real app that:

- Logs equipment (laptops, monitors, accessories)
- Assigns items to people
- Tracks their status

<br>

<div class="highlight-box">

Built with **Power Platform Code Apps**, connected to **Dataverse**, with help from **GitHub Copilot**.

</div>

<br>

By the end of the day, it'll be deployed and running in a real environment.

---

# The Journey

<br>

| Time | Module | What You'll Do |
|------|--------|---------------|
| 10:00 | **01 - Tooling Setup** | Verify your environment, meet VS Code |
| 10:40 | **02 - Planning Your App** | Map Canvas App thinking to Code Apps |
| 11:25 | **03 - Dataverse & Connectors** | Connect to real data |
| 13:30 | **04 - Governance & ALM** | Solutions, Git, source control |
| 14:55 | **05 - Deploy & Ship** | Build, package, deploy |

<br>

> Breaks, lunch, and catch-up time are built in. No one gets left behind.

---
layout: center
---

# Before We Start

<br>

Three ground rules:

<br>

<v-clicks>

**1. There are no silly questions.** Ask anything, any time.

**2. Help your neighbour.** You'll both learn faster.

**3. It's OK to not finish.** Understanding beats completion.

</v-clicks>

---
layout: section
---

# Module 01

## Tooling Setup

<div style="color: rgba(250, 246, 240, 0.7); margin-top: 1em;">

Get your development environment ready and confirm everything works.

</div>

---

# Your New Studio: VS Code

<br>

| What You Know | What You'll See |
|---------------|----------------|
| Power Apps Studio | VS Code |
| Screens panel (left) | Explorer sidebar (left) |
| Formula bar | Code editor (centre) |
| Property panel (right) | Terminal (bottom) |

<br>

<div class="terracotta-box">

Open VS Code and press **Ctrl + `** to open the terminal. That's your command line.

</div>

---

# The Verification Checklist

Run each of these in the terminal:

<br>

```bash
git --version        # Should show a version number
node --version       # Should show v18 or v20
pac --version        # Should show a version number
```

<br>

Then connect to Dataverse:

```bash
pac auth create      # Signs you in via the browser
pac auth list        # Shows your connected environments
```

<br>

> **This is like adding a data connection in Canvas Apps** - you're telling your tools which environment to talk to.

---

# Check GitHub Copilot

<br>

1. Look at the **bottom-right** of VS Code's status bar
2. You should see a Copilot icon with a green dot
3. Quick test - create a file called `test.ts` and type:

<br>

```typescript
// function to add two numbers
```

<br>

Wait a moment. Copilot will suggest the rest in grey text. Press **Tab** to accept.

<br>

<div class="highlight-box">

Copilot just wrote code for you. It'll do this throughout the workshop.

</div>

---

# Clone & Build the Starter App

<br>

```bash
# Clone the workshop repository
git clone https://github.com/armanaxf/From-Canvas-to-Code-Apps-your-next-step.git

# Open it
cd From-Canvas-to-Code-Apps-your-next-step
code .

# Install dependencies and build
cd starter-app
npm install
npm run build
```

<br>

**Expected:** Build completes with no errors.

<br>

> Think of `npm install` as downloading everything the app needs, and `npm run build` as pressing Play.

---

# Module 01 Checkpoint

<br>

- [ ] VS Code is open with the project loaded
- [ ] `git --version` works
- [ ] `node --version` works
- [ ] `pac --version` works
- [ ] `pac auth list` shows your environment
- [ ] Copilot icon is green
- [ ] `npm run build` completed without errors

<br>

<div class="highlight-box">

**All ticked?** You're ready for Module 02.

</div>

---
layout: section
---

# Module 02

## Planning Your App

<div style="color: rgba(250, 246, 240, 0.7); margin-top: 1em;">

Design your app's structure using what you already know.

</div>

---

# The Project Structure

**Files you'll work in:**

| File | What It Is | Canvas App Equivalent |
|------|-----------|----------------------|
| `App.tsx` | Main container | The App object |
| `AssetList.tsx` | Asset table | A Gallery control |
| `AssetForm.tsx` | Create/edit form | An Edit Form |
| `Header.tsx` | Top bar | Header section |

<br>

**Files you set up once and forget:**

`package.json` / `tsconfig.json` / `ControlManifest.Input.xml` / `index.ts`

<br>

> In Canvas Apps, everything lives in the studio. In Code Apps, things are separated into files. More organised, easier to find.

---

# The Rosetta Stone

<br>

| Canvas App | Code App |
|-----------|---------|
| `Set(myVar, 42)` | `const [myVar, setMyVar] = useState(42)` |
| `Navigate(Screen2)` | `setCurrentView("screen2")` |
| `OnSelect` | `onClick` |
| `ThisItem` | Function parameter |
| `Patch(Table, Record)` | `saveAsset(record)` |
| `IsBlank(value)` | `!value` |
| Screen | Component file (`.tsx`) |
| Gallery | Data-bound list component |

<br>

> Same ideas, different spelling.

---

# State = Variables (It's That Simple)

<br>

**Canvas App:**
```
Set(assets, [])
Set(currentView, "list")
Set(selectedAsset, Blank())
```

<br>

**Code App:**
```typescript
const [assets, setAssets] = useState([]);
const [currentView, setCurrentView] = useState("list");
const [selectedAsset, setSelectedAsset] = useState(null);
```

<br>

The pattern is always: `[value, updater] = useState(default)`

That's it. That's the whole concept.

---

# Try Copilot on a Real Task

<br>

1. Open `App.tsx`
2. After the state declarations, type this comment:

<br>

```typescript
// Count how many assets are in each status
```

<br>

3. Press **Enter** and wait
4. Copilot will suggest the implementation
5. Press **Tab** to accept

<br>

<div class="terracotta-box">

**This is the Copilot workflow:** Describe what you want in a comment. Let Copilot build it. You're the architect; Copilot is the builder.

</div>

---
layout: section
---

# Module 03

## Dataverse & Connectors

<div style="color: rgba(250, 246, 240, 0.7); margin-top: 1em;">

Connect to real data. This is the big one.

</div>

---

# How Code Apps Talk to Dataverse

<br>

| Canvas App | Code App |
|-----------|---------|
| Add Data Source | Configure Web API connection |
| `Assets` (all rows) | `webAPI.retrieveMultipleRecords("cr_asset")` |
| `Filter(Assets, ...)` | `retrieveMultipleRecords("cr_asset", "?$filter=...")` |
| `Patch(Assets, record)` | `webAPI.createRecord("cr_asset", record)` |
| `Remove(Assets, record)` | `webAPI.deleteRecord("cr_asset", id)` |

<br>

> Same Dataverse. Same tables. Same data. Just a different way of asking for it.

---

# The Data Service Pattern

Create a file called `dataService.ts` - it handles all Dataverse communication.

<br>

```typescript
export async function fetchAssets(
  webAPI: ComponentFramework.WebApi
): Promise<Asset[]> {
  const result = await webAPI.retrieveMultipleRecords(
    "cr_asset",
    "?$orderby=cr_name asc"
  );

  return result.entities.map((record) => ({
    id: record.cr_assetid,
    name: record.cr_name || "",
    category: getCategoryLabel(record.cr_category),
    status: getStatusLabel(record.cr_status),
    // ... more fields
  }));
}
```

<br>

> This is like your data source, but you control exactly what comes back and how it's shaped.

---

# Writing Data Back

<br>

```typescript
export async function saveAsset(
  webAPI: ComponentFramework.WebApi,
  asset: Asset,
  isNew: boolean
): Promise<void> {
  const record = {
    cr_name: asset.name,
    cr_category: getCategoryValue(asset.category),
    cr_status: getStatusValue(asset.status),
    cr_assignedto: asset.assignedTo,
    // ... more fields
  };

  if (isNew) {
    await webAPI.createRecord("cr_asset", record);
  } else {
    await webAPI.updateRecord("cr_asset", asset.id, record);
  }
}
```

<br>

> Your `Patch()` equivalent - but you've separated create and update, which gives clearer error messages.

---

# Wiring It Up

In `App.tsx`, add a `useEffect` to load data on start:

<br>

```typescript
// Load assets when the app opens - like OnVisible in Canvas Apps
React.useEffect(() => {
  const loadAssets = async () => {
    setIsLoading(true);
    const data = await fetchAssets(context.webAPI);
    setAssets(data);
    setIsLoading(false);
  };
  loadAssets();
}, []);
```

<br>

<div class="highlight-box">

`useEffect` = `OnVisible`. The empty `[]` means "run once when the screen first appears."

</div>

---

# Module 03 Checkpoint

<br>

- [ ] `dataService.ts` created with `fetchAssets` and `saveAsset`
- [ ] `App.tsx` imports and uses the data service
- [ ] The app loads data from Dataverse
- [ ] You can create a new asset
- [ ] You can edit an existing asset

<br>

<div class="terracotta-box">

**You're connected to real data.** That's the big milestone. Everything from here is about making it production-ready.

</div>

---
layout: section
---

# Module 04

## Governance & ALM

<div style="color: rgba(250, 246, 240, 0.7); margin-top: 1em;">

Solutions, Git, and source control. The habits that save you hours.

</div>

---

# Why Governance Is Easier with Code Apps

<br>

| Problem | Canvas Apps | Code Apps |
|---------|-----------|---------|
| "Who changed my app?" | Hard to tell | Git tracks every change, by whom, when |
| "What was the working version?" | Limited version history | Full history, rollback any time |
| "Two people editing at once" | Last save wins | Git merges automatically |
| "Moving dev to production" | Manual export/import | Automated pipelines |

<br>

> Code Apps don't just make building easier. They make *managing* easier too.

---

# Create a Solution

<br>

```bash
# Create a solution project
pac solution init --publisher-name EoEPPS --publisher-prefix cr

# Add your Code App to the solution
pac solution add-reference --path starter-app
```

<br>

> Same as creating a solution in the Maker Portal and adding your app. Same concept, command line instead of clicks.

---

# Your First Git Commit

<br>

```bash
# 1. See what's changed
git status

# 2. Stage everything
git add .

# 3. Save a snapshot
git commit -m "Add asset register with Dataverse connection"

# 4. Check your history
git log --oneline

# 5. Send to GitHub
git push
```

<br>

<div class="highlight-box">

Every commit is a snapshot you can return to. Unlike Canvas Apps, this history never gets deleted.

</div>

---

# Branches: No More "Last Save Wins"

<br>

```
main:      *----*----*--------*
                 \          /
feature:          *----*----*
```

<br>

```bash
git checkout -b my-feature    # Create a branch
# ... make changes ...
git commit -m "Add search"    # Save on the branch
git checkout main             # Switch back - changes are safe
```

<br>

> In Canvas Apps, two people editing = chaos. With branches, everyone works independently and merges when ready.

---
layout: section
---

# Module 05

## Deploy & Ship

<div style="color: rgba(250, 246, 240, 0.7); margin-top: 1em;">

Build, package, and deploy your finished app.

</div>

---

# Build for Production

<br>

```bash
# Clean build
npm run rebuild

# Package the solution
pac solution pack --zipfile AssetRegister_1_0_0.zip --packagetype Unmanaged
```

<br>

| Type | When | What It Means |
|------|------|--------------|
| **Unmanaged** | Development | You can edit everything |
| **Managed** | Production | Locked down, users can use but not modify |

<br>

> Like exporting a solution from the Maker Portal, but repeatable and automatable.

---

# Deploy

<br>

```bash
# Check your target environment
pac auth list

# Import the solution
pac solution import --path AssetRegister_1_0_0.zip --activate-plugins
```

<br>

Then verify in the Maker Portal:

1. Open [make.powerapps.com](https://make.powerapps.com)
2. Switch to your target environment
3. Go to **Solutions** - your Asset Register should be there
4. Open it and click **Play**

<br>

<div class="highlight-box">

Same import you'd do from the portal. Command line means it can be automated.

</div>

---

# The Deployment Pipeline (What Comes Next)

<br>

```
You push code to GitHub
        |
Pipeline triggers automatically
        |
Build: npm install -> npm run build -> pac solution pack
        |
Deploy: pac solution import -> target environment
```

<br>

You won't set this up today, but know that everything you did manually can be automated with **GitHub Actions** or **Power Platform Pipelines**.

<br>

> No more manual exports. No more "did someone remember to deploy?" The pipeline handles it.

---
layout: center
---

# What You've Accomplished Today

<br>

<v-clicks>

**1.** Set up a professional development environment

**2.** Understood Code App architecture - and mapped it to what you know

**3.** Connected to Dataverse - reading and writing real data

**4.** Set up governance - solutions, Git, source control

**5.** Built, packaged, and deployed - a real app to a real environment

</v-clicks>

<br>

<div class="flourish">~ ~ ~</div>

---
layout: center
---

# You Didn't Make a Leap Today

## You Took the Next Step

<br>

And now you know the way.

<div class="flourish">~ ~ ~</div>

<br>

- **Keep this repo** - fork it, it's yours
- **Build another app** - repeat these steps with your own idea
- **Tell someone** - the best way to learn is to teach

---

# What to Do Next

<br>

| Resource | Where |
|----------|-------|
| This repo | [github.com/armanaxf/From-Canvas-to-Code-Apps-your-next-step](https://github.com/armanaxf/From-Canvas-to-Code-Apps-your-next-step) |
| Lab walkthrough | `docs/LAB-WALKTHROUGH.md` |
| Governance guide | `docs/GOVERNANCE.md` |
| Links & references | `resources/links.md` |
| FAQ | `docs/FAQ.md` |
| Microsoft Learn (Code Apps) | [learn.microsoft.com](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/overview) |

<br>

<div class="terracotta-box">

**Got stuck after the workshop?** Open an issue on the repo. We'll help.

</div>

---
layout: center
---

# Thank You

<br>

**Charles Sexton** & **Josh Giles**

East of England Power Platform Summit

1 May 2026

<div class="flourish">~ ~ ~</div>

<br>

Please fill in the **feedback form** - it helps us make this better next time.

---
layout: center
---

# Appendix: The Complete Cheat Sheet

<br>

```bash
# Setup
git --version && node --version && pac --version
pac auth create

# Build
cd starter-app && npm install && npm run build

# Govern
pac solution init --publisher-name YourOrg --publisher-prefix cr
pac solution add-reference --path starter-app
git add . && git commit -m "Your message" && git push

# Deploy
npm run rebuild
pac solution pack --zipfile Solution.zip --packagetype Unmanaged
pac solution import --path Solution.zip
```
