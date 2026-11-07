
$issues = @(
    "Configure Laravel and React environment",
    "Configure MySQL database",
    "Create database migrations",
    "Create Eloquent models and relationships",
    "Create database seeders and factories",
    "Implement user roles and permissions",
    "Implement role-based dashboards",
    "Implement Vehicles CRUD",
    "Implement Service Categories CRUD",
    "Implement Services CRUD",
    "Implement Parts CRUD",
    "Implement appointment booking",
    "Implement appointment approval and cancellation",
    "Prevent overlapping appointments",
    "Implement Repair Orders CRUD",
    "Implement mechanic assignment",
    "Implement Repair Services management",
    "Implement Repair Parts management",
    "Calculate repair order totals",
    "Implement payments management",
    "Implement admin dashboard",
    "Implement mechanic dashboard",
    "Implement client dashboard",
    "Implement searching and filtering",
    "Implement Pest feature tests",
    "Improve responsive design",
    "Prepare README and deployment"
)

foreach ($issue in $issues) {
    gh issue create --title $issue --body "AutoService development task."
}
