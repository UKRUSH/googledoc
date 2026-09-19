# Plant QR Management System

## 1. Project Overview

This project is a web-based Plant Management System built using Next.js.

Main purpose:

- User scans QR code.
- QR code opens Plant Selection page.
- System has 5 plants.
- User selects one plant.
- Selected plant has 6 blocks.
- Each block contains:
  - Quality Assurance Department
  - Agronomy Department
- User selects department.
- Department page provides access to relevant Google Sheet.
- User can open and enter data in Google Sheet.

Technology:

- Next.js
- TypeScript
- Tailwind CSS
- Google Sheets
- Google Drive / Google Workspace
- QR Codes

---

# 2. Main System Flow

```text
QR Code Scan
     |
     v
Plant Selection
     |
     +-----------------------------+
     |                             |
     v                             v
Thunkama                     Kanamediara
     |
     v
Block Selection
A / B / C / D / E / F
     |
     v
Department Selection
     |
     +-----------------------+
     |                       |
     v                       v
Quality Assurance       Agronomy Department
Department
     |                       |
     v                       v
Google Sheet             Google Sheet
```

---

# 3. Plants

System contains following 5 plants:

1. Thunkama
2. Kanamediara
3. Wedipitiya
4. Hingura
5. Thalava

Each plant has exactly 6 blocks.

---

# 4. Plant Structure

Each plant contains:

```text
Plant
|
+-- Block A
|   +-- Quality Assurance Department
|   +-- Agronomy Department
|
+-- Block B
|   +-- Quality Assurance Department
|   +-- Agronomy Department
|
+-- Block C
|   +-- Quality Assurance Department
|   +-- Agronomy Department
|
+-- Block D
|   +-- Quality Assurance Department
|   +-- Agronomy Department
|
+-- Block E
|   +-- Quality Assurance Department
|   +-- Agronomy Department
|
+-- Block F
    +-- Quality Assurance Department
    +-- Agronomy Department
```

Total structure:

```text
5 Plants
×
6 Blocks
×
2 Departments
=
60 Department Locations
```

---

# 5. QR Code System

## 5.1 QR Code Purpose

Each plant should have QR code.

When user scans QR code, system should open corresponding plant page.

Example:

```text
Thunkama QR
     |
     v
/plant/thunkama
```

```text
Kanamediara QR
     |
     v
/plant/kanamediara
```

```text
Wedipitiya QR
     |
     v
/plant/wedipitiya
```

```text
Hingura QR
     |
     v
/plant/hingura
```

```text
Thalava QR
     |
     v
/plant/thalava
```

QR code should contain URL only.

Example:

```text
https://your-domain.com/plant/thunkama
```

---

# 6. Application Pages

Recommended pages:

```text
/
├── Plant Selection
│
├── /plant/[plant]
│   └── Block Selection
│
├── /plant/[plant]/block/[block]
│   └── Department Selection
│
└── /plant/[plant]/block/[block]/[department]
    └── Department Page
```

---

# 7. Homepage

Route:

```text
/
```

Homepage should show:

```text
Plant Management System

Select Plant
```

Plant cards:

```text
+----------------------+
|      Thunkama        |
|                      |
|   Open Plant         |
+----------------------+

+----------------------+
|    Kanamediara       |
|                      |
|   Open Plant         |
+----------------------+

+----------------------+
|     Wedipitiya       |
|                      |
|   Open Plant         |
+----------------------+

+----------------------+
|       Hingura        |
|                      |
|   Open Plant         |
+----------------------+

+----------------------+
|       Thalava        |
|                      |
|   Open Plant         |
+----------------------+
```

Each card should link to:

```text
/plant/thunkama
/plant/kanamediara
/plant/wedipitiya
/plant/hingura
/plant/thalava
```

---

# 8. Plant Page

Route:

```text
/plant/[plant]
```

Example:

```text
/plant/thunkama
```

Page title:

```text
Thunkama Plant
```

Show 6 block cards:

```text
+---------+  +---------+
| Block A |  | Block B |
+---------+  +---------+

+---------+  +---------+
| Block C |  | Block D |
+---------+  +---------+

+---------+  +---------+
| Block E |  | Block F |
+---------+  +---------+
```

Each block should be clickable.

Example:

```text
Block A
```

opens:

```text
/plant/thunkama/block/A
```

---

# 9. Block Page

Route:

```text
/plant/[plant]/block/[block]
```

Example:

