# Module 03: Dataverse & Connectors

> Connect your Code App to Dataverse and work with data the way you're used to.

## Learning Objectives

By the end of this module, you will:

- Connect your Code App to a Dataverse environment
- Read and write data using the Power Platform connector model
- Understand how data access in Code Apps compares to Canvas Apps (it's very similar!)
- Use GitHub Copilot to help write data access code

## What You'll Build

A working data layer that connects your Code App to Dataverse tables. You'll fetch records, display them, and save changes — just like you do in Canvas Apps, but with a bit more control.

## Step-by-Step Instructions

<!-- TODO: Add detailed walkthrough steps for the workshop day -->

1. Review the Dataverse tables available in your dev environment
2. Configure your app's connection to Dataverse
3. Fetch data from a Dataverse table and display it in your app
4. Create a form that writes data back to Dataverse
5. Use GitHub Copilot to help with connector code and error handling

> Full step-by-step details will be added before the workshop.

## Key Commands / Concepts

| Concept | What It Means |
|---------|--------------|
| Dataverse connector | The bridge between your Code App and your data — same data, different syntax |
| CRUD operations | Create, Read, Update, Delete — the four things you do with data |
| `pac pcf init` | Initialises a new Power Platform component project |
| Environment variables | Configuration values that change between environments (dev vs. production) |

## Stuck?

- If your data isn't showing up, check your authentication: `pac auth list`
- Make sure you're pointed at the right environment
- Raise your hand — Charles, Josh, or a helper will come to you
- Still stuck after the event? [Open an issue](../../issues/new/choose)
