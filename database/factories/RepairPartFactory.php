<?php

namespace Database\Factories;

use App\Models\RepairPart;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<RepairPart>
 */
class RepairPartFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'repair_order_id' => 1,
            'part_id' => 1,
            'quantity' => $this->faker->numberBetween(1, 4),
            'unit_price' => $this->faker->randomFloat(2, 8, 450),
        ];
    }
}