```text
/plant/thunkama/block/A
```

Page title:

```text
Thunkama Plant
Block A
```

Show 2 departments:

```text
+--------------------------------+
| Quality Assurance Department   |
|                                |
| Open Department                |
+--------------------------------+

+--------------------------------+
| Agronomy Department            |
|                                |
| Open Department                |
+--------------------------------+
```

---

# 10. Department Selection

There are 2 departments:

## Quality Assurance Department

Short name:

```text
QA
```

## Agronomy Department

Short name:

```text
AGR
```

Department URLs:

```text
/plant/thunkama/block/A/qa
```

```text
/plant/thunkama/block/A/agronomy
```

Same pattern applies to every plant and block.

---

# 11. Department Page

Example:

```text
/plant/thunkama/block/A/qa
```

Page should display:

```text
Thunkama Plant
Block A
Quality Assurance Department
```

Then show relevant information and Google Sheet button.

Example:

```text
+--------------------------------------+
| Quality Assurance Department         |
|                                      |
| Plant: Thunkama                      |
| Block: A                             |
|                                      |
| [ Open Google Sheet ]                |
+--------------------------------------+
```

Button should open department's Google Sheet.

---

# 12. Google Sheet Structure

Each department should have its own Google Sheet.

Total:

```text
5 Plants
×
6 Blocks
×
2 Departments
=
60 Google Sheets
```

Example:

```text
Thunkama
|
+-- Block A
|   +-- QA Google Sheet
|   +-- Agronomy Google Sheet
|
+-- Block B
|   +-- QA Google Sheet
|   +-- Agronomy Google Sheet
|
...
```

---

# 13. Google Sheet Naming Convention

Use consistent names.

Format:

```text
[Plant] - [Block] - [Department]
```

Examples:

```text
Thunkama - Block A - QA
Thunkama - Block A - Agronomy

Thunkama - Block B - QA
Thunkama - Block B - Agronomy

Kanamediara - Block A - QA
Kanamediara - Block A - Agronomy
```

Continue same format for all plants.

---

# 14. Google Sheet URLs

Application should store Google Sheet URLs in configuration.

Example:

```ts
const plantData = {
  thunkama: {
    A: {
      qa: "GOOGLE_SHEET_URL",
      agronomy: "GOOGLE_SHEET_URL",
    },
    B: {
      qa: "GOOGLE_SHEET_URL",
      agronomy: "GOOGLE_SHEET_URL",
    },
  },
};
```

Better approach:

Store complete configuration for all plants.

```ts
const plantData = {
  thunkama: {
    name: "Thunkama",
    blocks: {
      A: {
        qa: "https://docs.google.com/spreadsheets/...",
        agronomy: "https://docs.google.com/spreadsheets/...",
      },
      B: {
        qa: "https://docs.google.com/spreadsheets/...",
        agronomy: "https://docs.google.com/spreadsheets/...",
      },
      C: {
        qa: "https://docs.google.com/spreadsheets/...",
        agronomy: "https://docs.google.com/spreadsheets/...",
      },
      D: {
        qa: "https://docs.google.com/spreadsheets/...",
        agronomy: "https://docs.google.com/spreadsheets/...",
      },
      E: {
        qa: "https://docs.google.com/spreadsheets/...",
        agronomy: "https://docs.google.com/spreadsheets/...",
      },
      F: {
        qa: "https://docs.google.com/spreadsheets/...",
        agronomy: "https://docs.google.com/spreadsheets/...",
      },
    },
  },
};
```

Same structure should exist for:

```text
Thunkama
Kanamediara
Wedipitiya
Hingura
Thalava
```

---

# 15. Recommended Folder Structure

Use Next.js App Router.

```text
plant-management-system/
│
├── app/
│   ├── page.tsx
│   │
│   ├── plant/
│   │   └── [plant]/
│   │       ├── page.tsx
│   │       │
│   │       └── block/
│   │           └── [block]/
│   │               ├── page.tsx
│   │               │
│   │               └── [department]/
│   │                   └── page.tsx
│   │
│   ├── globals.css
│   └── layout.tsx
│
├── components/
│   ├── PlantCard.tsx
│   ├── BlockCard.tsx
│   ├── DepartmentCard.tsx
│   ├── Header.tsx
│   ├── Breadcrumb.tsx
│   └── GoogleSheetButton.tsx
│
├── data/
│   └── plants.ts
│
├── public/
│   └── qr/
│       ├── thunkama.png
│       ├── kanamediara.png
│       ├── wedipitiya.png
│       ├── hingura.png
│       └── thalava.png
│
├── types/
│   └── plant.ts
│
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

# 16. TypeScript Types

Create:

```text
types/plant.ts
```

Example:

```ts
export type Department = "qa" | "agronomy";

