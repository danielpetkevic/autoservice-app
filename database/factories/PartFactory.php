<?php

namespace Database\Factories;

use App\Models\Part;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Part>
 */
class PartFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $parts = [
            'oil-filter' => [
                'name' => 'Oil filter',
                'description' => 'Filters contaminants from engine oil to protect internal engine components.',
                'price' => [8, 25],
            ],
            'air-filter' => [
                'name' => 'Engine air filter',
                'description' => 'Removes dust and debris from the air entering the engine.',
                'price' => [12, 35],
            ],
            'cabin-filter' => [
                'name' => 'Cabin air filter',
                'description' => 'Cleans the air entering the passenger compartment through the ventilation system.',
                'price' => [15, 45],
            ],
            'brake-pads' => [
                'name' => 'Front brake pads',
                'description' => 'Friction components that provide safe and consistent braking performance.',
                'price' => [35, 120],
            ],
            'brake-disc' => [
                'name' => 'Front brake disc',
                'description' => 'Vented brake rotor designed to dissipate heat during braking.',
                'price' => [45, 180],
            ],
            'spark-plugs' => [
                'name' => 'Spark plugs',
                'description' => 'Ignition components that create the spark needed for petrol engine combustion.',
                'price' => [20, 90],
            ],
            'battery' => [
                'name' => '12V car battery',
                'description' => 'Automotive battery that supplies electrical power for starting and vehicle systems.',
                'price' => [90, 220],
            ],
            'wiper-blades' => [
                'name' => 'Front wiper blades',
                'description' => 'Replacement blades that clear rain and dirt from the windscreen.',
                'price' => [18, 60],
            ],
            'timing-belt-kit' => [
                'name' => 'Timing belt kit',
                'description' => 'Engine timing kit containing the belt and tension components needed for replacement.',
                'price' => [150, 450],
            ],
        ];

        $partCode = $this->faker->randomElement(array_keys($parts));
        $part = $parts[$partCode];

        return [
            'name' => $part['name'],
            'sku' => $this->faker->unique()->bothify(strtoupper($partCode).'-#####'),
            'description' => $part['description'],
            'price' => $this->faker->randomFloat(2, $part['price'][0], $part['price'][1]),
            'stock_quantity' => $this->faker->numberBetween(0, 40),
        ];
    }
}
