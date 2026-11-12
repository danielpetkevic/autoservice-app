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

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolePermissionSeeder::class);

        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);
        $admin->assignRole('admin');

        $mechanic = User::factory()->create([
            'name' => 'Mechanic User',
            'email' => 'mechanic@example.com',
        ]);
        $mechanic->assignRole('mechanic');

        $client = User::factory()->create([
            'name' => 'Customer User',
            'email' => 'client@example.com',
        ]);
        $client->assignRole('client');

        $daniel = User::factory()->create([
            'name' => 'Daniel',
            'email' => 'daniel@example.com',
        ]);
        $daniel->assignRole('admin');

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
}
