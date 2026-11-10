<?php

namespace Database\Factories;

use App\Models\Service;
use App\Models\ServiceCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $servicesByCategory = [
            'Routine maintenance' => [
                ['name' => 'Engine oil and filter change', 'description' => 'Drain the old engine oil and replace the oil filter.', 'price' => [45, 120], 'duration' => 45],
                ['name' => 'Seasonal vehicle inspection', 'description' => 'Inspect fluids, tires, lights, brakes, and safety equipment.', 'price' => [50, 130], 'duration' => 90],
            ],
            'Engine and transmission' => [
                ['name' => 'Timing belt inspection', 'description' => 'Inspect the timing belt system for wear and replacement needs.', 'price' => [45, 100], 'duration' => 60],
            ],
            'Brakes and suspension' => [
                ['name' => 'Brake system inspection', 'description' => 'Inspect brake pads, discs, fluid, hoses, and braking performance.', 'price' => [30, 75], 'duration' => 45],
                ['name' => 'Brake pad replacement', 'description' => 'Remove worn brake pads and install suitable new pads.', 'price' => [80, 220], 'duration' => 120],
                ['name' => 'Suspension inspection', 'description' => 'Check shock absorbers, springs, control arms, and suspension joints.', 'price' => [35, 95], 'duration' => 60],
            ],
            'Electrical systems' => [
                ['name' => 'Battery test and replacement', 'description' => 'Test the battery and charging system, replacing the battery if necessary.', 'price' => [25, 250], 'duration' => 60],
            ],
            'Tires and wheels' => [
                ['name' => 'Wheel alignment', 'description' => 'Adjust wheel angles to improve tire wear and handling.', 'price' => [45, 110], 'duration' => 90],
            ],
            'Diagnostics and air conditioning' => [
                ['name' => 'Computer diagnostics', 'description' => 'Scan vehicle control modules and identify stored fault codes.', 'price' => [35, 90], 'duration' => 60],
                ['name' => 'Air conditioning service', 'description' => 'Test climate control and check refrigerant and cooling performance.', 'price' => [60, 180], 'duration' => 90],
            ],
        ];

        $category = ServiceCategory::query()->inRandomOrder()->first();
        $categoryName = $category === null ? 'Routine maintenance' : $category->name;
        $services = $servicesByCategory[$categoryName];
        $service = $this->faker->randomElement($services);

        return [
            'category_id' => $category === null ? 1 : $category->id,
            'name' => $service['name'],
            'description' => $service['description'],
            'price' => $this->faker->randomFloat(2, $service['price'][0], $service['price'][1]),
            'duration' => $service['duration'],
            'is_active' => $this->faker->boolean(90),
        ];
    }
}
