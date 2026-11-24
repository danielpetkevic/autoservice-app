<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $permissions = [
            // Vehicles
            'vehicles.view',
            'vehicles.create',
            'vehicles.update',
            'vehicles.delete',

            // Appointments
            'appointments.view',
            'appointments.create',
            'appointments.update',
            'appointments.cancel',
            'appointments.delete',

            // Repair orders
            'repair-orders.view',
            'repair-orders.create',
            'repair-orders.update',
            'repair-orders.delete',

            // Users
            'users.manage',

            // Service categories
            'service_categories.view',
            'service_categories.manage',

            // Services
            'services.viewActive',
            'services.viewInactive',
            'services.create',
            'services.update',
            'services.delete',

            // Parts

            'parts.view',
            'parts.manage',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web',
            ]);
        }

        $admin = Role::firstOrCreate([
            'name' => 'admin',
            'guard_name' => 'web',
        ]);

        $mechanic = Role::firstOrCreate([
            'name' => 'mechanic',
            'guard_name' => 'web',
        ]);

        $client = Role::firstOrCreate([
            'name' => 'client',
            'guard_name' => 'web',
        ]);

        // Admin
        $admin->syncPermissions($permissions);

        // Mechanic
        $mechanic->syncPermissions([
            'vehicles.view',
            'appointments.view',
            'repair-orders.view',
            'repair-orders.update',
            'service_categories.view',
            'services.viewActive',
            'services.viewInactive',
            'services.update',
            'parts.view',
        ]);

        // Client
        $client->syncPermissions([
            'vehicles.view',
            'vehicles.create',
            'vehicles.update',
            'vehicles.delete',
            'appointments.view',
            'appointments.create',
            'appointments.update',
            'appointments.cancel',
            'repair-orders.view',
            'service_categories.view',
            'services.viewActive',
        ]);

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}
