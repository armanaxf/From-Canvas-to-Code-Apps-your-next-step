# Lab Walkthrough

> The full story of what you'll build today, from start to finish.

This guide ties all five modules together into one continuous narrative. Use it as a reference during the workshop, or read it end-to-end afterwards to remind yourself of the full flow.

---

## The Big Picture

You're going to build a **Team Asset Register** - an app that lets a team log equipment (laptops, monitors, accessories), assign items to people, and track their status. By the end of the day, it'll be a real, deployed app connected to a real Dataverse database.

Here's the journey:

```
Module 01          Module 02          Module 03          Module 04          Module 05
Set Up Tools  →  Understand the  →  Connect to      →  Package &       →  Deploy &
& Environment    Code App            Dataverse           Source Control     Ship It
                 Structure           (Real Data!)        (Git & Solutions)
```

---

## Module 01: Setting Up Your Workbench (40 min)

### What's happening

You're preparing your development environment - installing tools, checking connections, and getting familiar with VS Code.

### The flow

1. **Open VS Code** - your new studio. The sidebar on the left is like the Screens panel in Canvas Apps. The editor area in the middle is where you write code.

2. **Open the terminal** (Ctrl + `) - this is your command line. You'll type short commands here to install things, run your app, and manage your code.

3. **Verify your tools** - you'll run three simple commands:
   - `git --version` - is Git installed?
   - `node --version` - is Node.js installed?
   - `pac --version` - is the Power Platform CLI installed?

4. **Connect to Dataverse** - `pac auth create` opens a browser window where you sign in with your work account. This connects your machine to your Power Platform environment.

5. **Check Copilot** - the Copilot icon in the bottom-right should show a green dot. Test it by typing a comment in a file and watching it suggest code.

6. **Clone the repo and install** - you'll download the workshop project, run `npm install` to get all the packages, and `npm run build` to make sure everything compiles.

### What you'll have at the end

A working development environment with all tools verified, connected to your Dataverse environment, and the starter app project open and building successfully.

---

## Module 02: Understanding the Blueprint (35 min)

### What's happening

You're learning how the Code App project is structured and how it maps to Canvas App concepts you already know.

### The flow

1. **Explore the project files** - you'll open each key file and learn what it does:
   - `App.tsx` = the App object (your main container)
   - `AssetList.tsx` = a Gallery (shows data in a table)
   - `AssetForm.tsx` = an Edit Form (create/edit records)
   - `Header.tsx` = the top bar with title and buttons

2. **Read the code with Canvas App eyes** - every file has comments that translate Code App patterns to Canvas App equivalents:
   - `useState()` = `Set()` / `UpdateContext()`
   - `onClick` = `OnSelect`
   - `setCurrentView("form")` = `Navigate(FormScreen)`

3. **Try Copilot on a real task** - you'll write a comment like `// Count how many assets are in each status` and watch Copilot generate the implementation. This is the workflow you'll use for the rest of the day: describe what you want, let Copilot help build it.

4. **Understand the data model** - the `Asset` interface defines the shape of your data (name, category, status, etc.). This maps directly to the Dataverse table columns.

### What you'll have at the end

A clear mental model of how Code Apps work, confidence that you can read the code, and your first experience using Copilot to generate real functionality.

---

## Module 03: Connecting to Real Data (65 min + continuation after lunch)

### What's happening

This is the big one. You're replacing the local (fake) data with a live connection to Dataverse. By the end, your app will read and write real data.

### The flow

1. **Check your Dataverse tables** - open the Maker Portal and verify the Asset table exists with the right columns (Name, Category, Status, Assigned To, Serial Number, Purchase Date, Notes).

2. **Create `dataService.ts`** - a new file that handles all Dataverse communication. This is like your data connection in Canvas Apps, but you have full control over what data you fetch and how.

3. **Write `fetchAssets()`** - a function that calls the Dataverse Web API to get all asset records. In Canvas Apps, this happens automatically when you add a data source. In Code Apps, you write it out - which means you can filter, sort, and shape the data exactly how you want.

4. **Write `saveAsset()`** - a function that creates or updates an asset record. This is your `Patch()` equivalent.

5. **Wire it up to `App.tsx`** - connect the data service to your main component:
   - Add `useEffect` to load data when the app opens (like `OnVisible`)
   - Update `handleSave` to write to Dataverse instead of local state
   - The loading spinner shows while data is being fetched

6. **Test with real data** - build and run the app, see your Dataverse data in the table, create a new record, edit an existing one.

### What you'll have at the end

A fully functional app that reads from and writes to Dataverse. The core functionality is complete - the rest of the workshop is about making it production-ready.

---

## Module 04: Governing Your App (75 min)

### What's happening

You're packaging your app into a Power Platform solution and setting up version control with Git. This is the "professional practices" module.

### The flow

1. **Create a solution** - `pac solution init` creates a solution project. `pac solution add-reference` adds your Code App to it. A solution is a container that holds everything your app needs.

2. **Your first Git commit** - you'll save a snapshot of your code:
   - `git status` - see what's changed
   - `git add .` - stage everything
   - `git commit -m "message"` - save the snapshot
   - `git log --oneline` - see your history

3. **Push to GitHub** - send your code to the cloud. Now it's backed up, shareable, and has a permanent history.

4. **Try branching** - create a feature branch, make a change, switch back to main, see that your change is safely isolated. This is how teams avoid the "last save wins" problem.

5. **See a deployment pipeline demo** - your hosts will show how the manual build/deploy steps can be automated so code goes from developer to production with no manual intervention.

### What you'll have at the end

Your app packaged in a solution, your code tracked in Git with at least one commit, and your code on GitHub. You'll understand the basics of branching and deployment pipelines.

---

## Module 05: Ship It (50 min)

### What's happening

You're building the final version of your app, packaging it, and deploying it to a real Power Platform environment.

### The flow

1. **Clean build** - `npm run rebuild` compiles everything from scratch. Like a full re-publish in Canvas Apps.

2. **Package the solution** - `pac solution pack` creates a `.zip` file that can be imported into any environment. You'll learn the difference between managed (locked for production) and unmanaged (editable for development).

3. **Deploy** - `pac solution import` sends your solution to the target environment. You'll verify it arrived by checking the Maker Portal.

4. **Test** - open your deployed app and run through the core scenarios: load data, create an asset, edit an asset, verify it persists.

5. **Final commit** - save your finished state to Git and push to GitHub.

### What you'll have at the end

A deployed, working Code App in a real Power Platform environment. A complete Git history of everything you built. The knowledge and confidence to do it again.

---

## The Complete Flow (Cheat Sheet)

```bash
# === MODULE 01: Setup ===
git --version && node --version && pac --version    # Verify tools
pac auth create                                      # Connect to Dataverse
git clone <repo-url>                                 # Get the project
cd starter-app && npm install && npm run build       # Install & build

# === MODULE 02: Planning ===
# Read App.tsx, AssetList.tsx, AssetForm.tsx
# Try Copilot: write a comment, let it suggest code

# === MODULE 03: Dataverse ===
# Create dataService.ts with fetchAssets() and saveAsset()
# Update App.tsx to use the data service
npm run build && npm start                           # Test with real data

# === MODULE 04: Governance ===
pac solution init --publisher-name YourOrg --publisher-prefix cr
pac solution add-reference --path starter-app
git add . && git commit -m "Add asset register"      # Save to Git
git push                                              # Push to GitHub

# === MODULE 05: Deploy ===
npm run rebuild                                       # Clean build
pac solution pack --zipfile Solution.zip --packagetype Unmanaged
pac solution import --path Solution.zip               # Deploy
git add . && git commit -m "Final build" && git push  # Save & push
```

---

## After the Workshop

You did it. You built a Code App from scratch, connected it to Dataverse, governed it properly, and deployed it.

Here's what to do next:

1. **Fork this repo** - so you always have a reference
2. **Build something for your team** - use the same steps with your own idea
3. **Explore the [resources](../resources/links.md)** - Microsoft Learn has deep dives on everything we covered
4. **Tell someone** - the best way to learn is to teach. Show a colleague what you built today

**Remember: you didn't make a leap today. You took the next step. And now you know the way.**
