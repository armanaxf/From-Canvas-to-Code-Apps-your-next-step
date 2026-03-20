# Contributing

> A guide for co-hosts and contributors who want to add or update workshop content.

## Who Is This For?

This guide is for **Charles, Josh, and any co-hosts or helpers** who need to update the workshop materials. If you're an attendee, you don't need to worry about this - just enjoy the workshop!

## How the Repo Is Organised

```
/docs                  → Written guides (setup, walkthrough, governance, FAQ)
/modules               → One folder per workshop module, each with its own README
  /01-tooling-setup
  /02-planning-your-app
  /03-dataverse-connectors
  /04-governance-alm
  /05-deploy-and-ship
/starter-app           → The Code App scaffold attendees clone and build on
/resources             → Links, cheat sheets, reference material
/feedback              → Post-event feedback template
```

## Making Changes

### Quick Edits

For small changes (typos, updated links, minor wording tweaks):

1. Edit the file directly on GitHub using the pencil icon
2. Write a short commit message describing what you changed
3. Commit directly to `main` (for small fixes this is fine)

### Larger Changes

For new content, structural changes, or anything you'd like reviewed:

1. Create a new branch: `git checkout -b your-branch-name`
2. Make your changes locally
3. Push and open a Pull Request
4. Tag the other host for review

## Content Guidelines

- **Tone**: Friendly, encouraging, jargon-light. Our audience are experienced Canvas App makers who may feel nervous about "pro code". Reassure and empower.
- **Structure**: Each module README follows a consistent template - Learning Objectives, What You'll Build, Step-by-Step Instructions, Key Commands/Concepts, and a Stuck? section. Please keep this consistent.
- **Links**: Use relative links where possible (e.g., `../../docs/SETUP.md` rather than full URLs). This keeps things working if the repo is forked.
- **Screenshots**: Place them in the same folder as the README that references them. Use descriptive file names (e.g., `vscode-terminal-open.png`).

## Before the Workshop

- [ ] All module README step-by-step sections are complete (not just placeholders)
- [ ] The starter app scaffold is in `/starter-app` and works with `npm install`
- [ ] The lab walkthrough in `/docs/LAB-WALKTHROUGH.md` is complete
- [ ] All links in `/resources/links.md` have been checked and work
- [ ] The feedback form link in `/feedback/FEEDBACK.md` is updated

## Questions?

Reach out to Josh or Charles directly.
