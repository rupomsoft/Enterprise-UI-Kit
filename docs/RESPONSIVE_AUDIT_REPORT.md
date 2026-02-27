# Responsive UI Audit Report

**Project:** ACRU Dashboard / UI Kit Showcase  
**Audit date:** February 2025  
**Scope:** Layout, components, tables, forms, modals, charts, typography, spacing, and Tailwind usage across breakpoints (320px → 1536px+).

---

## Executive summary

The codebase has a solid base (flex layouts, some `min-w-0`, `overflow-x-auto` on table wrappers, touch targets, safe-area support) but **several critical gaps** prevent production-ready responsiveness:

1. **Sidebar is always visible** with fixed width (260px / 72px)—no mobile drawer/overlay. On viewports &lt;768px this consumes a large share of the screen and can cause horizontal scroll or cramped content.
2. **No single container/spacing system**—main content uses `p-4 sm:p-6` and showcase uses `max-w-7xl mx-auto px-4 sm:px-6` but there is no shared container component or spacing scale.
3. **Tables** use horizontal scroll wrappers in sections but **fixed `scrollHeight` (e.g. 350px, 400px)** and no responsive column hiding or compact density on small screens.
4. **Charts** use **fixed pixel heights** (e.g. 240px)—no aspect-ratio or fluid height strategy.
5. **Modals** use `sm:` for centering and padding but **non–full-screen sizes are not forced full-screen on mobile** (only the `full-screen` size is).
6. **Forms** have a mix of fixed widths in showcase (e.g. `w-56`, `w-48`, `w-64`) and no consistent label stacking vs inline.
7. **Typography** is not fluid—fixed `text-base` / `text-sm` etc. with no scaling by viewport.
8. **Spacing** is ad hoc (e.g. `space-y-10`, `gap-4`, `p-4 sm:p-5`) with no documented scale.

---

## 1. Layout issues by file

### 1.1 App shell & navigation

| File | Issue | Severity |
|------|--------|----------|
| **`app/components/ui/Sidebar.tsx`** | Fixed widths `w-[260px]` / `w-[72px]`; always in document flow. No mobile overlay, no drawer behavior, no `lg:` or `md:` breakpoint to hide/collapse on small screens. On &lt;768px the sidebar takes ~260px or 72px, leaving little room for main content. | **Critical** |
| **`app/components/dashboard/DashboardLayout.tsx`** | Sidebar + main area are flex siblings; no conditional rendering of sidebar as overlay on mobile. Main has `min-w-0` and `overflow-hidden`/`overflow-auto` (good). Padding `p-4 sm:p-6` is reasonable but not part of a defined spacing system. | **High** |
| **`app/components/ui/DashboardHeader.tsx`** | Header height `h-14 sm:h-16`; padding `px-4 sm:px-6`; user block `hidden sm:flex` (good). Primary action labels `hidden sm:inline` (good). No hamburger + mobile nav pattern—relies on `onSidebarToggle` only. Touch targets `min-h-[44px] min-w-[44px]` (good). | **Medium** (depends on sidebar fix) |

### 1.2 Containers & main content

| File | Issue | Severity |
|------|--------|----------|
| **`app/components/UIKitShowcase/UIKitShowcase.tsx`** | Single container: `w-full min-w-0 max-w-7xl mx-auto px-4 sm:px-6 space-y-10`. No `lg`/`xl` padding increase; vertical spacing `space-y-10` is fixed. | **Low** |
| **`app/components/ui/Section.tsx`** | Section wrapper `space-y-3`; header `text-base sm:text-lg`. No max-width or padding; relies on parent. `block` vs flex-wrap for children is good. | **Low** |

### 1.3 Fixed widths / heights that block fluid layout

