<?php

namespace Database\Factories;

use App\Models\ServiceCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ServiceCategory>
 */
class ServiceCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'Routine maintenance' => 'Scheduled maintenance that helps prevent breakdowns and extend vehicle service life.',
            'Engine and transmission' => 'Inspection and repair services for engine, transmission, and related drivetrain systems.',
            'Brakes and suspension' => 'Safety-focused services for braking, steering, and suspension components.',
            'Electrical systems' => 'Testing and repair of batteries, charging systems, sensors, and vehicle electronics.',
            'Tires and wheels' => 'Wheel, tire, balancing, and alignment services for safe and comfortable driving.',
            'Diagnostics and air conditioning' => 'Computer diagnostics and climate-control services for vehicle comfort and reliability.',
        ];

        $name = $this->faker->unique()->randomElement(array_keys($categories));

        return [
            'name' => $name,
            'description' => $categories[$name],
        ];
    }
}
