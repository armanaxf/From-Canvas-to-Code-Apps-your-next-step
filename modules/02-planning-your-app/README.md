# Module 02: Planning Your App

> Design your app's structure using what you already know from Canvas Apps.

**Duration:** 35 minutes (10:40–11:15)

## Learning Objectives

By the end of this module, you will:

- Understand how a Code App project is structured (spoiler: it's more organised than a Canvas App, and that's a good thing)
- Map Canvas App concepts to their Code App equivalents
- Plan the screens, components, and data connections for the app you'll build today
- Use GitHub Copilot to help scaffold your initial project structure

## What You'll Build

A project plan and folder structure for your Code App. You'll start from the starter template in this repo and make it your own.

## Step-by-Step Instructions

### Step 1: Understand the project structure (10 min)

Open the `starter-app` folder in VS Code and let's walk through what each file does. Don't panic at the number of files — most of them are configuration that you set up once and never touch again.

**Files you'll work in every day:**

| File | What It Is | Canvas App Equivalent |
|------|-----------|----------------------|
| `App.tsx` | Main container, holds state and navigation | The App object |
| `AssetList.tsx` | Shows all assets in a table | A Gallery control |
| `AssetForm.tsx` | Create/edit form with fields | An Edit Form control |
| `Header.tsx` | Top bar with title and buttons | A header section on your screen |

**Files you set up once and forget:**

| File | What It Is |
|------|-----------|
| `package.json` | Lists your app's dependencies (like a shopping list of tools) |
| `tsconfig.json` | TypeScript settings (the language your code is written in) |
| `ControlManifest.Input.xml` | Tells Power Platform about your component |
| `index.ts` | Entry point — connects your React components to Power Platform |

> **Key insight:** In Canvas Apps, everything is in one place (the studio). In Code Apps, things are separated into files. This feels like more work at first, but it means you can find things more easily and multiple people can work on the app at the same time.

### Step 2: Read the code with Canvas App eyes (10 min)

Open `TeamAssetRegister/components/App.tsx` and read through it. The comments translate everything to Canvas App concepts. Let's highlight the key patterns:

**State = Variables**

```typescript
// Canvas App:  Set(assets, [])
// Code App:
const [assets, setAssets] = React.useState<Asset[]>([]);
```

The `useState` pattern always follows the same shape: `[currentValue, functionToUpdateIt]`. That's it.

**Navigation = Changing what's shown**

```typescript
// Canvas App:  Navigate(FormScreen)
// Code App:
setCurrentView("form");
```

Instead of separate screens, you have one component that shows different things based on a variable.

**Event handlers = OnSelect**

```typescript
// Canvas App:  OnSelect = Set(selectedItem, ThisItem); Navigate(FormScreen)
// Code App:
const handleEdit = (asset: Asset) => {
  setSelectedAsset(asset);
  setCurrentView("form");
};
```

Same logic, different syntax. The arrow `=>` just means "do this".

### Step 3: Try GitHub Copilot on a real task (10 min)

Let's use Copilot to add something new to the app. We'll add a simple status summary.

1. Open `App.tsx`
2. Find the line `const [isLoading, setIsLoading]` (around line 45)
3. Below it, add a new comment:

```typescript
// Count how many assets are in each status
```

4. Press **Enter** and wait. Copilot should suggest code that counts the assets by status.
5. If the suggestion looks reasonable, press **Tab** to accept it
6. If Copilot doesn't suggest anything, try typing the start:

```typescript
const statusCounts = assets.reduce(
```

...and let Copilot finish it.

> **This is the Copilot workflow:** Write a comment describing what you want, then let Copilot suggest the code. You're the architect; Copilot is the builder.

### Step 4: Understand the data model (5 min)

Open `TeamAssetRegister/components/App.tsx` and look at the `Asset` interface near the top:

```typescript
export interface Asset {
  id: string;
  name: string;
  category: string;
  assignedTo: string;
  status: string;
  serialNumber: string;
  purchaseDate: string;
  notes: string;
}
```

This defines the "shape" of your data. In Canvas Apps, you'd see these as columns in your data source. Here, you define them explicitly — which means TypeScript can warn you if you try to use a field that doesn't exist.

For the full Dataverse table definitions (columns, choice values, sample data), see:
[`starter-app/TeamAssetRegister/dataverse/TABLE-DEFINITIONS.md`](../../starter-app/TeamAssetRegister/dataverse/TABLE-DEFINITIONS.md)

### Checkpoint: Do You Understand the Structure?

Answer these questions (in your head or with a neighbour):

- [ ] Which file is the "home screen" of the app? → `App.tsx`
- [ ] Where would you go to change what the asset table looks like? → `AssetList.tsx`
- [ ] Where would you add a new field to the form? → `AssetForm.tsx`
- [ ] What does `useState` do? → Creates a variable you can update
- [ ] How do you "navigate" between views? → Change the `currentView` state variable

**If you can answer at least 3 of those, you're ready for Module 03!**

## Key Commands / Concepts

| Canvas App Concept | Code App Equivalent |
|-------------------|---------------------|
| Screen | Page / Component |
| Gallery | List / Data-bound component |
| Form | Form component |
| OnSelect | Event handler (onClick) |
| Set / UpdateContext | State variables (useState) |
| Navigate() | Routing / navigation (state change) |
| ThisItem | Function parameter (the item passed to the handler) |
| IsBlank() | `!value` or `value.trim() === ""` |
| Patch() | API call to save data (Module 03) |

## Stuck?

- This is the "thinking" module — there's no wrong answer at the planning stage
- Chat with your neighbour about what they're building
- Raise your hand — Charles, Josh, or a helper will come to you
- Still stuck after the event? [Open an issue](../../issues/new/choose)
