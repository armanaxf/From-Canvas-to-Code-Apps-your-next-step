# Starter App — Team Asset Register

> This is your starting point. By the end of the workshop, this will be a fully working Code App connected to Dataverse.

## Project Structure

```
starter-app/
├── package.json                          # Dependencies and scripts (like an app's settings)
├── tsconfig.json                         # TypeScript configuration
├── pcfconfig.json                        # Power Platform component config
├── .eslintrc.json                        # Code style rules
└── TeamAssetRegister/
    ├── ControlManifest.Input.xml          # The component's "ID card" — tells Power Platform what it is
    ├── index.ts                           # Entry point — like App.OnStart in Canvas Apps
    ├── generated/
    │   └── ManifestTypes.d.ts             # Auto-generated type definitions
    └── components/
        ├── App.tsx                         # Main container — like the App object in Canvas Apps
        ├── Header.tsx                      # Top bar with title and "Add" button
        ├── AssetList.tsx                   # Table of assets — like a Gallery in Canvas Apps
        └── AssetForm.tsx                   # Create/edit form — like an Edit Form in Canvas Apps
```

## Canvas App → Code App Mapping

| What you know (Canvas Apps) | What you'll see here (Code Apps) |
|---|---|
| App object | `App.tsx` component |
| Screen | A component file (`.tsx`) |
| Gallery | `AssetList.tsx` — a table that loops through data |
| Edit Form | `AssetForm.tsx` — input fields with save/cancel |
| `Set()` / `UpdateContext()` | `useState()` — same idea, different name |
| `Navigate(Screen2)` | `setCurrentView("form")` — changes what's shown |
| `OnSelect` | `onClick` — same idea, different name |
| `Patch()` | `handleSave()` — you'll connect this to Dataverse |
| Data Source | Dataverse Web API (connected in Module 03) |

## Getting Started

```bash
# 1. Open a terminal in VS Code (Ctrl + `)
# 2. Navigate to the starter app folder
cd starter-app

# 3. Install dependencies (like downloading what the app needs)
npm install

# 4. Start the development server (like pressing Play in Canvas Apps)
npm start
```

## What You'll Build, Module by Module

1. **Module 01** — Verify this project opens and builds
2. **Module 02** — Explore the structure, understand what each file does, plan your changes
3. **Module 03** — Replace the local data with live Dataverse data (fetch, create, update)
4. **Module 04** — Package into a solution, commit to Git, set up source control
5. **Module 05** — Build for production and deploy to a real environment

## Key Files to Focus On

- **`App.tsx`** — Start here. Read the comments. This is your "home screen."
- **`AssetList.tsx`** — The table that shows all assets. You'll connect it to real data.
- **`AssetForm.tsx`** — The form to add/edit assets. You'll wire it up to write to Dataverse.
- **`index.ts`** — The entry point. You'll add data-fetching logic here in Module 03.

## Don't Worry If...

- You see files you don't understand — we'll explain every one during the workshop
- TypeScript looks unfamiliar — it's just JavaScript with helpful labels (we'll cover it)
- The project structure seems like a lot — it's actually simpler than a Canvas App once you know what each piece does

**You've got this.**
