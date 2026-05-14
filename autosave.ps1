# Autosave script — commits any changes every 30 minutes
$repoPath = "C:\Users\david\Bureau\mon-portfolio"
Set-Location $repoPath

$changes = git status --porcelain 2>&1
if ($changes) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
    git add -A
    git commit -m "autosave: $timestamp"
    Add-Content -Path "$repoPath\autosave.log" -Value "[$timestamp] Saved: $($changes.Count) file(s) changed"
} else {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
    Add-Content -Path "$repoPath\autosave.log" -Value "[$timestamp] No changes"
}
