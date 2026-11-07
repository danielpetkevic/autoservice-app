<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Part extends Model
{
    /** @use HasFactory<\Database\Factories\PartFactory> */
    use HasFactory;
    /**
     * 
     * @return HasMany<RepairPart, $this>
     */
    public function getRepairParts(): HasMany
    {
        return $this->HasMany(RepairPart::class);
    }
}
