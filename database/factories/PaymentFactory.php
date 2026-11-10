<?php

namespace Database\Factories;

use App\Models\Payment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = $this->faker->randomElement(['pending', 'completed', 'failed']);

        return [
            'repair_order_id' => 1,
            'amount' => $this->faker->randomFloat(2, 50, 1500),
            'payment_method' => $status === 'completed'
                ? $this->faker->randomElement(['cash', 'card', 'bank_transfer'])
                : null,
            'paid_at' => $status === 'completed'
                ? $this->faker->dateTimeBetween('-1 month', 'now')
                : null,
            'status' => $status,
        ];
    }
}