export type Block = "A" | "B" | "C" | "D" | "E" | "F";

export interface BlockData {
  qa: string;
  agronomy: string;
}

export interface PlantData {
  name: string;
  blocks: Record<Block, BlockData>;
}
```

---

# 17. Plant Data

Create:

```text
data/plants.ts
```

Structure:

```ts
import { PlantData } from "@/types/plant";

export const plants: Record<string, PlantData> = {
  thunkama: {
    name: "Thunkama",
    blocks: {
      A: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      B: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      C: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      D: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      E: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      F: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
    },
  },

  kanamediara: {
    name: "Kanamediara",
    blocks: {
      A: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      B: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      C: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      D: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      E: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      F: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
    },
  },

  wedipitiya: {
    name: "Wedipitiya",
    blocks: {
      A: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      B: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      C: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      D: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      E: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      F: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
    },
  },

  hingura: {
    name: "Hingura",
    blocks: {
      A: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      B: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      C: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      D: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      E: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      F: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
    },
  },

  thalava: {
    name: "Thalava",
    blocks: {
      A: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      B: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      C: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      D: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      E: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
      F: {
        qa: "GOOGLE_SHEET_URL",
        agronomy: "GOOGLE_SHEET_URL",
      },
    },
  },
};
```

---

# 18. Dynamic Routing

Next.js dynamic routing should be used.

Plant route:

```text
/plant/[plant]
```

Block route:

```text
/plant/[plant]/block/[block]
```

Department route:

```text
/plant/[plant]/block/[block]/[department]
```

Example complete route:

```text
/plant/thunkama/block/A/qa
```

Another example:

```text
/plant/thalava/block/F/agronomy
```

---

# 19. Validation

System must validate URL parameters.

Valid plants:

```text
thunkama
kanamediara
wedipitiya
hingura
thalava
```

Valid blocks:

```text
A
B
C
D
E
F
```

Valid departments:

```text
qa
agronomy
```

Invalid URL should show:

```text
404
Plant not found
```

or:

```text
Invalid Block
```

or:

```text
Department not found
```

Do not allow invalid combinations.

---

# 20. Google Sheets Integration

There are 2 possible approaches.

## Option 1 — Direct Google Sheet Link

Simplest approach.

User clicks:

```text
Open Google Sheet
```

Browser opens Google Sheet.

Example:

```tsx
<a
  href={sheetUrl}
  target="_blank"
  rel="noopener noreferrer"
>
  Open Google Sheet
</a>
```

Advantages:

- Very simple
- Easy to maintain
- No Google API required
- Google Sheet handles authentication
- Department staff can directly enter data

Recommended for first version.

---

# 21. Option 2 — Google Sheets API

If application needs to read/write Google Sheet data directly inside website, use Google Sheets API.

Architecture:

```text
Next.js
   |
   v
Next.js API Route
   |
   v
Google Sheets API
   |
   v
Google Sheet
```

This is more complex.

Requires:

```text
Google Cloud Project
Google Sheets API
Google Service Account
Credentials
Environment Variables
```

Use this only if website itself needs to display or submit spreadsheet data.

---

# 22. Recommended Google Sheet Access

For simple system:

```text
Website
   |
   | Click Open Google Sheet
   v
Google Sheet
   |
   v
Staff enters data
```

Do not expose Google API credentials in frontend.

If API integration is added later, credentials must stay server-side.

---

# 23. Google Sheet Permission

Each Google Sheet should have correct permission.

Possible setup:

```text
Restricted
```

Only authorized Google accounts can access.

Or:

```text
Anyone with the link
```

depending on organization security requirements.

Recommended:

```text
Restricted
```

for company/internal data.

Give required staff:

```text
Viewer
Commenter
Editor
```

depending on their responsibility.

---

# 24. UI Design

UI should be:

- Mobile-first
- QR scanning friendly
- Simple
- Large buttons
- Easy navigation
- Fast loading
- Responsive

Most users may open website using mobile phone after QR scan.

Therefore mobile UI is priority.

---

# 25. Recommended Color System

Example professional agricultural/industrial theme.

## 25.1 Base Palette

```text
Primary (Forest Green):
#166534

