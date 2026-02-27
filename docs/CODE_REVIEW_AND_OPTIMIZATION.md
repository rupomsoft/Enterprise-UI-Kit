# AI Code Review & Performance Optimization Report

**Project:** React + TypeScript + Tailwind UI Kit (ERP / dashboards)  
**Scope:** `app/components/ui/*`, `app/components/UIKitShowcase/*`, `app/components/dashboard/*`

---

## 1. Critical performance issues

### 1.1 Dead dependency: `react-quill-new` (Bundle)

| File | Impact |
|------|--------|
| `package.json` | **High** |

**Problem:** `react-quill-new` is listed in dependencies but never imported. The app uses Tiptap for `RichTextEditor`. This adds unnecessary weight to the bundle and install time.

**Fix:** Remove the dependency.

```bash
pnpm remove react-quill-new
```

---

### 1.2 RichTextEditor: inline component and unstable references (Rendering)

| File | Impact |
|------|--------|
| `app/components/ui/RichTextEditor.tsx` | **High** |

**Problem:**
- `ToolbarButton` is defined **inside** the component, so it’s recreated every render. Any child of `EditorContent` or toolbar that depends on it can re-render unnecessarily.
- `useEditor` receives an inline `extensions` array and inline `onUpdate`/`editorProps` objects every render, which can trigger internal re-inits or extra work in Tiptap.

**Fix:**
- Extract `ToolbarButton` to a small component **outside** `RichTextEditor` (or in the same file, above the main component) and keep it pure so it can be memoized if needed.
- Memoize `extensions` with `useMemo` (and ensure `Placeholder.configure({ placeholder })` is in the dependency array).
- Wrap `onUpdate` in `useCallback` and keep `editorProps` in a `useMemo` keyed by `disabled` (and any other relevant props).

**Before (conceptual):**
```tsx
export function RichTextEditor({ ... }) {
  const editor = useEditor({
    extensions: [StarterKit.configure(...), Placeholder.configure({ placeholder })],
    onUpdate: ({ editor }) => { onChange?.(editor.getHTML()); },
    editorProps: { attributes: { class: "..." } },
  });
  const ToolbarButton = ({ onClick, active, ... }) => (...);
  return (...);
}
```

**After:** Extract `ToolbarButton`, use `useMemo` for `extensions` and `editorProps`, and `useCallback` for `onUpdate`.

---

### 1.3 DropdownMenu: list key and optional memo (Rendering / A11y)

| File | Impact |
|------|--------|
| `app/components/ui/DropdownMenu.tsx` | **Medium** |

**Problem:** `items.map((item, i) => (... key={i} ))` uses index as key. If `items` are reordered or filtered, React can reuse the wrong DOM nodes and cause focus/state bugs. For menu items, duplicate labels are possible, so index is brittle.

**Fix:** Use a stable key per item. Prefer `item.label` if labels are unique; otherwise `${item.label}-${i}` or an explicit `id` if you add it to the type.

```tsx
// Before
{items.map((item, i) => (
  <button key={i} ...>

// After (if labels are unique)
{items.map((item) => (
  <button key={item.label} ...>

// Or
{items.map((item, i) => (
  <button key={item.label ?? `item-${i}`} ...>
```

---

### 1.4 Toast: effect dependency on `onClose` (Correctness / Performance)

| File | Impact |
|------|--------|
| `app/components/ui/Toast.tsx` | **Medium** |

**Problem:** `useEffect(..., [open, autoDismissMs, onClose])` runs whenever `onClose` changes. If the parent passes an inline function (e.g. `onClose={() => setOpen(false)}`), the effect runs every render and can reset the dismiss timer or cause multiple timers.

**Fix:** Either:
- Document that callers must pass a stable `onClose` (e.g. from `useCallback`), or
- Use a ref to hold the latest `onClose` and call `ref.current` from the effect so the effect only depends on `open` and `autoDismissMs`:

```tsx
const onCloseRef = useRef(onClose);
onCloseRef.current = onClose;
useEffect(() => {
  if (!open || autoDismissMs <= 0) return;
  const id = window.setTimeout(() => onCloseRef.current(), autoDismissMs);
  return () => window.clearTimeout(id);
}, [open, autoDismissMs]);
```

---

## 2. Architecture improvements

### 2.1 BorderedTableSection: inline props (Rendering)

| File | Impact |
|------|--------|
| `app/components/UIKitShowcase/sections/BorderedTableSection.tsx` | **Medium** |

**Problem:** `actionColumnMenu={(row) => [...]}`, `getRowKey={(row) => row.id}`, and `toolbarAction={<div>...</div>}` are created every render. `BorderedTable`’s `tableColumns` useMemo depends on `actionColumnMenu` (and similar), so it recomputes every time and can cause extra work in the table (e.g. header/row re-renders).

**Fix:** In the **showcase** (and as a pattern for consumers), stabilize callbacks and static content:
- `getRowKey`: define once outside the component or with `useCallback`.
- `actionColumnMenu`: wrap in `useCallback` (with empty or minimal deps if the menu doesn’t close over changing state).
- `toolbarAction`: either move to a variable outside the component or memoize with `useMemo` if it depends on state.

Same idea for `VirtualizedDataTableSection` and similar sections: stabilize `getRowKey`, `actionColumnMenu`, and any other callback/list props passed to data-heavy components.

---

### 2.2 Chart components: inline style objects (Rendering)

| File | Impact |
|------|--------|
| `app/components/ui/BarChartRechart.tsx`, `LineChartRechart.tsx`, `PieChartRechart.tsx`, `DoughnutChartRechart.tsx` | **Low** |

