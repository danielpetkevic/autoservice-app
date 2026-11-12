# Spatie Permission Integration

The application uses Spatie Laravel Permission v8 with the published permission configuration and migrations. `App\Models\User` uses `HasRoles`; the legacy `users.role` column and enum have been removed.

Use Spatie methods for new authorization decisions:

```php
$user->hasRole('mechanic');
$user->hasAnyRole(['admin', 'mechanic']);
$user->can('view repair orders');
```

`RolePermissionSeeder` defines the current roles and permissions, synchronizes role permissions, and is called by `DatabaseSeeder`. It can also be run directly:

```bash
php artisan db:seed --class=RolePermissionSeeder
```

The backfill migration creates the three application roles and assigns them to existing users whose legacy role is `admin`, `mechanic`, or `client`. Unknown legacy values are intentionally not elevated.

When adding a permission:

1. Add it to `RolePermissionSeeder`.
2. Assign it to the appropriate role.
3. Protect routes with `permission:permission-name` or check `$user->can('permission-name')`.
4. Add allowed and denied feature tests.
