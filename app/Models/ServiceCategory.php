<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ServiceCategory extends Model
{
    /** @use HasFactory<\Database\Factories\ServiceCategoryFactory> */
    use HasFactory;

    /**
     *  get the services associated with the service category.
     * @return HasMany<Service, $this>
     */

    public function getServices(): HasMany
    {
        return $this->hasMany(Service::class);
    }
}
