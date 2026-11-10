<?php

namespace App\Models;

use Database\Factories\RepairServiceFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RepairService extends Model
{
    /** @use HasFactory<RepairServiceFactory> */
    use HasFactory;

    /**
     * @return BelongsTo<Service, $this>
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    /**
     * @return BelongsTo<RepairOrder, $this>
     */
    public function repairOrder(): BelongsTo
    {
        return $this->belongsTo(RepairOrder::class);
    }
}