| File | Location | Issue |
|------|----------|--------|
| **BorderedTableSection.tsx** | `scrollHeight="350px"` | Fixed height; should be responsive (e.g. min-height + % or clamp). |
| **BorderedTable.tsx** | `scrollHeightProp ?? "400px"` | Default fixed scroll height for fixed-header mode. |
| **TableCard.tsx** | `style={{ maxHeight: scrollHeight }}` | Passes through fixed height. |
| **BarChartRechart.tsx** | `height = 240` (default), `style={{ height }}` | Fixed px height; no aspect ratio or min/max. |
| **LineChartRechart.tsx** | Same pattern | Fixed px height. |
| **PieChartRechart.tsx** | Same pattern | Fixed px height. |
| **DoughnutChartRechart.tsx** | Same pattern | Fixed px height. |
| **FormFieldSection.tsx** | `w-56` on wrapper | Form demo is fixed width; not full-width on mobile. |
| **SelectSection.tsx** | `w-48`, `w-64` | Fixed-width selects in showcase. |
| **AlertSection.tsx** | `max-w-md` | Reasonable but could be `w-full max-w-md`. |
| **AccordionSection.tsx** | `max-w-md` | Same. |
| **TimelineSection.tsx** | `max-w-sm` | Same. |
| **CardSkeletonSection.tsx** | `max-w-3xl` | Same. |
| **TableSkeletonSection.tsx** | `max-w-3xl` | Same. |
| **Skeleton.tsx** (FormSkeleton) | `max-w-sm` | Same. |
| **DropdownMenu.tsx** | `min-w-[200px]`, `sm:w-48` | Min width can be large on very small screens. |

### 1.4 Overflow and horizontal scroll

| File | Finding |
|------|--------|
| **globals.css** | `body { overflow-x: hidden; }`—good to prevent page-level horizontal scroll. |
| **TableCard.tsx** | `overflow-x-auto` on table wrapper when no `scrollHeight`—good. |
| **VirtualizedDataTableSection, BorderedTableSection, BorderedListTableSection, VirtualizedListViewSection** | Each wraps content in `w-full min-w-0 max-w-7xl overflow-x-auto`—good. |
| **Tabs.tsx** | Tabs list uses `overflow-x-auto overflow-y-hidden` for scrollable tabs—good. |
| **Sidebar** | No `overflow-x` on sidebar; fixed width can still contribute to viewport overflow on very narrow screens if layout doesn’t collapse. |
| **Modal** | Modal panel has `overflow-y-auto` and `min-w-0`—good. |
| **Drawer / Sheet** | Use `max-w-[100vw]` and `max-h-[100dvh]` / `85dvh`—good for not exceeding viewport. |

---

## 2. Components with overflow or fixed sizing (summary)

