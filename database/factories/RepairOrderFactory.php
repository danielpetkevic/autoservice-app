<?php

namespace Database\Factories;

use App\Models\RepairOrder;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<RepairOrder>
 */
class RepairOrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = $this->faker->randomElement(['pending', 'in_progress', 'completed', 'cancelled']);

        return [
            'appointment_id' => 1,
            'mechanic_id' => 1,
            'status' => $status,
            'diagnosis' => $this->faker->randomElement([
                'Front brake pads are worn below the recommended thickness.',
                'Engine oil is old and the oil filter is clogged.',
                'Battery voltage is below the recommended level.',
                'Front suspension makes noise over uneven roads.',
                'Check engine light caused by a faulty oxygen sensor.',
            ]),
            'repair_notes' => $this->faker->randomElement([
                'Replaced damaged components and completed a road test.',
                'Inspected the vehicle and recommended regular maintenance.',
                'Customer was informed about the required repair work.',
            ]),
            'start_date' => $this->faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d'),
            'completion_date' => 'status' === 'completed'
                ? $this->faker->dateTimeBetween('now', '+1 month')->format('Y-m-d')
                : null,
        ];
    }
}