Primary Hover:
#14532D

Secondary (Leaf Green):
#22C55E

Background:
#F8FAFC

Surface:
#FFFFFF

Text:
#0F172A

Muted:
#64748B

Border:
#E2E8F0
```

## 25.2 Semantic Colors

Used for statuses, alerts, and Google Sheet link states.

```text
Success:
#16A34A   (sheet opened / action confirmed)

Warning:
#F59E0B   (sheet not configured yet)

Error:
#DC2626   (invalid plant / block / department)

Info:
#0EA5E9   (loading / neutral notices)
```

## 25.3 Department Accent Colors

Each department gets its own accent so cards are instantly recognizable
without reading the label first — important for fast, mobile, QR-scan use.

```text
Quality Assurance (QA):
Accent:      #2563EB   (blue)
Accent Soft: #DBEAFE   (badge / card background tint)

Agronomy:
Accent:      #D97706   (amber)
Accent Soft: #FEF3C7   (badge / card background tint)
```

Example usage:

```text
+--------------------------------+
| ● Quality Assurance Department |   ● = #2563EB dot / left border
| Plant: Thunkama   Block: A     |
| [ Open Google Sheet ]          |
+--------------------------------+

+--------------------------------+
| ● Agronomy Department          |   ● = #D97706 dot / left border
| Plant: Thunkama   Block: A     |
| [ Open Google Sheet ]          |
+--------------------------------+
```

## 25.4 Dark Mode (Optional, Future)

```text
Background: #0B1120
Surface:    #111827
Text:       #F1F5F9
Muted:      #94A3B8
Border:     #1E293B

Primary stays: #22C55E (brighter green reads better on dark)
```

## 25.5 Accessibility

- Text on Primary (#166534) must be white (#FFFFFF) — passes WCAG AA.
- Muted (#64748B) is for secondary text only, never body copy on Background.
- Never rely on color alone to separate QA vs Agronomy — always pair the
  accent color with the department name and an icon.

Can change colors later.

---

# 25A. Typography & Visual Style

Goal: feel clean, modern, and trustworthy on a phone screen right after a QR scan.

## Font

```text
Recommended: Inter or Geist (both free, load well in Next.js via next/font)
Fallback:    system-ui, -apple-system, sans-serif
```

## Type Scale (mobile-first)

```text
Page Title (Plant/Block name):   24px / bold
Section Heading (Department):    18px / semibold
Body Text:                       16px / regular
Button Label:                    16px / semibold
Caption / Muted meta text:       13px / regular
```

## Component Style

```text
Cards:        rounded-2xl, soft shadow, 16-24px padding
Buttons:      rounded-xl, full-width on mobile, min-height 48px (tap target)
Spacing:      generous — 12-16px gaps between cards
Icons:        simple line icons (leaf for Agronomy, checkmark/shield for QA)
```

Large tap targets and generous spacing matter more than visual density —
most users are standing in a field holding a phone, not sitting at a desk.

---

# 26. Navigation

Every page should have simple navigation.

Example:

```text
Home
  >
Thunkama
  >
Block A
  >
Quality Assurance
```

Breadcrumb:

```text
Home / Thunkama / Block A / QA
```

This helps user understand current location.

---

# 27. Mobile User Journey

Example real-world flow:

```text
User arrives at Thunkama Plant
          |
          v
Scan QR Code
          |
          v
Thunkama Plant Page
          |
          v
Select Block
          |
          v
Select Block A
          |
          v
Select Department
          |
          +------------------+
          |                  |
          v                  v
        QA               Agronomy
          |                  |
          v                  v
   Open Google Sheet   Open Google Sheet
          |                  |
          v                  v
     Enter Data          Enter Data
```

---

# 28. Example

User scans Thunkama QR.

URL:

```text
https://your-domain.com/plant/thunkama
```

User sees:

```text
Thunkama Plant

Block A
Block B
Block C
Block D
Block E
Block F
```

User selects:

```text
Block C
```

URL:

```text
/plant/thunkama/block/C
```

User sees:

```text
Quality Assurance Department

Agronomy Department
```

User selects:

```text
Quality Assurance Department
```

URL:

```text
/plant/thunkama/block/C/qa
```

Page shows:

```text
Thunkama
Block C
Quality Assurance Department

