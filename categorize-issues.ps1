
$rules = @{
    "Configure Laravel and React environment" = "backend,frontend"
    "Configure MySQL database" = "database"
    "Create database migrations" = "database"
    "Create Eloquent models and relationships" = "backend,database"
    "Create database seeders and factories" = "database,testing"
    "Implement user roles and permissions" = "backend,authentication"
    "Implement role-based dashboards" = "frontend,authentication"
    "Implement Vehicles CRUD" = "backend,frontend,database"
    "Implement Service Categories CRUD" = "backend,frontend,database"
    "Implement Services CRUD" = "backend,frontend,database"
    "Implement Parts CRUD" = "backend,frontend,database"
    "Implement appointment booking" = "backend,frontend"
    "Implement appointment approval and cancellation" = "backend,frontend"
    "Prevent overlapping appointments" = "backend,testing"
    "Implement Repair Orders CRUD" = "backend,frontend,database"
    "Implement mechanic assignment" = "backend,authentication"
    "Implement Repair Services management" = "backend,frontend"
    "Implement Repair Parts management" = "backend,frontend"
    "Calculate repair order totals" = "backend,testing"
    "Implement payments management" = "backend,frontend"
    "Implement admin dashboard" = "frontend"
    "Implement mechanic dashboard" = "frontend"
    "Implement client dashboard" = "frontend"
    "Implement searching and filtering" = "backend,frontend"
    "Implement Pest feature tests" = "testing"
    "Improve responsive design" = "frontend"
    "Prepare README and deployment" = "documentation"
}

$issues = gh issue list --state all --limit 200 `
    --json number,title | ConvertFrom-Json

foreach ($issue in $issues) {
    if ($rules.ContainsKey($issue.title)) {
        $labels = $rules[$issue.title]

        gh issue edit $issue.number `
            --add-label $labels

        Write-Host "Categorized #$($issue.number): $($issue.title)"
    }
}
