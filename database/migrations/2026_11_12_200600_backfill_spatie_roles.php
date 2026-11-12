<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $roles = ['admin', 'mechanic', 'client'];

        foreach ($roles as $role) {
            DB::table('roles')->updateOrInsert(
                ['name' => $role, 'guard_name' => 'web'],
                ['created_at' => now(), 'updated_at' => now()],
            );
        }

        $roleIds = DB::table('roles')
            ->where('guard_name', 'web')
            ->whereIn('name', $roles)
            ->pluck('id', 'name');

        DB::table('users')
            ->select(['id', 'role'])
            ->whereIn('role', $roles)
            ->orderBy('id')
            ->each(function (object $user) use ($roleIds): void {
                $roleId = $roleIds[$user->role] ?? null;

                if ($roleId === null) {
                    return;
                }

                DB::table('model_has_roles')->updateOrInsert([
                    'role_id' => $roleId,
                    'model_type' => 'App\\Models\\User',
                    'model_id' => $user->id,
                ]);
            });
    }

    public function down(): void
    {
        if (! Schema::hasTable('model_has_roles')) {
            return;
        }

        DB::table('model_has_roles')
            ->where('model_type', 'App\\Models\\User')
            ->whereIn('role_id', DB::table('roles')->whereIn('name', ['admin', 'mechanic', 'client'])->pluck('id'))
            ->delete();
    }
};
