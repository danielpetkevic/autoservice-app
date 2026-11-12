<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Vehicle;

class VehiclePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('vehicles.view');
    }

    public function view(User $user, Vehicle $vehicle): bool
    {
        if (!$user->can('vehicles.view')) {
            return false;
        }

        if ($user->hasRole('admin')) {
            return true;
        }

        if ($user->hasRole('client')) {
            return $vehicle->user_id === $user->id;
        }

        return $user->hasRole('mechanic')
            && $vehicle->appointments()
                ->whereHas('repairOrder', fn($query) => $query->where('mechanic_id', $user->id))
                ->exists();
    }

    public function create(User $user): bool
    {
        if(!$user->can('vehicles.create')) {
            return false;
        }
    
        return $user->hasAnyRole('admin|client');
    }

    public function update(User $user, Vehicle $vehicle): bool
    {
        if(!$user->can('vehicles.update')) {
            return false;
        }
        return $user->hasRole('admin') || ($user->hasRole('client') && $vehicle->user_id === $user->id);
    }

    public function delete(User $user, Vehicle $vehicle): bool
    {
        if(!$user->can('vehicles.delete')) {
            return false;
        }

        if ($user->hasRole('admin')) {
            return true;
        }

        return $user->hasRole('client')
            && $vehicle->user_id === $user->id
            && !$vehicle->appointments()->exists();
    }
}
