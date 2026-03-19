# Governance Guide

> How to manage your Code Apps responsibly — solutions, environments, and ALM basics.

## Why Governance Matters

If you've been building Canvas Apps for a while, you've probably hit these problems:

- "Who changed my app?"
- "Which version was working last week?"
- "How do I move this app from dev to production safely?"
- "Someone deleted the data source and broke everything"

Code Apps, combined with proper governance, solve all of these. Not because the technology is magic — but because the tools and habits you'll learn here make these problems manageable.

**The good news:** You already understand governance concepts from Canvas Apps. Solutions, environments, and publishing are familiar. Code Apps just give you better tools to manage them.

---

## Solutions

### What Is a Solution?

A solution is a container that holds everything your app needs: the app itself, tables, connections, environment variables, and more. You've probably seen solutions in the Power Platform Maker Portal.

### Canvas Apps vs. Code Apps in Solutions

| | Canvas Apps | Code Apps |
|---|---|---|
| How the app lives in a solution | As a single packaged item | As source code that builds into a component |
| What gets exported | A compiled app package | Source files + a build process |
| Can you see what changed? | Not easily | Yes — Git shows every line that changed |
| Can multiple people edit at once? | No — last save wins | Yes — Git handles merging |

### How to Package Your Code App

```bash
# 1. Create a solution project (done once)
pac solution init --publisher-name YourOrg --publisher-prefix cr

# 2. Add your Code App to the solution
pac solution add-reference --path starter-app

# 3. Build and package
cd Solution
dotnet build
# or
pac solution pack --zipfile ../MySolution.zip --packagetype Unmanaged
```

---

## Environments

### The Three-Environment Model

Most organisations use three environments:

| Environment | Purpose | Who uses it |
|---|---|---|
| **Development** | Where you build and test | Developers (you!) |
| **Test / UAT** | Where others verify it works | Testers, key users |
| **Production** | Where real users use it | Everyone |

### Why Separate Environments?

- **Safety:** A bug in dev doesn't break production
- **Testing:** You can test with real-ish data without affecting live data
- **Confidence:** You know exactly what's deployed where

### For This Workshop

We're using a shared development environment. In a real project, you'd have your own dev environment and deploy to shared test/production environments.

> **Canvas App parallel:** You might already separate dev and production environments for Canvas Apps. The concept is identical — Code Apps just make it easier to move between them consistently.

---

## Source Control with Git

### Why Git?

Git is the industry standard for tracking code changes. It gives you:

- **Complete history:** Every change, who made it, and when
- **Branching:** Work on features independently, merge when ready
- **Collaboration:** Multiple developers, no "last save wins"
- **Recovery:** Made a mistake? Roll back to any previous version

### Essential Git Workflow

```
1. Make changes to your code
2. git add .                    ← Stage your changes
3. git commit -m "Description"  ← Save a snapshot
4. git push                     ← Send to GitHub
```

### Branching Strategy (Keep It Simple)

For a small team, this is all you need:

- **`main` branch** — always contains the latest working version
- **Feature branches** — one per feature or fix (e.g., `add-search-filter`)
- **Merge when done** — merge feature branches back into main via pull requests

```
main:     ●────●────●────●────●
                \        /
feature:         ●──●──●
```

### Git Commit Messages That Help

Good messages make your history useful:

| Good | Bad |
|---|---|
| "Add search filter to asset list" | "Update" |
| "Fix category dropdown not saving" | "Bug fix" |
| "Connect asset form to Dataverse" | "Changes" |

---

## Deployment Pipelines

### What Is a Pipeline?

A deployment pipeline automates the process of getting your code from development to production. Instead of manually exporting and importing solutions, a pipeline does it for you — every time, the same way, with no mistakes.

### Basic Pipeline Flow

```
Developer pushes code to GitHub
        ↓
Pipeline triggers automatically
        ↓
Build: npm install → npm run build → pac solution pack
        ↓
Test: Run automated checks (optional but recommended)
        ↓
Deploy: pac solution import → target environment
```

### Getting Started with Pipelines

For this workshop, you've done the build and deploy steps manually. When you're ready to automate:

1. **Power Platform Pipelines** — built into the Maker Portal, no code needed
2. **GitHub Actions** — more flexible, defined in your repo as a `.yml` file
3. **Azure DevOps Pipelines** — common in enterprise settings

A simple GitHub Actions workflow looks like this:

```yaml
# .github/workflows/deploy.yml
name: Deploy Solution
on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
        working-directory: starter-app
      - run: npm run build
        working-directory: starter-app
      - run: pac solution pack --zipfile solution.zip --packagetype Managed
        working-directory: Solution
      # Add deployment step with pac solution import
```

> **You don't need to set this up today.** Just know that it exists, and that when you're ready, automating deployment is straightforward.

---

## Security and Permissions

### Environment Roles

| Role | What they can do |
|---|---|
| System Administrator | Everything — manage tables, apps, users |
| Environment Maker | Create apps and flows |
| Basic User | Use apps, read/write data they have access to |

### Best Practices

- **Principle of least privilege:** Give people only the access they need
- **Use security roles:** Define who can read, write, and delete data
- **Environment variables:** Store connection strings and settings as environment variables, not hardcoded in your app
- **No secrets in Git:** Never commit passwords, API keys, or connection strings to your repository

---

## Governance Checklist

Use this checklist when starting a new Code App project:

- [ ] **Solution created** — with a meaningful publisher name and prefix
- [ ] **Source control set up** — Git repo with a clear branching strategy
- [ ] **Environments defined** — at least dev and production
- [ ] **Security roles configured** — who can access what
- [ ] **Deployment process documented** — even if manual at first
- [ ] **Data backup plan** — Dataverse has built-in backup, but verify it's configured
- [ ] **Team knows the process** — everyone understands how to commit, push, and deploy

---

## Further Reading

- [Power Platform ALM Guide (Microsoft Learn)](https://learn.microsoft.com/en-us/power-platform/alm/)
- [Environment Strategy](https://learn.microsoft.com/en-us/power-platform/admin/environments-overview)
- [Solution Concepts](https://learn.microsoft.com/en-us/power-platform/alm/solution-concepts-alm)
- [Power Platform Pipelines](https://learn.microsoft.com/en-us/power-platform/alm/pipelines)
- [Git Handbook (GitHub)](https://docs.github.com/en/get-started/using-git/about-git)
