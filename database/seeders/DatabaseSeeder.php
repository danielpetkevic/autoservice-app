<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\Part;
use App\Models\Payment;
use App\Models\RepairOrder;
use App\Models\RepairPart;
use App\Models\RepairService;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolePermissionSeeder::class);

        $this->seedUser('Admin User', 'admin@example.com', 'admin');
        $mechanic = $this->seedUser('Mechanic User', 'mechanic@example.com', 'mechanic');
        $client = $this->seedUser('Customer User', 'client@example.com', 'client');
        $this->seedUser('Daniel', 'daniel@example.com', 'admin');
        $this->seedUser('Client 2', 'client2@example.com', 'client');

        $categories = ServiceCategory::factory(5)->create();
        $parts = Part::factory(10)->create();

        $vehicles = Vehicle::factory(5)->create([
            'user_id' => $client->id,
        ]);

        $services = Service::factory(10)->create([
            'category_id' => fn () => $categories->random()->id,
        ]);

        $appointments = Appointment::factory(5)->create([
            'vehicle_id' => fn () => $vehicles->random()->id,
            'user_id' => $client->id,
        ]);

        foreach ($appointments as $appointment) {
            $appointment->services()->attach(
                $services->random(random_int(1, 3))->pluck('id')->all()
            );
        }

        foreach ($appointments as $appointment) {
            $repairOrder = RepairOrder::factory()->create([
                'appointment_id' => $appointment->id,
                'mechanic_id' => $mechanic->id,
            ]);

            Payment::factory()->create([
                'repair_order_id' => $repairOrder->id,
            ]);

            RepairService::factory()->create([
                'repair_order_id' => $repairOrder->id,
                'service_id' => $services->random()->id,
            ]);

            RepairPart::factory(3)->create([
                'repair_order_id' => $repairOrder->id,
                'part_id' => fn () => $parts->random()->id,
            ]);
        }
    }

    private function seedUser(string $name, string $email, string $role): User
    {
        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'email' => $email,
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
            ],
        );

        if (! $user->number) {
            $user->forceFill([
                'number' => fake()->unique()->numerify('+370########'),
            ])->save();
        }

        $user->assignRole($role);

        return $user;
    }
}
