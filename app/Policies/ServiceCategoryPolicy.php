<?php

namespace App\Policies;

use App\Models\ServiceCategory;
use App\Models\User;

class ServiceCategoryPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('service_categories.view');
    }

    public function create(User $user): bool
    {
        return $user->can('service_categories.manage');
    }

    public function update(User $user, ServiceCategory $category): bool
    {
        return $user->can('service_categories.manage');
    }

    public function delete(User $user, ServiceCategory $category): bool
    {
        return $user->can('service_categories.manage');
    }
}
