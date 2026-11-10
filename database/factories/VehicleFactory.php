<?php

namespace Database\Factories;

use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Vehicle>
 */
class VehicleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $vehicles = [
            'Toyota' => ['Corolla', 'Yaris', 'RAV4'],
            'Volkswagen' => ['Golf', 'Passat', 'Tiguan'],
            'Ford' => ['Focus', 'Fiesta', 'Kuga'],
            'BMW' => ['3 Series', '5 Series', 'X3'],
            'Audi' => ['A3', 'A4', 'Q5'],
            'Volvo' => ['V40', 'V60', 'XC60'],
            'Honda' => ['Civic', 'Accord', 'CR-V'],
            'Skoda' => ['Fabia', 'Octavia', 'Kodiaq'],
            'Mercedes-Benz' => ['A-Class', 'C-Class', 'E-Class'],
        ];

        $brand = $this->faker->randomElement(array_keys($vehicles));

        return [
            'brand' => $brand,
            'model' => $this->faker->randomElement($vehicles[$brand]),
            'year' => $this->faker->numberBetween(2005, 2025),
            'vin' => $this->faker->unique()->regexify('[A-HJ-NPR-Z0-9]{17}'),
            'license_plate' => $this->faker->unique()->bothify('???###'),
            'mileage' => $this->faker->numberBetween(10000, 250000),
            'user_id' => 1,
        ];
    }
}
