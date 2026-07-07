---
name: commit
description: Commit staged changes grouped by logical change. Use when committing multiple independent changes separately, when you need to create atomic commits per logical unit of work, or after making a mix of changes across the codebase. Analyzes git status and creates properly formatted commits following the project's conventional-commit conventions.
---

# Commit Per Change

Create separate commits for each logical change, following the project's conventional-commit conventions. A "logical change" is a coherent unit of work — one feature, one fix, one refactor — regardless of how many files or directories it touches.

## Core Principle

**Group by intent, not by location.** A single feature that spans multiple directories is one commit. Two unrelated fixes in the same file are two commits.

## Committer

Commit only as the project's git user. **Never** add a `Co-Authored-By: Claude` trailer, a "Generated with Claude Code" line, or any other AI attribution to the commit message.

## Workflow

1. **Survey all changes**
   - Run `git status --porcelain` to list modified files
   - Run `git diff` (and `git diff --staged`) to understand what actually changed
   - Read the diffs — don't rely on file paths alone to infer intent

2. **Group files by logical change**
   - Identify coherent units: each feature, fix, refactor, or concern is its own group
   - A single group may span multiple directories (e.g., a component touching `components` + `hooks`)
   - A single file may contribute to multiple groups (split it across commits)
   - Unrelated changes must go in separate commits, even if they sit in the same file — use `git add -p` for hunk-level staging when needed

3. **For each logical change**
   - Stage only the files (or hunks) belonging to that change
   - Choose the best-fitting `type` and `scope` based on the change itself
   - Commit with proper format: `type(scope): Subject`
   - Repeat until the working tree is clean (or only unrelated work remains)

4. **Push**
   - Once all commits are created, push to the remote: `git push`
   - If the branch has no upstream yet, use `git push -u origin <branch>`
   - Never force-push (`--force`/`--force-with-lease`) unless the user explicitly asks for it

## Commit Message Format

```
type(scope): Subject line
```

### Valid Types
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code restructuring (no new feature, no bug fix)
- `test`: Adding/updating tests
- `chore`: Maintenance tasks (dependencies, configs)
- `docs`: Documentation changes
- `style`: Code style changes (formatting, whitespace)
- `perf`: Performance improvements
- `build`: Build system changes
- `ci`: CI configuration changes
- `revert`: Revert a previous commit

### Valid Scopes
Scopes follow the source layout under `src/` and the established git history:
- `components`: UI components (`src/components`)
- `icons`: Icon library, fill and outline (`src/icons`)
- `hooks`: Shared React hooks (`src/hooks`)
- `utils`: Utility helpers (`src/utils`)
- `fonts`: Font families and assets (`src/fonts`)
- `styles`: Global stylesheets and design tokens (`src/styles`)
- `config`: Root-level tooling, dependencies, configs, and type declarations (`package.json`, `bun.lock`, `biome.jsonc`, `tsconfig.json`, `src/css.d.ts`)

When a logical change spans multiple scopes, pick the scope that best represents the **primary** intent of the change. If truly split, prefer separate commits.

### Subject Rules
- Use sentence-case, start-case, pascal-case, or upper-case
- No period at the end
- Maximum 100 characters for entire header
- Use imperative mood ("Add feature" not "Added feature")

## Choosing Commit Type

Let the nature of the change — not the file type — decide:

| Change Pattern | Type |
|---------------|------|
| New user-facing capability | `feat` |
| Corrects broken behavior | `fix` |
| Restructure without behavior change | `refactor` |
| Only test files changed | `test` |
| Only documentation (`*.md`) | `docs` |
| Dependencies, lockfiles | `chore` |
| Build tooling, type declarations (`css.d.ts`) | `build` |
| CI/CD workflows | `ci` |
| Formatting, whitespace only | `style` |
| Measurable performance work | `perf` |

If a change mixes types, pick the one that reflects the primary intent and mention the rest in the subject or split the commit.

## Examples

### Example 1: Multiple Independent Changes

Git status shows:
```
M src/components/tabs/Tabs.tsx
M src/components/dialog/Dialog.tsx
M src/hooks/useClickOutside.tsx
M src/styles/app.css
M bun.lock
```

