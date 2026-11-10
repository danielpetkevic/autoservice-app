<?php

namespace Database\Factories;

use App\Models\Appointment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Appointment>
 */
class AppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'vehicle_id' => 1,
            'user_id' => 1,
            'appointment_at' => $this->faker->dateTimeBetween('+1 day', '+1 month'),
            'status' => $this->faker->randomElement(['pending', 'confirmed', 'completed', 'cancelled']),
            'notes' => $this->faker->optional()->randomElement([
                'Customer reports a warning light on the dashboard.',
                'Please inspect the brakes and suspension.',
                'Vehicle needs a full seasonal inspection.',
                'Customer will wait at the service center.',
            ]),
        ];
    }
}
