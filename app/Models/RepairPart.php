<?php

namespace App\Models;

use Database\Factories\RepairPartFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RepairPart extends Model
{
    /** @use HasFactory<RepairPartFactory> */
    use HasFactory;

    /**
     * @return BelongsTo<Part, $this>
     */
    public function part(): BelongsTo
    {
        return $this->belongsTo(Part::class);
    }

    /**
     * @return BelongsTo<RepairOrder, $this>
     */
    public function repairOrder(): BelongsTo
    {
        return $this->belongsTo(RepairOrder::class);
    }
}
