# codex_t1

## Empty repository push error fix

If you see an error like:

```
This repository is empty. Create a default branch (e.g. main) by pushing an initial commit, then retry.
```

run the following commands from your local clone:

```bash
# 1) create an initial commit (if needed)
git add .
git commit -m "Initial commit"

# 2) create/switch to default branch
# (use main or your preferred default branch)
git branch -M main

# 3) push and set upstream
git push -u origin main
```

After that, retry the operation that failed.
