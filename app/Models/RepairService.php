<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RepairService extends Model
{
    /** @use HasFactory<\Database\Factories\RepairServiceFactory> */
    use HasFactory;
    /**
     * 
     * @return BelongsTo<Service, $this>
     */
    public function getService(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
    /**
     * 
     * @return BelongsTo<RepairOrder, $this>
     */
    public function getRepairOrder(): BelongsTo
    {
        return $this->belongsTo(RepairOrder::class);
    }
}
