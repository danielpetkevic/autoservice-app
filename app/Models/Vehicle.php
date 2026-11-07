<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vehicle extends Model
{
    /** @use HasFactory<\Database\Factories\VehicleFactory> */
    use HasFactory;

    /**
     * @return BelongsTo<User, $this>
     */
    public function getUser(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    /**
     * Get the appointments associated with the vehicle.
     *
     * @return HasMany<Appointment, $this>
     */
    public function getAppointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }
}