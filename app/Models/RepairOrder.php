<?php

namespace App\Models;

use Database\Factories\RepairOrderFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RepairOrder extends Model
{
    /** @use HasFactory<RepairOrderFactory> */
    use HasFactory;

    /**
     * @return HasMany<Payment, $this>
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    /**
     * @return HasMany<RepairService, $this>
     */
    public function repairServices(): HasMany
    {
        return $this->hasMany(RepairService::class);
    }

    /**
     * @return HasMany<RepairPart, $this>
     */
    public function repairParts(): HasMany
    {
        return $this->hasMany(RepairPart::class);
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function mechanic(): BelongsTo
    {
        return $this->belongsTo(User::class, 'mechanic_id');
    }

    /**
     * @return BelongsTo<Appointment, $this>
     */
    public function appointment(): BelongsTo
    {
        return $this->belongsTo(Appointment::class);
    }
}
