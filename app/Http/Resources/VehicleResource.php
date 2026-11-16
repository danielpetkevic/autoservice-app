<?php

namespace App\Http\Resources;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        /** @var Vehicle $vehicle */
        $vehicle = $this->resource;

        return [
            'id' => $vehicle->id,
            'brand' => $vehicle->brand,
            'model' => $vehicle->model,
            'year' => $vehicle->year,
            'license_plate' => $vehicle->license_plate,
            'vin' => $vehicle->vin,
            'mileage' => $vehicle->mileage,
            'owner' => $this->whenLoaded(
                'user',
                fn () => $vehicle->user ? [
                    'id' => $vehicle->user->id,
                    'name' => $vehicle->user->name,
                ] : null
            ),
            'can' => [
                'view' => $request->user()->can('view', $this->resource),
                'update' => $request->user()->can('update', $this->resource),
                'delete' => $request->user()->can('delete', $this->resource),
            ],
        ];
    }
}
