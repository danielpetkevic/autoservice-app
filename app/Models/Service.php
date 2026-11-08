<?php

namespace App\Models;

use Database\Factories\ServiceFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    /** @use HasFactory<ServiceFactory> */
    use HasFactory;

    /**
     * @return BelongsTo<ServiceCategory, $this>
     */
    public function getServiceCategory(): BelongsTo
    {
        return $this->belongsTo(ServiceCategory::class);
    }

    /**
     * @return BelongsToMany<Appointment, $this>
     */
    public function getAppointments(): BelongsToMany
    {
        return $this->belongsToMany(Appointment::class, 'appointment_services');
    }

    /**
     * @return HasMany<RepairService, $this>
     */
    public function getRepairServices(): HasMany
    {
        return $this->hasMany(RepairService::class);
    }
}