**Problem:** `margin={{ top: 8, right: 8, left: 0, bottom: 0 }}` and `contentStyle={{ ... }}` create new objects every render. Recharts may do shallow checks and re-render more than needed.

**Fix:** Define shared constants outside the component and reuse them:

```tsx
const CHART_MARGIN = { top: 8, right: 8, left: 0, bottom: 0 };
const TOOLTIP_STYLE = { borderRadius: "8px", border: "1px solid var(--border)" };
```

Then use `margin={CHART_MARGIN}` and `contentStyle={TOOLTIP_STYLE}`.

---

### 2.3 Virtualized components: scroll handler (Rendering)

| File | Impact |
|------|--------|
| `VirtualizedDataTable.tsx`, `VirtualizedListView.tsx`, `VirtualizedGridView.tsx` | **Low** |

**Current:** `onScroll` is wrapped in `useCallback` with empty deps; the handler reads `parentRef.current` and calls `setScrollTop`. This is already good.

**Optional:** Ensure the scroll listener is registered with `{ passive: true }` where supported (you already do in VirtualizedDataTable). Apply the same in VirtualizedListView and VirtualizedGridView if they attach scroll listeners.

---

### 2.4 RichTextEditor: controlled value sync (Correctness)

| File | Impact |
|------|--------|
| `app/components/ui/RichTextEditor.tsx` | **Low** |

**Current:** The effect that runs `setContent(value)` when `value !== editor.getHTML()` is correct for controlled usage: it avoids overwriting when the change came from the editor’s own `onUpdate`.

**Optional:** To avoid running the effect on every render when `value` is unchanged, you can short-circuit with a ref that stores the last applied value and only call `setContent` when `value !== lastAppliedRef.current`.

---

## 3. Bundle size improvements

### 3.1 Remove unused dependency (see 1.1)

- Remove `react-quill-new`.

### 3.2 Tree-shaking and exports

| File | Impact |
|------|--------|
| `app/components/ui/index.ts` | **Low** |

**Current:** The barrel file re-exports many components and types. Next.js and bundlers can tree-shake when using named imports (e.g. `import { Button } from "@/app/components/ui"`). No change required if all imports are named; if you ever add `import * as UI from "..."`, tree-shaking may be less effective.

**Suggestion:** Keep using named imports per component. Optionally split the barrel into sub-barrels (e.g. `ui/buttons`, `ui/tables`) if the main barrel ever becomes a bottleneck.

### 3.3 Heavy dependencies

- **Tiptap:** Already used only by `RichTextEditor`; no image/file extensions, so the bundle is reasonable.
- **Recharts:** Used by chart components; ensure only the chart types you use are imported (e.g. `Bar`, `Line`, `Pie`) so the rest can be tree-shaken.

---

## 4. Code quality fixes

### 4.1 TypeScript

- No `any` usages were found in the reviewed components. Keep strict typing and avoid `any` in new code.

### 4.2 Accessibility

| Area | Recommendation |
|------|----------------|
| **Modal** | Add focus trap (focus first focusable on open, trap Tab, restore focus on close). Consider `aria-describedby` for the content area if you have a separate description. |
| **DropdownMenu** | Ensure menu can be closed with Escape and that focus returns to the trigger when closed. |
| **Toast** | `aria-live="polite"` (or `assertive` for critical toasts) so screen readers announce the message. |
| **Virtualized lists/tables** | Row/cell roles and `aria-rowindex` / `aria-colindex` where they improve navigation (optional, for complex grids). |

### 4.3 Naming and structure

- **BorderedTable** and **VirtualizedDataTable** share a lot of patterns (toolbar, selection, search). Consider extracting a shared hook (e.g. `useTableSelection`, `useTableSearch`) or a small shared toolbar component to reduce duplication. This is optional and can be done incrementally.

---

## 5. Optional enhancements

### 5.1 React.memo on presentational components

- **Button,** **Card,** **Badge,** **Input:** These are leaf or near-leaf components. Wrapping them in `React.memo` can reduce re-renders when parent re-renders with the same props. Measure first; add memo where profiling shows benefit.

### 5.2 SearchableDropdown / table search: debounce

- **SearchableDropdown:** Filtering is synchronous on every keystroke. For very large option lists (e.g. 10k+), consider debouncing the search input (e.g. 150–200 ms) so filtering runs less often while typing.
- **BorderedTable / VirtualizedDataTable:** Same idea for the toolbar search: debounce before updating `search` state so filtering and re-renders are reduced during fast typing.

### 5.3 CardSection data

- **CardSection:** Large inline data (e.g. `cardItems`, `productItems`) is recreated every render. Moving it outside the component (or into a module-level constant) avoids unnecessary reference changes and is a good pattern for static showcase data.

### 5.4 Form components

- **Input, Select, FormField:** Already use stable patterns. If you add form-level validation (e.g. react-hook-form), keep validation and submit logic in a single place and avoid storing derived state (e.g. “touched”) when it can be computed from existing state.

---

## Summary table

| Category              | Count | Priority |
|-----------------------|-------|----------|
| Critical performance  | 4     | Fix first |
| Architecture          | 4     | Next     |
| Bundle                | 1–2   | Quick win (remove dead dep) |
| Code quality / A11y   | 4     | Incremental |
| Optional              | 4     | As needed |

---

**Next steps:**  
1. Remove `react-quill-new`.  
2. Refactor RichTextEditor (extract ToolbarButton, memoize extensions/onUpdate/editorProps).  
3. Fix DropdownMenu key and Toast effect.  
4. Stabilize BorderedTableSection (and similar sections) callbacks.  
5. Add chart style constants.  
6. Add Modal focus trap and Toast `aria-live` when touching those components.
