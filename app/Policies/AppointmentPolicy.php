<?php

namespace App\Policies;

use App\Models\Appointment;
use App\Models\User;

class AppointmentPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isAdmin() || $user->isClient() || $user->isMechanic();
    }

    public function view(User $user, Appointment $appointment): bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        if ($user->isClient()) {
            return $appointment->vehicle->user_id === $user->id;
        }

        return $user->isMechanic()
            && $appointment->repairOrder->mechanic_id === $user->id;
    }

    public function create(User $user): bool
    {
        return $user->isAdmin() || $user->isClient();
    }

    public function update(User $user, Appointment $appointment): bool
    {
        return $user->isAdmin() || ($user->isClient() && $appointment->vehicle->user_id === $user->id);
    }

    public function cancel(User $user, Appointment $appointment): bool
    {
        return $user->isAdmin() || ($user->isClient() && $appointment->vehicle->user_id === $user->id && $appointment->status === 'pending');
    }

    public function confirm(User $user, Appointment $appointment): bool
    {
        return $user->isAdmin();
    }

    public function delete(User $user, Appointment $appointment): bool
    {
        return $user->isAdmin();
    }

    public function selectServices(User $user, Appointment $appointment): bool
    {
        return $user->isAdmin() || ($user->isClient() && $appointment->vehicle->user_id === $user->id);
    }
}