[ Open Google Sheet ]
```

Click button.

Google Sheet opens.

User enters required data.

---

# 29. QR Code Generation

Need 5 QR codes.

QR URLs:

```text
https://your-domain.com/plant/thunkama
https://your-domain.com/plant/kanamediara
https://your-domain.com/plant/wedipitiya
https://your-domain.com/plant/hingura
https://your-domain.com/plant/thalava
```

QR codes can be generated using a QR library.

Possible package:

```bash
npm install qrcode
```

QR generation can also be done using external QR generator during deployment.

QR code should be tested using multiple mobile devices.

---

# 30. Security Requirements

Do not put private information inside QR code.

QR code should contain only route URL.

Example:

```text
https://your-domain.com/plant/thunkama
```

Do not put:

```text
Google credentials
API keys
passwords
service account credentials
```

inside QR code.

Do not expose:

```text
GOOGLE_CLIENT_SECRET
GOOGLE_PRIVATE_KEY
GOOGLE_SERVICE_ACCOUNT
```

in frontend code.

Use:

```text
.env.local
```

for secrets if API integration is added.

---

# 31. Error Handling

## Invalid Plant

```text
Plant not found.
```

## Invalid Block

```text
Block not found.
```

## Invalid Department

```text
Department not found.
```

## Missing Google Sheet

```text
Google Sheet is not configured for this department.
```

## Google Sheet unavailable

```text
Google Sheet could not be opened.
Please contact administrator.
```

---

# 32. Loading States

When page is loading, show simple loading UI.

Example:

```text
Loading...
```

Avoid complex animations.

QR users need fast access.

---

# 33. Empty States

If department does not have Google Sheet configured:

```text
No Google Sheet configured

Please contact administrator.
```

---

# 34. Admin Future Expansion

Current version can use static configuration.

Future version can add admin panel.

Possible admin functions:

```text
Admin Login
     |
     v
Dashboard
     |
     +-- Manage Plants
     |
     +-- Manage Blocks
     |
     +-- Manage Departments
     |
     +-- Manage Google Sheet URLs
     |
     +-- Generate QR Codes
     |
     +-- View Activity
```

Admin could update Google Sheet URLs without changing source code.

---

# 35. Future Database Structure

If database is added later:

```text
Plant
 |
 +-- id
 +-- name
 |
 +-- Blocks
      |
      +-- id
      +-- name
      +-- plantId
      |
      +-- Departments
           |
           +-- id
           +-- name
           +-- sheetUrl
           +-- blockId
```

Possible database:

```text
PostgreSQL
```

or:

```text
MongoDB
```

But database is NOT required for first version.

---

# 36. Recommended First Version Architecture

Keep first version simple.

```text
                QR Code
                   |
                   v
              Next.js App
                   |
          +--------+--------+
          |        |        |
          v        v        v
       Plants    Blocks   Departments
                              |
                              v
                        Google Sheet
