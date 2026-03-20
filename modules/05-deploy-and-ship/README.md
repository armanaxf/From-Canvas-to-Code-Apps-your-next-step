# Module 05: Deploy & Ship

> Build, test, and deploy your finished app to a real environment.

**Duration:** 50 minutes (14:55–15:45)

## Learning Objectives

By the end of this module, you will:

- Build your Code App for production
- Package it into a deployable solution
- Deploy your finished app to a target environment
- Know exactly what steps to repeat when you build your next Code App back at work

## What You'll Build

The final, deployed version of your Code App - running in a real Power Platform environment. This is the moment where it all comes together.

## Step-by-Step Instructions

### Step 1: Clean build for production (5 min)

Before deploying, let's make sure everything compiles cleanly.

1. Open your terminal and navigate to the starter app:

```bash
cd ~/Desktop/From-Canvas-to-Code-Apps-your-next-step/starter-app
```

2. Run a clean build:

```bash
npm run rebuild
```

This deletes old build files and compiles everything from scratch. Think of it like a full re-publish in Canvas Apps - not just saving, but building the final version.

**Expected output:** Build completes with no errors. If you see warnings (yellow text), those are usually fine. Errors (red text) need to be fixed before continuing.

**Common errors and fixes:**

| Error | Fix |
|---|---|
| `Cannot find module` | Run `npm install` again |
| `Type error` | Check that your `dataService.ts` imports match the function signatures |
| `Syntax error` | Look at the line number in the error - usually a missing bracket or comma |

### Step 2: Package the solution (10 min)

Now let's turn your Code App into a Power Platform solution that can be imported into any environment.

1. Navigate to the solution folder:

```bash
cd ~/Desktop/From-Canvas-to-Code-Apps-your-next-step
```

2. Build the solution:

```bash
dotnet build Solution/
```

Or, if you prefer the `pac` approach:

```bash
cd Solution
pac solution pack --zipfile ../AssetRegister_1_0_0.zip --packagetype Unmanaged
```

This creates a `.zip` file - that's your solution package.

> **Canvas App parallel:** This is like exporting a solution from the Maker Portal, but done from the command line. The result is the same `.zip` file you'd get from the portal.

### Step 3: Understand managed vs. unmanaged (5 min)

| Type | When to use | What it means |
|---|---|---|
| **Unmanaged** | Development | You can edit everything. Use this for dev environments. |
| **Managed** | Production | Everything is locked down. Users can use it but can't modify it. |

For today's workshop, we'll use **unmanaged** solutions (because you're still developing). When you ship to production for real, you'd use managed.

```bash
# For production deployment, you'd use:
pac solution pack --zipfile AssetRegister_1_0_0_managed.zip --packagetype Managed
```

### Step 4: Deploy to a target environment (15 min)

Let's import your solution into a Power Platform environment.

**4a. Check your target environment:**

```bash
pac auth list
```

If you need to switch environments:

```bash
pac auth select --index 2
```

(Replace `2` with the number of your target environment from the list.)

Or create a new auth for a different environment:

```bash
pac auth create --environment https://your-target-env.crm.dynamics.com
```

**4b. Import the solution:**

```bash
pac solution import --path AssetRegister_1_0_0.zip --activate-plugins
```

**Expected output:** The import will take a minute or two. You'll see progress messages, then a success message.

**4c. Verify in the Maker Portal:**

1. Open [make.powerapps.com](https://make.powerapps.com)
2. Switch to your target environment
3. Go to **Solutions** - you should see the Asset Register solution
4. Open it - your Code App component should be inside

> **Canvas App parallel:** This is identical to importing a solution in the Maker Portal - you've just done it from the command line, which means it can be automated.

### Step 5: Test your deployed app (10 min)

1. In the Maker Portal, find your deployed app
2. Click **Play** to open it
3. Test the core functionality:
   - [ ] Does the asset list load and show data?
   - [ ] Can you create a new asset?
   - [ ] Can you edit an existing asset?
   - [ ] Do the status badges show the right colours?
   - [ ] Does the data persist (refresh the page - is it still there)?

If something doesn't work, check:
- The Dataverse tables exist in the target environment
- The table names and column names match what your code expects
- You're signed in with an account that has permissions to read/write data

### Step 6: Commit and celebrate (5 min)

Save your final state to Git:

```bash
cd ~/Desktop/From-Canvas-to-Code-Apps-your-next-step
git add .
git commit -m "Final workshop build - deployed asset register"
git push
```

### What You've Accomplished Today

Let's step back and appreciate what you've done:

1. **Set up a professional development environment** - VS Code, Git, Power Platform CLI
2. **Understood Code App architecture** - and mapped it to concepts you already know
3. **Connected to Dataverse** - reading and writing data with code
4. **Set up governance** - solutions, Git version control, branches
5. **Built, packaged, and deployed** - a real Code App to a real environment

**That's a production-grade workflow.** Many professional developers follow exactly these steps. And you did it in a day.

### What to Do Next

- **Keep this repo** - fork it on GitHub so you always have a reference
- **Build another app** - repeat these steps with your own idea (the commands are all in this repo)
- **Explore the [resources](../../resources/links.md)** - Microsoft Learn has deeper dives on everything we covered
- **Join the community** - the Power Platform Community and PnP group are full of people on the same journey
- **Share what you built** - show your team, your manager, or post about it

## Key Commands / Concepts

| Command / Concept | What It Does |
|-------------------|-------------|
| `npm run rebuild` | Clean build of your Code App |
| `pac solution pack` | Packages your solution into a `.zip` file |
| `pac solution import` | Imports a solution into a Power Platform environment |
| `pac auth select` | Switches to a different authenticated environment |
| Managed solution | Locked for production - users can use it but can't modify it |
| Unmanaged solution | Open for development - you can edit everything |

## Stuck?

- Deployment issues are almost always environment or permission related - check your `pac auth list` first
- If the import fails, check that you're targeting the right environment
- Raise your hand - Charles, Josh, or a helper will come to you
- Still stuck after the event? [Open an issue](../../issues/new/choose)
