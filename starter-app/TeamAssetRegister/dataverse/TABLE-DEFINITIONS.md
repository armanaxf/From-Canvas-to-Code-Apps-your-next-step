# Dataverse Table Definitions — Team Asset Register

> These are the tables you'll use in Dataverse. If you've created tables in Canvas Apps, this will feel familiar — same concept, just set up a bit differently.

## Table: Assets (`cr_asset`)

This is the main table. Each row is one piece of equipment.

| Display Name | Schema Name | Type | Required | Description |
|---|---|---|---|---|
| Asset Name | `cr_name` | Single line of text (100) | Yes | What the item is (e.g. "Dell Latitude 5540") |
| Category | `cr_category` | Choice | Yes | Type of equipment |
| Assigned To | `cr_assignedto` | Single line of text (100) | No | Person currently using the item |
| Status | `cr_status` | Choice | Yes | Current state of the asset |
| Serial Number | `cr_serialnumber` | Single line of text (50) | No | Manufacturer serial number |
| Purchase Date | `cr_purchasedate` | Date only | No | When the item was bought |
| Notes | `cr_notes` | Multiple lines of text (2000) | No | Any extra details |

### Category choices

| Value | Label |
|---|---|
| 1 | Laptop |
| 2 | Monitor |
| 3 | Keyboard |
| 4 | Mouse |
| 5 | Headset |
| 6 | Dock |
| 7 | Accessory |
| 8 | Other |

### Status choices

| Value | Label |
|---|---|
| 1 | Available |
| 2 | In Use |
| 3 | Under Repair |
| 4 | Retired |

## Table: People (`cr_person`)

Optional second table for tracking who assets are assigned to. For the workshop, we keep it simple — `Assigned To` is a text field on the Asset table. If you want to extend the app later, you can create this table and use a lookup column instead.

| Display Name | Schema Name | Type | Required | Description |
|---|---|---|---|---|
| Full Name | `cr_name` | Single line of text (100) | Yes | Person's name |
| Email | `cr_email` | Single line of text (100) | No | Work email |
| Department | `cr_department` | Single line of text (100) | No | Team or department |

## How to Create These Tables

### Option A: In the Power Platform Maker Portal (familiar from Canvas Apps)

1. Go to [make.powerapps.com](https://make.powerapps.com)
2. Select your dev environment
3. Go to **Tables** > **New table**
4. Enter the display name "Asset" and add each column from the table above
5. For Choice columns, add the values listed above

### Option B: Using the Power Platform CLI (what we'll do in the workshop)

```bash
# You'll learn these commands during the workshop — don't worry about them now
pac table create --name "Asset" --display-name "Asset" --description "Equipment tracked in the asset register"
```

## Sample Data

To test your app, add a few rows like these:

| Asset Name | Category | Assigned To | Status | Serial Number |
|---|---|---|---|---|
| Dell Latitude 5540 | Laptop | Jane Smith | In Use | SN-2024-001 |
| LG 27" Monitor | Monitor | Jane Smith | In Use | SN-2024-002 |
| Surface Dock 2 | Dock | | Available | SN-2024-003 |
| Logitech MX Keys | Keyboard | Tom Brown | In Use | SN-2023-045 |
| HP Laptop (old) | Laptop | | Retired | SN-2021-012 |

## Canvas App Comparison

If you've built a Canvas App that connects to Dataverse, you already know:
- Tables = your data sources
- Columns = the fields in your forms and galleries
- Choices = dropdown options
- Lookups = relationships between tables

**The only difference in Code Apps is _how_ you access the data — the data itself is exactly the same.**
