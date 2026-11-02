# Zenith Tasks

A sleek, responsive, and accessible personal task manager built with **Next.js (App Router)**, **TypeScript**, **React**, and **Tailwind CSS**.

Zenith Tasks is designed with a calm, uncluttered aesthetic to help you focus on what matters most each day, without the overhead of heavy project-management suites.

---

## ✨ Features

- **Add & Organize Tasks**: Quick task entry with optional due dates and explicit priorities (Low, Medium, High).
- **Task Status Toggle**: Mark tasks completed or active with a single click or keyboard shortcut.
- **Inline Editing**: Seamlessly edit task titles, priorities, or due dates without navigating away.
- **Filter & Search**:
  - Filter tasks by status: *All*, *Active*, or *Completed* with live badge counts.
  - Fast, real-time search filtering by task title.
- **Visual Progress & Momentum**: Responsive progress summary displaying completion count, percentage, and an accessible progress bar.
- **Clear Completed with Confirmation**: Safely clean up finished tasks with an accessible confirmation dialog.
- **Due Date & Overdue Indicators**: Clear badges indicating due dates and distinct overdue notices that do not rely on color alone.
- **Offline & Private by Design**: All tasks are persisted directly in the browser's `localStorage`.
- **Keyboard & Screen Reader Accessible**: Proper ARIA roles, visible focus rings, semantic HTML structure, and full keyboard navigation.
- **Responsive Layout**: Designed mobile-first, looking great on narrow phones, tablets, and wide desktop displays.

---

## 🔒 Data Storage & Privacy

> **Important**: All tasks are stored exclusively on your device inside your browser's `localStorage` (`zenith_todos_v1`).
>
> - **No Server or Database**: No task data is ever transmitted across the network, stored on an external server, or synced across devices.
> - **Private & Secure**: Your tasks remain private to your local browser profile.
> - **Safe Error Handling**: The application handles storage errors, quota exhaustion, or private-browsing restrictions gracefully, presenting clear notices without crashing.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js](https://nextjs.org/) (App Router, static export mode `output: 'export'`)
- **Language**: [TypeScript](https://www.typescriptlang.org/) for strict type safety
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design tokens
- **Deployment**: [GitHub Pages](https://mahfuzul-alam.github.io/todo-app/) via GitHub Actions

### Directory Structure

```
todo-app/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── src/
│   ├── app/
│   │   ├── globals.css         # Minimal Tailwind base & motion-reduction styles
│   │   ├── layout.tsx          # Root layout and metadata configuration
│   │   └── page.tsx            # Main application entry page
│   ├── components/
│   │   ├── ConfirmModal.tsx    # Accessible confirmation modal for bulk actions
│   │   ├── EmptyState.tsx      # Friendly empty states for new lists and zero search matches
│   │   ├── Icons.tsx           # Clean, lightweight accessible inline SVG icons
│   │   ├── NotificationBanner.tsx # Polite alert banner for storage warnings
│   │   ├── TodoApp.tsx         # Primary state container and client hydration manager
│   │   ├── TodoFilters.tsx     # Search input, filter tabs, and clear completed action
│   │   ├── TodoForm.tsx        # New task input, priority selector, and date picker
│   │   ├── TodoHeader.tsx      # App header and branding
│   │   ├── TodoItem.tsx        # Interactive task card with edit, toggle, and delete controls
│   │   └── TodoStats.tsx       # Progress bar and completion metrics
│   ├── lib/
│   │   └── storage.ts          # Resilient localStorage validation, sanitization, and error handling
│   └── types/
│       └── todo.ts             # TypeScript interfaces and union types
├── next.config.ts              # Next.js static export & GitHub Pages base-path configuration
├── package.json                # Project dependencies and npm scripts
├── postcss.config.mjs          # PostCSS configuration for Tailwind CSS
├── tailwind.config.ts          # Tailwind CSS theme extensions
└── tsconfig.json               # TypeScript compiler settings
```

---

## 🚀 Getting Started Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.18.0 or newer; recommended 20+)
- [npm](https://www.npmjs.com/) (version 9 or newer)

### 1. Clone the repository

```bash
git clone https://github.com/Mahfuzul-Alam/todo-app.git
cd todo-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start using the app.

### 4. Build a static production export

```bash
npm run build
```

This compiles TypeScript, generates optimized static HTML/CSS/JS files, and exports them to the `out/` folder.

---

## 🌐 GitHub Pages Deployment

The repository is configured for zero-config automatic deployment to GitHub Pages using GitHub Actions.

### Deployment Workflow (`.github/workflows/deploy.yml`)

1. Triggers automatically on any push to the `main` branch (or via manual trigger).
2. Checks out the repository and sets up Node.js with dependency caching.
3. Runs `npm ci` and `npm run build` with `NEXT_PUBLIC_BASE_PATH=/todo-app`.
4. Packages the `./out` static export directory.
5. Deploys the static site directly to GitHub Pages.

### Live URL

Once the automated workflow finishes, the live site is served at:
```
https://mahfuzul-alam.github.io/todo-app/
```

---

## ♿ Accessibility (a11y) Highlights

- **Non-Color Reliance**: Task priorities and overdue states display explicit text labels and icon badges alongside distinct color styling.
- **Keyboard Operable**: Full keyboard accessibility:
  - <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> navigates through controls.
  - <kbd>Space</kbd> / <kbd>Enter</kbd> toggles checkbox status.
  - <kbd>Enter</kbd> saves edits; <kbd>Escape</kbd> cancels inline edits or closes modal dialogs.
- **Clear Accessible Names**: Every button and form control features an explicit `aria-label`, `<label>`, or descriptive text for screen readers.
- **Focus Indicators**: High-contrast, visible focus rings on all interactive elements.
- **Reduced Motion**: Respects user OS preference for `prefers-reduced-motion: reduce`.

---

## 📄 License

MIT License. Free to use, adapt, and build upon.
