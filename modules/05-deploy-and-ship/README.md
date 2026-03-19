# Module 05: Deploy & Ship

> Build, test, and deploy your finished app to a real environment.

## Learning Objectives

By the end of this module, you will:

- Build your Code App for production
- Test your app in a target environment
- Deploy your finished app and see it running live
- Know exactly what steps to repeat when you build your next Code App back at work

## What You'll Build

The final, deployed version of your Code App — running in a real Power Platform environment. This is the moment where it all comes together.

## Step-by-Step Instructions

<!-- TODO: Add detailed walkthrough steps for the workshop day -->

1. Run a production build of your Code App
2. Package the solution for deployment
3. Import the solution into a target environment
4. Test your app in the target environment
5. Celebrate — you built and deployed a Code App!

> Full step-by-step details will be added before the workshop.

## Key Commands / Concepts

| Command / Concept | What It Does |
|-------------------|-------------|
| `npm run build` | Creates a production-ready version of your app |
| `pac solution pack` | Packages your solution for import |
| `pac solution import` | Imports a solution into a Power Platform environment |
| Managed vs. Unmanaged | Managed solutions are locked for production; unmanaged are editable for development |

## Stuck?

- Deployment issues are almost always environment or permission related — check your `pac auth list` first
- If the import fails, check that you're targeting the right environment
- Raise your hand — Charles, Josh, or a helper will come to you
- Still stuck after the event? [Open an issue](../../issues/new/choose)
