# Recurra - Optical Inventory Management App

## Project Overview

Recurra is a full-stack inventory management SaaS tailored for small-to-medium optical businesses. The goal is to provide a clean, professional, and dark-themed (navy/teal) interface for managing frames, contacts, and accessories, similar to the aesthetics of Linear or Attio.

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + `shadcn/ui`
- **State Management**: Zustand (Phase 2)
- **Database / Auth**: Supabase (Phase 3)
- **Deployment**: Vercel

---

## What Has Been Completed (Phase 1)

We have successfully bootstrapped the application and built out the complete UI scaffold using mock data (`/src/lib/mock-data.ts`). The application has a functional routing foundation with the following pages:

1. **Login (`/`)**: A clean landing page mimicking the authentication flow with an HTML validation requirement.
2. **Dashboard (`/dashboard`)**: Contains metric cards, top-performing product lists, low-stock warnings, and an activity ledger.
3. **Inventory List (`/inventory`)**: A comprehensive data table for viewing products.
4. **Product Creation (`/inventory/new`)**: A dynamic form for adding new products, categorized by type (Frames, Contacts, Accessories).
5. **Product Details / Edit (`/inventory/[id]`)**: An in-depth view of a specific item, featuring pricing, stock adjustment mockups, and a barcode display.
6. **Scan (`/scan`)**: A mock interface for scanning barcodes via camera or typing them manually.
7. **Import Wizard (`/import`)**: A 3-step UI sequence for uploading and mapping CSV/Excel data.
8. **Adjustments Log (`/adjustments`)**: A historical timeline of stock changes (restocks, sales, manual adjustments).
9. **Global Shell (`src/components/layout`)**: A persistent `Sidebar` and `TopBar` spanning the `(app)` route group.

### Current Design Language
- **Colors**: The app relies strongly on dark navy backgrounds for the sidebar, white clean cards for content, and teal/interactive accents for focus states. These are mapped in `globals.css` using CSS variables.
- **Components**: Utilizing `shadcn/ui` for high-quality, accessible base components (Cards, Inputs, Buttons, Tables, DropdownMenus, Selects, Badges).

---

## Current Status & Known UI Bugs

We are transitioning from **Phase 1 (Mock UI)** to **Phase 2 (Local State Interactive)**. 
During the final UI review, the user identified several interactive elements that still need to be wired up. *Future models should focus on fixing these before or while implementing the global Zustand store!*

**Bugs/Missing Features to Address Immediately:**
1. **Search Bar**: The `TopBar` search bar does not function.
2. **Inventory Table**: 
    - Row-clicks should redirect to the product's detail page.
    - The "Delete" action in the row DropdownMenu does not work.
    - "Edit" and "Adjust Stock" actions need to successfully transition or open modals.
3. **Filtering**: The `Category` and `Status` dropdowns on `/inventory` and the Date/Type filters on `/adjustments` do not filter the mock data yet.
4. **Item Detail Page**: The "Print Label" button does not trigger the print window.
5. **Settings Page**: Navigating to `/settings` results in a 404.
6. **TopBar Account Dropdown**: The options (Profile, Settings, Log out) are unclickable.

---

## Roadmap & Instructions for Future Models

If you are a new AI model taking over this project, please follow the phased approach outlined in the `implementation_plan.md` and `task.md` artifacts in the `.gemini/antigravity/brain` environment.

### Phase 2: Interactive with Local State
Your primary goal is to replace `mock-data.ts` with a global `Zustand` store.
- Initialize `src/store/useInventoryStore.ts`.
- Move the mock arrays (products, activities, stats) into initial state.
- Write actions for: `addProduct`, `updateProduct`, `deleteProduct`, `adjustStock`, and `addActivity`.
- Wire up the `<ProductFilters />` and `<ProductTable />` so that filtering actually alters the visible items.
- Wire up the forms so adding a new item redirects to the inventory list and displays the new item.

### Phase 3: Supabase Integration
Once local state is perfectly fluid, swap Zustand for real `Supabase` calls (or sync them).
- Set up Supabase Auth and configure middleware to protect the `/(app)` routes.
- Create Postgres tables matching the TypeScript interfaces.
- Enable Row Level Security (RLS).

### Prompting Guidelines
- **Aesthetics First**: Never regress the UI. Keep it looking like a premium SaaS.
- **App Router Syntax**: Ensure you use `"use client"` where hooks and interactivity are required, but leave pages as server components where applicable.
- **Atomic Commits**: Run the dev server and use the Browser Subagent to check your changes continuously. Don't assume code works perfectly on the first try.
