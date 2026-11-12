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
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'role' => 'admin',
        ]);
        User::factory()->create([
            'name' => 'Mechanic User',
            'email' => 'mechanic@example.com',
            'role' => 'mechanic',
        ]);
        User::factory()->create([
            'name' => 'Customer User',
            'email' => 'client@example.com',
            'role' => 'client',
        ]);
        User::factory()->create([
            'name' => 'Daniel',
            'email' => 'daniel@example.com',
            'role' => 'admin',
        ]);

        ServiceCategory::factory(5)->create();
        Part::factory(10)->create();

        $clientUser = User::where('role', 'client')->first();
        $mechanicUser = User::where('role', 'mechanic')->first();

        Vehicle::factory(5)->create([
            'user_id' => $clientUser->id,
        ]);

        Service::factory(10)->create(
            [
                'category_id' => ServiceCategory::inRandomOrder()->first()->id,
            ]
        );

        $appointments = Appointment::factory(5)->create([
            'vehicle_id' => Vehicle::inRandomOrder()->first()->id,
            'user_id' => $clientUser->id,
        ]);

        $services = Service::pluck('id');

        foreach ($appointments as $appointment) {
            $appointment->services()->attach(
                $services->random(random_int(1, 3))
            );
        }

        RepairOrder::factory(5)->create([
            'appointment_id' => Appointment::inRandomOrder()->first()->id,
            'mechanic_id' => $mechanicUser->id,
        ]);

        Payment::factory(5)->create([
            'repair_order_id' => RepairOrder::inRandomOrder()->first()->id,
        ]);

        RepairService::factory(5)->create([
            'repair_order_id' => RepairOrder::inRandomOrder()->first()->id,
            'service_id' => Service::inRandomOrder()->first()->id,
        ]);

        RepairPart::factory(15)->create([
            'repair_order_id' => RepairOrder::inRandomOrder()->first()->id,
            'part_id' => Part::inRandomOrder()->first()->id,
        ]);
    }
}
