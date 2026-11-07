<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RepairPart extends Model
{
    /** @use HasFactory<\Database\Factories\RepairPartFactory> */
    use HasFactory;
    /**
     * 
     * @return BelongsTo<Part, $this>
     */ 
    public function getPart(): BelongsTo
    {
        return $this->belongsTo(Part::class);
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
