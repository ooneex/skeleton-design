---
name: commit
description: Commit staged changes grouped by logical change. Use when committing multiple independent changes separately, when you need to create atomic commits per logical unit of work, or after making a mix of changes across the codebase. Analyzes git status and creates properly formatted commits following commitlint conventions.
---

# Commit Per Change

Create separate commits for each logical change, following the project's commitlint conventions. A "logical change" is a coherent unit of work — one feature, one fix, one refactor — regardless of how many files or modules it touches.

## Core Principle

**Group by intent, not by location.** A single feature that spans multiple modules is one commit. Two unrelated fixes in the same module are two commits.

## Workflow

1. **Survey all changes**
   - Run `git status --porcelain` to list modified files
   - Run `git diff` (and `git diff --staged`) to understand what actually changed
   - Read the diffs — don't rely on file paths alone to infer intent

2. **Group files by logical change**
   - Identify coherent units: each feature, fix, refactor, or concern is its own group
   - A single group may span multiple modules (e.g., a feature touching `ruby` + `shared`)
   - A single module may contribute to multiple groups (split it across commits)
   - Unrelated changes must go in separate commits, even if they sit in the same file — use `git add -p` for hunk-level staging when needed

3. **For each logical change**
   - Stage only the files (or hunks) belonging to that change
   - Choose the best-fitting `type` and `scope` based on the change itself
   - Commit with proper format: `type(scope): Subject`
   - Repeat until the working tree is clean (or only unrelated work remains)

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
Scopes are defined by the project's commitlint config:
- `common`: Root-level files (bun.lock, package.json, configs, tooling)
- `app`: Backend module (`modules/app`)
- `shared`: Shared UI components, migrations, seeds (`modules/shared`)
- `ruby`: Frontend SPA (`modules/ruby`)

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
| Build tooling (Vite, bundler configs) | `build` |
| CI/CD workflows | `ci` |
| Formatting, whitespace only | `style` |
| Measurable performance work | `perf` |

If a change mixes types, pick the one that reflects the primary intent and mention the rest in the subject or split the commit.

## Examples

### Example 1: Multiple Independent Changes

Git status shows:
```
M modules/ruby/src/components/MultiStepForm.tsx
M modules/ruby/src/components/ui/tabs.tsx
M modules/shared/src/migrations/001_init.sql
M modules/app/src/routes/auth.ts
M bun.lock
```

After reading the diffs you discover:
- `MultiStepForm.tsx` + `tabs.tsx` → new multi-step wizard feature
- `auth.ts` → fixes a token-refresh race condition
- `001_init.sql` → adds missing index (separate from both)
- `bun.lock` → unrelated dependency bump

Commands to execute:
```bash
# Feature: wizard spans ruby only
git add modules/ruby/src/components/MultiStepForm.tsx modules/ruby/src/components/ui/tabs.tsx
git commit -m "feat(ruby): Add multi-step form wizard"

# Fix: auth race condition
git add modules/app/src/routes/auth.ts
git commit -m "fix(app): Prevent token refresh race condition"

# Perf/chore: index is its own concern
git add modules/shared/src/migrations/001_init.sql
git commit -m "perf(shared): Add index on users.email"

# Dependency bump
git add bun.lock
git commit -m "chore(common): Update dependencies"
```

### Example 2: Single Logical Change Spanning Modules

Git status shows:
```
M modules/ruby/src/api/videos.ts
M modules/app/src/routes/videos.ts
M modules/shared/src/types/video.ts
```

All three files implement the same feature (video tagging). This is **one** commit — pick the scope that represents the primary intent:
```bash
git add modules/ruby/src/api/videos.ts modules/app/src/routes/videos.ts modules/shared/src/types/video.ts
git commit -m "feat(app): Add video tagging support"
```

### Example 3: Multiple Changes in the Same File

`git diff modules/ruby/src/components/MultiStepForm.tsx` reveals two unrelated edits:
- A bug fix for validation on step 2
- A refactor renaming internal state variables

Stage per-hunk to keep them atomic:
```bash
git add -p modules/ruby/src/components/MultiStepForm.tsx   # accept the fix hunks
git commit -m "fix(ruby): Validate required fields on wizard step 2"

git add modules/ruby/src/components/MultiStepForm.tsx      # stage the rest
git commit -m "refactor(ruby): Rename wizard step state variables"
```

### Example 4: Refactor with Renames/Deletions

Git status shows:
```
D modules/ruby/src/components/OldForm.tsx
A modules/ruby/src/components/NewForm.tsx
M modules/ruby/src/routes/signup.tsx
```

All part of the same rewrite:
```bash
git add modules/ruby/src/components/OldForm.tsx modules/ruby/src/components/NewForm.tsx modules/ruby/src/routes/signup.tsx
git commit -m "refactor(ruby): Replace OldForm with NewForm"
```

## Subject Line Guidelines

Write clear, descriptive subjects:

| Good | Bad |
|------|-----|
| `Add multi-step form wizard` | `wizard` |
| `Fix token refresh race condition` | `fix bug` |
| `Replace OldForm with NewForm` | `rename` |
| `Remove deprecated API methods` | `cleanup` |
| `Add index on users.email` | `db change` |

## Pre-commit Checklist

Before each commit, verify:
1. The staged files belong to **one** logical change
2. No unrelated edits are sneaking in (run `git diff --staged` to confirm)
3. No debug code, `console.log`, or temporary scaffolding left behind
4. Subject line matches the format exactly and reflects the actual change

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
