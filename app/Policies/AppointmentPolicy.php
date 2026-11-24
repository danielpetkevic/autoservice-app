<?php

namespace App\Policies;

use App\Models\Appointment;
use App\Models\User;

class AppointmentPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('appointments.view');
    }

    public function view(User $user, Appointment $appointment): bool
    {
        if (! $user->can('appointments.view')) {
            return false;
        }

        if ($user->hasRole('admin')) {
            return true;
        }

        if ($user->hasRole('client')) {
            return $appointment->user_id === $user->id;
        }

        return false;
    }

    public function create(User $user): bool
    {
        return $user->can('appointments.create');
    }

    public function update(User $user, Appointment $appointment): bool
    {
        if (! $user->can('appointments.update')) {
            return false;
        }

        if ($user->hasRole('admin')) {
            return true;
        }

        return $user->hasRole('client')
            && $appointment->user_id === $user->id
            && $appointment->status === 'scheduled'
            && ! $appointment->repairOrder()->exists();
    }

    public function cancel(User $user, Appointment $appointment): bool
    {
        if (! $user->can('appointments.cancel')) {
            return false;
        }

        if ($user->hasRole('admin')) {
            return $appointment->status === 'scheduled';
        }

        return $user->hasRole('client')
            && $appointment->user_id === $user->id
            && $appointment->status === 'scheduled'
            && ! $appointment->repairOrder()->exists();
    }

    public function delete(User $user, Appointment $appointment): bool
    {
        return $user->can('appointments.delete')
            && $user->hasRole('admin')
            && ! $appointment->repairOrder()->exists();
    }

    public function selectServices(User $user, Appointment $appointment): bool
    {
        if (! $user->can('appointments.update')) {
            return false;
        }

        if ($user->hasRole('admin')) {
            return ! $appointment->repairOrder()->exists();
        }

        return $user->hasRole('client')
            && $appointment->user_id === $user->id
            && $appointment->status === 'scheduled'
            && ! $appointment->repairOrder()->exists();
    }

    public function manageStatus(User $user, Appointment $appointment): bool
    {
        return $user->hasRole('admin');
    }
}