After reading the diffs you discover:
- `Tabs.tsx` + `Dialog.tsx` → new keyboard-navigation feature shared across both
- `useClickOutside.tsx` → fixes a stale-listener bug
- `app.css` → adds a new design token (separate concern)
- `bun.lock` → unrelated dependency bump

Commands to execute:
```bash
# Feature: keyboard navigation spans two components
git add src/components/tabs/Tabs.tsx src/components/dialog/Dialog.tsx
git commit -m "feat(components): Add keyboard navigation to tabs and dialog"

# Fix: stale listener in hook
git add src/hooks/useClickOutside.tsx
git commit -m "fix(hooks): Remove stale listener in useClickOutside"

# Styles: new design token
git add src/styles/app.css
git commit -m "feat(styles): Add accent color design token"

# Dependency bump
git add bun.lock
git commit -m "chore(config): Update dependencies"

# Push all commits to the remote
git push
```

### Example 2: Single Logical Change Spanning Directories

Git status shows:
```
M src/components/upload/FileUpload.tsx
M src/hooks/useControlledState.tsx
M src/utils/cn.ts
```

All three files implement the same feature (drag-and-drop upload). This is **one** commit — pick the scope that represents the primary intent:
```bash
git add src/components/upload/FileUpload.tsx src/hooks/useControlledState.tsx src/utils/cn.ts
git commit -m "feat(components): Add drag-and-drop upload support"
```

### Example 3: Multiple Changes in the Same File

`git diff src/components/form/Form.tsx` reveals two unrelated edits:
- A bug fix for validation on submit
- A refactor renaming internal state variables

Stage per-hunk to keep them atomic:
```bash
git add -p src/components/form/Form.tsx   # accept the fix hunks
git commit -m "fix(components): Validate required fields on form submit"

git add src/components/form/Form.tsx      # stage the rest
git commit -m "refactor(components): Rename form state variables"
```

### Example 4: Refactor with Renames/Deletions

Git status shows:
```
D src/components/error/ErrorPage.tsx
A src/components/error/ErrorFallback.tsx
M src/components/editor/Editor.tsx
```

All part of the same rewrite:
```bash
git add src/components/error/ErrorPage.tsx src/components/error/ErrorFallback.tsx src/components/editor/Editor.tsx
git commit -m "refactor(components): Replace ErrorPage with ErrorFallback"
```

## Subject Line Guidelines

Write clear, descriptive subjects:

| Good | Bad |
|------|-----|
| `Add drag-and-drop upload support` | `upload` |
| `Remove stale listener in useClickOutside` | `fix bug` |
| `Replace ErrorPage with ErrorFallback` | `rename` |
| `Remove deprecated icon variants` | `cleanup` |
| `Add accent color design token` | `css change` |

## Pre-commit Checklist

Before each commit, verify:
1. The staged files belong to **one** logical change
2. No unrelated edits are sneaking in (run `git diff --staged` to confirm)
3. No debug code, `console.log`, or temporary scaffolding left behind
4. Subject line matches the format exactly and reflects the actual change
5. No AI attribution or `Co-Authored-By: Claude` trailer in the message

## Handling Special Cases

### A File Contains Multiple Logical Changes
Use `git add -p` to stage hunks individually. Commit each logical change separately. Do not bundle unrelated edits just because they share a file.

### A Change Legitimately Touches Many Scopes
Pick the scope that represents the primary intent (usually where the user-visible behavior lives). Mention the supporting changes in the subject if it helps clarity. Split only when the sub-changes are independently useful.

### Formatting Noise Mixed With Real Changes
Commit the real change first with its proper type/scope, then commit the formatting separately as `style(scope): …`. Never hide behavior changes behind a `style` commit.

### Deletions or Renames
Classify by intent, not by the `D`/`R` status:
- Removing dead code → `refactor`
- Removing a feature the user could see → `feat` (with a "Remove …" subject) or `refactor` if purely internal
- Reorganizing files without behavior change → `refactor`
