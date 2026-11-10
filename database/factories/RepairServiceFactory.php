<?php

namespace Database\Factories;

use App\Models\RepairService;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<RepairService>
 */
class RepairServiceFactory extends Factory
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
            'service_id' => 1,
            'quantity' => $this->faker->numberBetween(1, 3),
            'unit_price' => $this->faker->randomFloat(2, 25, 350),
            'notes' => $this->faker->optional()->randomElement([
                'Service completed according to manufacturer specifications.',
                'Additional inspection recommended during the next visit.',
                'Customer approved the work before repair started.',
            ]),
        ];
    }
}
