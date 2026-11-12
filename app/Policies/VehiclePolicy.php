<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Vehicle;

class VehiclePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isAdmin() || $user->isClient() || $user->isMechanic();
    }

    public function view(User $user, Vehicle $vehicle): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        if ($user->isClient()) {
            return $vehicle->user_id === $user->id;
        }

        return $user->isMechanic()
            && $vehicle->appointments()
                ->whereHas('repairOrder', fn ($query) => $query->where('mechanic_id', $user->id))
                ->exists();
    }

    public function create(User $user): bool
    {
        return $user->isAdmin() || $user->isClient();
    }

    public function update(User $user, Vehicle $vehicle): bool
    {
        return $user->isAdmin()
            || ($user->isClient() && $vehicle->user_id === $user->id);
    }

    public function delete(User $user, Vehicle $vehicle): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return $user->isClient()
            && $vehicle->user_id === $user->id
            && ! $vehicle->appointments()->exists();
    }
}
