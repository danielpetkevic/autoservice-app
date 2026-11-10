<?php

namespace App\Models;

use Database\Factories\PartFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Part extends Model
{
    /** @use HasFactory<PartFactory> */
    use HasFactory;

    /**
     * @return HasMany<RepairPart, $this>
     */
    public function repairParts(): HasMany
    {
        return $this->HasMany(RepairPart::class);
    }
}
