# Module 04: Governance & ALM

> Set up solutions, environments, and deployment pipelines like a pro.

**Duration:** 75 minutes (13:30–14:45, overlapping with end of Module 03)

## Learning Objectives

By the end of this module, you will:

- Understand why governance matters (and why it's actually easier with Code Apps than Canvas Apps)
- Package your Code App into a Power Platform solution
- Use Git to track changes to your app (version history that actually works)
- Set up a basic deployment pipeline from dev to production

## What You'll Build

A governed, source-controlled, solution-packaged version of the app you've been building. You'll also see how to move it between environments safely.

## Step-by-Step Instructions

### Step 1: Why governance matters - a quick chat (5 min)

Before we touch any tools, let's talk about why this matters.

**In Canvas Apps**, governance is tricky:
- Apps live inside environments, sometimes hard to find
- Version history exists but is limited
- Moving apps between environments means exporting/importing manually
- It's hard to know who changed what and when

**In Code Apps**, governance is built in:
- Your code lives in Git - every change is tracked forever
- Solutions package everything neatly
- Deployment can be automated
- Multiple people can work on the same app without stepping on each other

> **The honest truth:** This module might feel a bit "admin-y" compared to the coding you've been doing. But the habits you build here will save you hours of headaches later. Trust us on this one.

### Step 2: Create a Power Platform solution (10 min)

A solution is like a container - it holds your app, your tables, and anything else your app needs. You've probably seen solutions in the Maker Portal before.

1. Open your terminal in VS Code
2. Navigate to the root of the workshop repo (not the starter-app folder):

```bash
cd ~/Desktop/From-Canvas-to-Code-Apps-your-next-step
```

3. Create a new solution project:

```bash
pac solution init --publisher-name EoEPPS --publisher-prefix cr
```

This creates a `Solution` folder with the solution project files.

4. Add your Code App component to the solution:

```bash
pac solution add-reference --path starter-app
```

> **Canvas App parallel:** This is like going to Solutions in the Maker Portal, creating a new solution, and adding your app to it. Same concept, but done from the command line so it can be automated and repeated.

### Step 3: Understand what just happened (5 min)

Look at the new files in your project:

- `Solution/` folder - contains the solution definition
- `Solution/src/Other/Solution.xml` - the solution's "ID card"
- The `add-reference` command linked your `starter-app` component to this solution

When you build the solution later (Module 05), it will automatically include your Code App component.

### Step 4: Your first Git commit (15 min)

Git tracks changes to your code - like a super-powered version history. Let's save everything you've built so far.

**4a. Check what's changed:**

```bash
git status
```

You'll see a list of files in red (untracked) and green (staged). Red means Git knows the files exist but isn't tracking them yet.

**4b. Stage your files:**

```bash
git add .
```

This tells Git "I want to include all these files in my next save." Run `git status` again - everything should be green now.

> **Canvas App parallel:** This is like selecting which changes you want to save. In Canvas Apps, you just hit Save and everything goes. With Git, you can choose exactly what to include - which is powerful when you're working on multiple things at once.

**4c. Create your commit:**

```bash
git commit -m "Add asset register Code App with Dataverse connection"
```

A commit is a snapshot of your code at this point in time. The message after `-m` describes what you did.

**4d. Check your history:**

```bash
git log --oneline
```

You should see your commit at the top. This is your version history - and unlike Canvas Apps, it never gets deleted.

### Step 5: Push to GitHub (10 min)

Your code is saved locally, but let's put it on GitHub so it's backed up and shareable.

**5a. Check your remote:**

```bash
git remote -v
```

You should see the GitHub URL for this repository.

**5b. Push your code:**

```bash
git push
```

If prompted to set up tracking:

```bash
git push -u origin main
```

**5c. Verify on GitHub:**

Open the GitHub repository URL in your browser. You should see all your files, including the new code and solution files.

> **Canvas App parallel:** This is like sharing your app with your team. But instead of just the final version, GitHub keeps every single version you've ever saved. Anyone on your team can see the full history.

### Step 6: Understand branches (10 min)

Branches let you work on new features without affecting the main version of your code.

**6a. Create a new branch:**

```bash
git checkout -b my-feature
```

This creates a copy of your code that you can change freely.

**6b. Make a small change:**

Open `Header.tsx` and change the subtitle text to something different. Save the file.

**6c. Commit the change on your branch:**

```bash
git add .
git commit -m "Update header subtitle"
```

**6d. Switch back to the main branch:**

```bash
git checkout main
```

Open `Header.tsx` again - your change is gone! It's safely on the `my-feature` branch. Switch back to see it:

```bash
git checkout my-feature
```

There it is again. This is how teams work on features without breaking each other's work.

> **The power of branches:** In Canvas Apps, if two people edit the same app, the last person to save wins. With Git branches, everyone works independently and merges when ready. No more "who saved over my changes?"

### Step 7: Walk through a deployment pipeline (10 min)

Your hosts will demonstrate how a deployment pipeline works:

1. **Developer commits code** → pushes to GitHub
2. **Pipeline triggers automatically** → builds the solution, runs checks
3. **Solution is deployed** → imported into a test or production environment
4. **No manual steps** → everything is repeatable and auditable

You won't set up a full pipeline today (that's a whole workshop on its own), but you'll see:

- The `pac solution pack` command that packages your solution
- The `pac solution import` command that deploys it
- How these commands can be put into a GitHub Actions workflow

For more detail on governance practices, see the [Governance Guide](../../docs/GOVERNANCE.md).

### Checkpoint: Is Your Code Governed?

- [ ] Solution project created with `pac solution init`
- [ ] Your Code App is referenced in the solution
- [ ] You made at least one Git commit
- [ ] Your code is pushed to GitHub
- [ ] You created and switched between branches
- [ ] You understand the basic flow: code → commit → push → deploy

**All ticked? You've just done something most Canvas App makers never do - and it wasn't that hard, was it?**

## Key Commands / Concepts

| Command / Concept | What It Does |
|-------------------|-------------|
| `pac solution init` | Creates a new Power Platform solution project |
| `pac solution add-reference` | Adds your app to a solution |
| `git status` | Shows what files have changed |
| `git add .` | Stages all changed files for a commit |
| `git commit -m "message"` | Saves a snapshot of your code with a description |
| `git push` | Sends your code to GitHub |
| `git log --oneline` | Shows your commit history |
| `git checkout -b name` | Creates a new branch |
| `git checkout name` | Switches to a branch |
| ALM | Application Lifecycle Management - the fancy term for "how you manage your app from dev to production" |

## Stuck?

- Git can feel confusing at first - that's completely normal. The key commands above are all you need today.
- If a Git command gives you an unexpected message, **don't panic** - raise your hand and we'll sort it out together
- Raise your hand - Charles, Josh, or a helper will come to you
- Still stuck after the event? [Open an issue](../../issues/new/choose)
