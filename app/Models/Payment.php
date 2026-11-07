<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    /** @use HasFactory<\Database\Factories\PaymentFactory> */
    use HasFactory;
    /**
     * 
     * @return BelongsTo<RepairOrder, $this>
     */
    public function getRepairOrder(): BelongsTo
    {
        return $this->belongsTo(RepairOrder::class);
    }
}