```

Use static TypeScript data for plant/block/department configuration.

No database needed.

No Google API needed.

---

# 37. Complete System Data

System has:

```text
5 Plants
```

Each plant:

```text
6 Blocks
```

Each block:

```text
2 Departments
```

Therefore:

```text
5 × 6 = 30 Blocks
```

and:

```text
30 × 2 = 60 Department Access Points
```

Department access points:

```text
5 Plants
×
6 Blocks
×
2 Departments
=
60
```

---

# 38. Department Matrix

## Thunkama

```text
Block A → QA + Agronomy
Block B → QA + Agronomy
Block C → QA + Agronomy
Block D → QA + Agronomy
Block E → QA + Agronomy
Block F → QA + Agronomy
```

## Kanamediara

```text
Block A → QA + Agronomy
Block B → QA + Agronomy
Block C → QA + Agronomy
Block D → QA + Agronomy
Block E → QA + Agronomy
Block F → QA + Agronomy
```

## Wedipitiya

```text
Block A → QA + Agronomy
Block B → QA + Agronomy
Block C → QA + Agronomy
Block D → QA + Agronomy
Block E → QA + Agronomy
Block F → QA + Agronomy
```

## Hingura

```text
Block A → QA + Agronomy
Block B → QA + Agronomy
Block C → QA + Agronomy
Block D → QA + Agronomy
Block E → QA + Agronomy
Block F → QA + Agronomy
```

## Thalava

```text
Block A → QA + Agronomy
Block B → QA + Agronomy
Block C → QA + Agronomy
Block D → QA + Agronomy
Block E → QA + Agronomy
Block F → QA + Agronomy
```

---

# 39. Development Steps

## Step 1

Create Next.js project.

```bash
npx create-next-app@latest plant-management-system
```

Select:

```text
TypeScript: Yes
ESLint: Yes
Tailwind CSS: Yes
App Router: Yes
src directory: No
```

---

## Step 2

Create folders:

```text
app/
components/
data/
types/
public/qr/
```

---

## Step 3

Create TypeScript types.

```text
types/plant.ts
```

---

## Step 4

Create plant configuration.

```text
data/plants.ts
```

---

## Step 5

Create homepage.

```text
app/page.tsx
```

Show all 5 plants.

---

## Step 6

Create dynamic plant page.

```text
app/plant/[plant]/page.tsx
```

Show 6 blocks.

---

## Step 7

Create block page.

```text
app/plant/[plant]/block/[block]/page.tsx
```

Show:

```text
Quality Assurance Department
Agronomy Department
```

---

## Step 8

Create department page.

```text
app/plant/[plant]/block/[block]/[department]/page.tsx
```

Show Google Sheet button.

---

## Step 9

Add actual Google Sheet URLs.

Replace:

```text
GOOGLE_SHEET_URL
```

with real Google Sheet URLs.

---

## Step 10

Generate 5 QR codes.

Use production domain URLs.

---

## Step 11

Deploy Next.js application.

Possible hosting:

```text
Vercel
```

---

## Step 12

Update QR codes with production URLs.

Example:

```text
https://plant-system.example.com/plant/thunkama
```

---

# 40. Testing Checklist

## QR Testing

- Scan Thunkama QR
- Scan Kanamediara QR
- Scan Wedipitiya QR
- Scan Hingura QR
- Scan Thalava QR

## Plant Testing

Each plant must show:

```text
A
B
C
D
E
F
```

## Block Testing

Each block must show:

```text
Quality Assurance Department
Agronomy Department
```

## Department Testing

Every department must open correct Google Sheet.

Test:

```text
Thunkama A QA
Thunkama A Agronomy

Thunkama B QA
Thunkama B Agronomy

...

Thalava F QA
Thalava F Agronomy
```

All 60 access points should be tested.

---

# 41. Important URL Examples

```text
/plant/thunkama
```

```text
/plant/thunkama/block/A
```

```text
/plant/thunkama/block/A/qa
```

```text
/plant/thunkama/block/A/agronomy
```

```text
/plant/kanamediara/block/C/qa
```

```text
/plant/wedipitiya/block/F/agronomy
```

```text
/plant/hingura/block/B/qa
```

```text
/plant/thalava/block/E/agronomy
```

---

# 42. Recommended UX

User should never need type plant name manually.

QR scan should directly open plant.

User journey should be:

```text
Scan
↓
Plant
↓
Block
↓
Department
↓
Google Sheet
```

Keep each step one screen.

Use large clickable cards.

Avoid unnecessary forms.

Avoid unnecessary login unless company requires authentication.

---

# 43. Final Architecture

```text
                         QR CODE
                            |
                            v
                    +---------------+
                    |   Next.js App  |
                    +---------------+
                            |
                            v
                    +---------------+
                    | Plant Selection|
                    +---------------+
                            |
          +---------+-------+-------+---------+
          |         |       |       |         |
          v         v       v       v         v
      Thunkama  Kanamediara Wedipitiya Hingura Thalava
          |
          v
    +-----------------------------+
    | Block Selection             |
    |                             |
    | A | B | C | D | E | F      |
    +-----------------------------+
          |
          v
    +-----------------------------+
    | Department Selection        |
    |                             |
    | Quality Assurance           |
    | Agronomy                    |
    +-----------------------------+
          |
          v
    +-----------------------------+
    | Google Sheet                |
    |                             |
    | Open / Enter Data           |
    +-----------------------------+
```

---

# 44. Final Requirements

System must have:

- Next.js
- TypeScript
- Tailwind CSS
- App Router
- 5 plants
- 6 blocks per plant
- 2 departments per block
- QR-based plant access
- Dynamic routes
- Mobile-first UI
- Google Sheet links
- Correct Google Sheet per plant/block/department
- 404 handling
- Invalid parameter validation
- Responsive design
- Simple navigation
- Secure handling of credentials
- Easy future expansion

Main user flow:

```text
QR Scan
→ Plant
→ Block
→ Department
→ Google Sheet
→ Enter Data
```

Total:

```text
5 Plants
30 Blocks
60 Department Access Points
```