- **Charts (Bar, Line, Pie, Doughnut):** Fixed `height` in px; containers are `w-full` but height is not fluid. Risk: charts too tall on small screens or too short on large; no aspect ratio.
- **Tables (BorderedTable, TableCard, VirtualizedDataTable, VirtualizedListView):** Horizontal scroll is present; **fixed `scrollHeight`** when `fixedHeader` is true; **no responsive column visibility** (all columns shown at all breakpoints); **no compact row density** on mobile.
- **Sidebar:** Fixed width; no responsive behavior (overlay/drawer) on small viewports.
- **Modals:** Non–full-screen sizes use `max-h-[90vh]` and `rounded-t-[10px]` on mobile but **do not force full viewport width/height on small screens**—only the explicit `full-screen` size does. Default `md` modal stays centered with max-width; on very narrow screens this is OK but not “full-screen modal on mobile” as often desired.
- **Forms (showcase):** FormFieldSection and SelectSection use fixed-width wrappers (`w-56`, `w-48`, `w-64`) so inputs are not full-width on mobile in the demo.
- **Cards / lists:** CardSection uses responsive grids (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` etc.) and `min-w-0`/`overflow-hidden`/`truncate` in list items—good. ProductCard uses `aspect-square` and `object-cover`—good. No major overflow issues identified.

---

## 3. Tables and grids needing special handling

| Component | Current behavior | Gaps |
|-----------|------------------|------|
| **BorderedTable** | Toolbar (search, actions) + TableCard with optional fixed-header scroll. Table has `minWidth` prop. | No `overflow-x-auto` on the BorderedTable root—relies on section wrapper. No column visibility by breakpoint (e.g. hide “Label” or “Created” on mobile). No compact/dense mode. `scrollHeight` is fixed (e.g. 350px/400px). |
| **BorderedListTable** | List-style rows with custom cells. | Section uses `overflow-x-auto`. No responsive column hiding; list layout is already vertical-friendly. |
| **VirtualizedDataTable** | Virtualized rows; toolbar; sticky header. | Same scroll wrapper in section. No column visibility by breakpoint; no compact mode. |
| **VirtualizedListView** | Virtualized list. | Same wrapper. Row height and padding could be reduced on small screens (partially present with `!min-h-8 !h-8` in some sections). |
| **Table (base)** | Generic table with optional sticky header. | Used inside TableCard; no intrinsic responsive behavior. |

**Recommendations:**  
- Ensure every table is inside a wrapper with `overflow-x-auto` and `min-w-0` (already in showcase sections; ensure BorderedTable/TableCard usage elsewhere does the same).  
- Introduce optional **responsive column visibility** (e.g. `visibleColumns` or hide low-priority columns below `md`).  
- Add **compact mode** (smaller padding, text) for small screens.  
- Use **responsive scroll height** (e.g. `min-height: 50vh` or clamp) instead of fixed `350px`/`400px`.

---

## 4. Inconsistent breakpoints

- **Breakpoint usage:** Mix of `sm:`, `md:`, `lg:`, `xl:`, `2xl:` across files. No single documented strategy (e.g. “mobile-first: base = mobile, sm = 640px, md = 768px, lg = 1024px, xl = 1280px, 2xl = 1536px”). Tailwind v4 defaults are used but not documented in the project.
- **Modal:** Uses `sm:` for centering (`items-end sm:items-center`), padding (`p-0 sm:p-4`), and rounding. No `md`/`lg` for modal width progression.
- **Drawer/Sheet:** Use `sm:max-w-*` for side panels; good.
- **Header:** `sm:` for height, padding, user block, primary label visibility.
- **CardSection / grids:** Consistently `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` (or 3). Good pattern but not extracted to a shared class or component.
- **Tabs:** `sm:px-4`, `min-h-[44px] sm:min-h-0`—touch-friendly on mobile.
- **Pagination:** `min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0` and `w-11 h-11 sm:w-8 sm:h-8`—good.
- **DropdownMenu:** `w-full sm:w-48` and `py-3 sm:py-2`, `min-h-[44px] sm:min-h-0`—good.
- **Stepper:** `sm:justify-start`, `h-10 w-10 sm:h-8 sm:w-8`—good.
- **Section:** Only `sm:text-lg` for title—no `md`/`lg` scaling.

No single “content width” or “container padding” scale is applied consistently (e.g. `px-4 sm:px-6 lg:px-8`).

---

## 5. Top UX risks on mobile

1. **Sidebar always visible**  
   On phones/small tablets, 260px (or 72px) sidebar leaves a narrow content strip. Users expect either a hamburger menu that opens a full-screen or overlay drawer, or a bottom tab bar. **Risk: Poor navigation and cramped content.**

2. **Tables with many columns**  
   All columns visible; horizontal scroll is the only mitigation. On 320px, scrolling is necessary and context (e.g. “Task” column) can be lost. **Risk: Confusing data tables on small screens.**

3. **Fixed-height charts**  
   240px (or similar) may be too tall on short viewports or waste space on large ones. **Risk: Inconsistent chart visibility and layout balance.**

4. **Modals not full-screen on mobile**  
   Default modal (e.g. `md`) stays as a centered box. On small screens, full-screen modals are often preferred for focus and easier closing. **Risk: Modal feels cramped; close target may be small.**

5. **Fixed-width form demos**  
   FormFieldSection and SelectSection use `w-56`/`w-48`/`w-64`. In real forms, inputs should be full-width on mobile. **Risk: Demo suggests fixed-width forms; production forms may copy this.**

6. **Touch targets**  
   Many interactive elements already use `min-h-[44px]`/`min-w-[44px]` or `py-3 sm:py-2`. Pagination, DropdownMenu, Tabs, Stepper, IconButton, Modal close—all have been considered. **Remaining risk:** Any custom buttons or links without minimum size.

7. **Dropdowns on touch**  
   DropdownMenu and Combobox use click/touch to open; no hover-only logic. **Risk: Low** if all actions are tap/click.

8. **Text and truncation**  
   List cards and table cells use `truncate` and `min-w-0`/`overflow-hidden` in many places. **Risk: Medium** for long titles or descriptions without `line-clamp` or `truncate` in ProductCard/FeatureCard (partially mitigated by description length).

9. **Safe area**  
   `safe-area-inset` is used in globals.css and in Modal/Drawer/Sheet. **Risk: Low** for notches and home indicators.

10. **No fluid typography**  
    Headings and body use fixed sizes. On very small or very large viewports, text doesn’t scale. **Risk: Readability and hierarchy on extreme viewports.**

---

## 6. Positive findings

- **Body:** `overflow-x: hidden` to avoid page-level horizontal scroll.
- **Main content:** `min-w-0` and `overflow-auto`/`overflow-hidden` in DashboardLayout to allow flex shrinking and scrolling.
- **Table sections:** Consistent `w-full min-w-0 max-w-7xl overflow-x-auto` wrapper.
- **Touch targets:** Widespread use of 44px minimum (buttons, pagination, tabs, dropdown items, modal close).
- **Safe area:** Utilities and usage in overlays.
- **Grids:** CardSection and similar use mobile-first grids (1 → 2 → 4 columns).
- **Header:** User and primary labels hidden on small screens; icon-only actions.
- **Modal footer:** Buttons stack on mobile (`flex-col-reverse sm:flex-row`), full-width on mobile.
- **Drawer/Sheet:** Full viewport on mobile (`max-w-[100vw]`, `max-h-[100dvh]`/`85dvh`).
- **Tabs:** Horizontal scroll for tab list when needed.
- **Card/list items:** Truncation and overflow-hidden used to avoid text overflow.

---

## 7. File-level checklist (high level)

| Area | Files to refactor | Priority |
|------|-------------------|----------|
| Layout | Sidebar.tsx, DashboardLayout.tsx | P0 |
| Containers | New shared container + spacing (e.g. layout utils or Section) | P1 |
| Tables | BorderedTable, TableCard, VirtualizedDataTable, VirtualizedListView, section wrappers | P1 |
| Charts | BarChartRechart, LineChartRechart, PieChartRechart, DoughnutChartRechart + section wrappers | P1 |
| Modals/Drawers | Modal.tsx (full-screen on mobile for default size), Drawer/Sheet (already good) | P1 |
| Forms | FormFieldSection, SelectSection; ensure Input/Select/FormField are full-width on mobile | P2 |
| Typography | globals.css or theme; Section; key headings | P2 |
| Spacing | Define scale; apply to main, Section, showcase | P2 |
| Cards/Lists | Already in good shape; verify ProductCard/FeatureCard on very narrow | P3 |
| Misc | DropdownMenu min-width on small screens; Stepper/Breadcrumb (already responsive) | P3 |

---

## Next steps (for refactor phase)

1. **Define responsive system:** Breakpoint strategy, container widths, spacing scale, grid rules (document in `docs/BREAKPOINT_AND_LAYOUT_GUIDELINES.md`).
2. **Layout:** Implement sidebar as overlay/drawer below `md` (or `lg`), with toggle from header; keep current behavior for desktop.
3. **Tables:** Add optional responsive column visibility and compact mode; replace fixed `scrollHeight` with responsive height (e.g. clamp or min-height + %).
4. **Charts:** Use aspect-ratio or min/max height with responsive units (e.g. `min-h-[200px]` + `aspect-video` or similar).
5. **Modals:** For default (and optionally other) sizes, use full-screen (full viewport) on mobile, centered on `sm`+.
6. **Forms:** Showcase and shared components: full-width inputs on mobile; remove fixed `w-56`/`w-48`/`w-64` in sections or make them `w-full max-w-*`.
7. **Typography:** Optional fluid typography (clamp or container queries) and consistent heading scale.
8. **Spacing:** Standardize on a scale (e.g. 4/8/12/16/24/32/40) and apply to main, sections, and gaps.
9. **Validation:** After refactor, check no horizontal scroll at 320px, 768px, 1024px, 1280px, 1536px; verify touch targets and modal/drawer behavior.

---

*End of Responsive Audit Report.*
