# Module 03: Dataverse & Connectors

> Connect your Code App to Dataverse and work with data the way you're used to.

**Duration:** 65 minutes (11:25–12:30), continuing after lunch (13:30–~14:00)

## Learning Objectives

By the end of this module, you will:

- Connect your Code App to a Dataverse environment
- Read and write data using the Power Platform connector model
- Understand how data access in Code Apps compares to Canvas Apps (it's very similar!)
- Use GitHub Copilot to help write data access code

## What You'll Build

A working data layer that connects your Code App to Dataverse tables. You'll fetch records, display them, and save changes - just like you do in Canvas Apps, but with a bit more control.

## Step-by-Step Instructions

### Step 1: Review the Dataverse tables (10 min)

Before writing code, let's check that your Dataverse environment has the tables we need.

1. Open the [Power Platform Maker Portal](https://make.powerapps.com)
2. Make sure you're in the correct environment (check the environment picker in the top-right)
3. Go to **Tables** in the left navigation
4. Look for the **Asset** table (your hosts will have pre-created this)

If you don't see it, your hosts will walk you through creating it. The full table definition is in [`starter-app/TeamAssetRegister/dataverse/TABLE-DEFINITIONS.md`](../../starter-app/TeamAssetRegister/dataverse/TABLE-DEFINITIONS.md).

> **Canvas App parallel:** This is exactly the same as checking your data sources exist before building a Canvas App. Same Dataverse, same tables - just a different way of accessing them.

### Step 2: Understand how Code Apps talk to Dataverse (5 min)

In Canvas Apps, you add a data source and then just use it - `Filter(Assets, Status = "Available")`. In Code Apps, you use the **Dataverse Web API**. It's a set of web requests that do the same things, but you write them out explicitly.

Here's the translation:

| Canvas App | Code App (Web API) |
|---|---|
| Add Data Source → Assets | Configure the Web API connection in your component |
| `Assets` (shows all rows) | `GET /api/data/v9.2/cr_assets` |
| `Filter(Assets, ...)` | `GET /api/data/v9.2/cr_assets?$filter=...` |
| `Patch(Assets, ...)` | `POST /api/data/v9.2/cr_assets` (create) or `PATCH /api/data/v9.2/cr_assets(id)` (update) |
| `Remove(Assets, ...)` | `DELETE /api/data/v9.2/cr_assets(id)` |

Don't worry - you won't have to memorise these URLs. Copilot will help, and we'll build helper functions to keep things simple.

### Step 3: Create the data service (15 min)

Let's create a new file that handles all the Dataverse communication. This keeps your data logic separate from your display logic (a good habit).

1. In VS Code, right-click the `TeamAssetRegister/components` folder and select **New File**
2. Name it `dataService.ts`
3. Type this comment at the top and let Copilot help:

```typescript
/*
 * dataService.ts - Handles all communication with Dataverse
 *
 * This is like your data source connection in Canvas Apps,
 * but you have more control over exactly what data you fetch.
 */

import { Asset } from "./App";
```

4. Now add the function to fetch all assets. Type:

```typescript
// Fetch all assets from Dataverse using the Web API
```

Let Copilot suggest the implementation. If it doesn't, here's what it should look like:

```typescript
export async function fetchAssets(
  webAPI: ComponentFramework.WebApi
): Promise<Asset[]> {
  try {
    const result = await webAPI.retrieveMultipleRecords("cr_asset", "?$orderby=cr_name asc");

    return result.entities.map((record) => ({
      id: record.cr_assetid,
      name: record.cr_name || "",
      category: getCategoryLabel(record.cr_category),
      assignedTo: record.cr_assignedto || "",
      status: getStatusLabel(record.cr_status),
      serialNumber: record.cr_serialnumber || "",
      purchaseDate: record.cr_purchasedate || "",
      notes: record.cr_notes || "",
    }));
  } catch (error) {
    console.error("Error fetching assets:", error);
    return [];
  }
}
```

> **What just happened?** You wrote a function that calls Dataverse and converts the response into the `Asset` shape your components expect. In Canvas Apps, the platform does this automatically. In Code Apps, you do it yourself - which means you can control exactly what data you get and how it's shaped.

5. Add the helper functions for choice labels:

```typescript
function getCategoryLabel(value: number): string {
  const labels: Record<number, string> = {
    1: "Laptop",
    2: "Monitor",
    3: "Keyboard",
    4: "Mouse",
    5: "Headset",
    6: "Dock",
    7: "Accessory",
    8: "Other",
  };
  return labels[value] || "Other";
}

function getStatusLabel(value: number): string {
  const labels: Record<number, string> = {
    1: "Available",
    2: "In Use",
    3: "Under Repair",
    4: "Retired",
  };
  return labels[value] || "Available";
}
```

### Step 4: Add the save function (10 min)

Still in `dataService.ts`, add a function to save (create or update) an asset:

```typescript
// Save an asset to Dataverse (create new or update existing)
export async function saveAsset(
  webAPI: ComponentFramework.WebApi,
  asset: Asset,
  isNew: boolean
): Promise<void> {
  const record: Record<string, any> = {
    cr_name: asset.name,
    cr_category: getCategoryValue(asset.category),
    cr_assignedto: asset.assignedTo,
    cr_status: getStatusValue(asset.status),
    cr_serialnumber: asset.serialNumber,
    cr_purchasedate: asset.purchaseDate || null,
    cr_notes: asset.notes,
  };

  try {
    if (isNew) {
      await webAPI.createRecord("cr_asset", record);
    } else {
      await webAPI.updateRecord("cr_asset", asset.id, record);
    }
  } catch (error) {
    console.error("Error saving asset:", error);
    throw error;
  }
}

function getCategoryValue(label: string): number {
  const values: Record<string, number> = {
    Laptop: 1, Monitor: 2, Keyboard: 3, Mouse: 4,
    Headset: 5, Dock: 6, Accessory: 7, Other: 8,
  };
  return values[label] || 8;
}

function getStatusValue(label: string): number {
  const values: Record<string, number> = {
    Available: 1, "In Use": 2, "Under Repair": 3, Retired: 4,
  };
  return values[label] || 1;
}
```

> **Canvas App parallel:** This is your `Patch()` function - but you've separated create and update, which gives you more control and clearer error messages.

### Step 5: Wire up the data service to your app (15 min)

Now let's connect the data service to `App.tsx` so the app uses real Dataverse data.

1. Open `App.tsx`
2. Add this import near the top, after the other imports:

```typescript
import { fetchAssets, saveAsset } from "./dataService";
```

3. Find the comment `// TODO (Module 03): Save to Dataverse instead of local state` in the `handleSave` function
4. Replace the `handleSave` function with:

```typescript
const handleSave = async (asset: Asset) => {
  setIsLoading(true);
  try {
    const isNew = !selectedAsset;
    await saveAsset(context.webAPI, asset, isNew);

    // Refresh the list from Dataverse
    const updatedAssets = await fetchAssets(context.webAPI);
    setAssets(updatedAssets);
  } catch (error) {
    console.error("Failed to save:", error);
    alert("Something went wrong saving the asset. Please try again.");
  }
  setIsLoading(false);
  setCurrentView("list");
  setSelectedAsset(null);
};
```

5. Add a `useEffect` to load data when the app first opens. Add this after the state declarations:

```typescript
// Load assets when the app first opens - like OnVisible in Canvas Apps
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

> **Canvas App parallel:** `useEffect` is like `OnVisible` - it runs code when the screen first appears. The empty `[]` at the end means "only run this once", like `OnVisible` running when you first navigate to a screen.

### Step 6: Test with real data (10 min)

1. Make sure you have some sample data in your Dataverse Asset table (see the sample data in the [table definitions](../../starter-app/TeamAssetRegister/dataverse/TABLE-DEFINITIONS.md#sample-data))
2. Build and run your app:

```bash
cd starter-app
npm run build
npm start
```

3. Your browser should open with the test harness
4. You should see your Dataverse data in the table

**If the table is empty:**
- Check `pac auth list` - are you connected to the right environment?
- Check the browser console (F12 > Console tab) for error messages
- Make sure the table name in `dataService.ts` matches your actual Dataverse table schema name

### Checkpoint: Is Your Data Flowing?

- [ ] `dataService.ts` exists with `fetchAssets` and `saveAsset` functions
- [ ] `App.tsx` imports and uses the data service
- [ ] The app shows data from your Dataverse environment
- [ ] You can create a new asset and see it appear in the list
- [ ] You can edit an existing asset and see the changes saved

**All working? You're connected to real data - that's the big milestone!**

## Key Commands / Concepts

| Concept | What It Means |
|---------|--------------|
| Dataverse connector | The bridge between your Code App and your data - same data, different syntax |
| CRUD operations | Create, Read, Update, Delete - the four things you do with data |
| `webAPI.retrieveMultipleRecords()` | Fetches rows from a Dataverse table (like browsing a Gallery) |
| `webAPI.createRecord()` | Creates a new row (like `Patch()` with a blank record) |
| `webAPI.updateRecord()` | Updates an existing row (like `Patch()` with a specific record) |
| `async/await` | A way to wait for data to come back before continuing (like how Canvas Apps wait for Patch to finish) |
| `useEffect` | Runs code when a component loads - like `OnVisible` in Canvas Apps |

## Stuck?

- If your data isn't showing up, check your authentication: `pac auth list`
- Make sure you're pointed at the right environment
- Check the browser console (F12 > Console) for error messages
- Raise your hand - Charles, Josh, or a helper will come to you
- Still stuck after the event? [Open an issue](../../issues/new/choose)
