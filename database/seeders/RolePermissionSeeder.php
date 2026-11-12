<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [];
        foreach (['admin', 'mechanic', 'client'] as $roleName) {
            $roles[$roleName] = Role::firstOrCreate([
                'name' => $roleName,
                'guard_name' => 'web',
            ]);
        }

        $permissions = [
            'view vehicles',
            'create vehicles',
            'update vehicles',
            'delete vehicles',
            'view appointments',
            'manage appointments',
            'view repair orders',
            'manage repair orders',
            'manage users',
        ];

        foreach ($permissions as $permissionName) {
            Permission::firstOrCreate([
                'name' => $permissionName,
                'guard_name' => 'web',
            ]);
        }

        $roles['admin']->syncPermissions($permissions);
        $roles['mechanic']->syncPermissions([
            'view vehicles',
            'view appointments',
            'view repair orders',
            'manage repair orders',
        ]);
        $roles['client']->syncPermissions([
            'view vehicles',
            'create vehicles',
            'update vehicles',
            'delete vehicles',
            'view appointments',
        ]);
    }
}
