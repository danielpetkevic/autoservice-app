<?php

use App\Models\Appointment;
use App\Models\User;
use App\Models\Vehicle;
use Database\Seeders\RolePermissionSeeder;

beforeEach(function () {
    $this->seed(RolePermissionSeeder::class);
});

test('admins can view all appointments', function () {
    $admin = User::factory()->admin()->create();
    $client = User::factory()->client()->create();
    $vehicle = Vehicle::factory()->create(['user_id' => $client->id]);
    $appointment = Appointment::factory()->create([
        'user_id' => $client->id,
        'vehicle_id' => $vehicle->id,
    ]);

    $this->actingAs($admin)
        ->get(route('appointments.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('appointments/index')
            ->where('appointments.data', fn ($appointments) => collect($appointments)->contains('id', $appointment->id)
            )
        );
});

test('clients only see appointments for their own vehicles', function () {
    $client = User::factory()->client()->create();
    $otherClient = User::factory()->client()->create();
    $ownVehicle = Vehicle::factory()->create(['user_id' => $client->id]);
    $otherVehicle = Vehicle::factory()->create(['user_id' => $otherClient->id]);
    $ownAppointment = Appointment::factory()->create([
        'user_id' => $client->id,
        'vehicle_id' => $ownVehicle->id,
    ]);
    Appointment::factory()->create([
        'user_id' => $otherClient->id,
        'vehicle_id' => $otherVehicle->id,
    ]);

    $this->actingAs($client)
        ->get(route('appointments.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('appointments/index')
            ->where('appointments.data', fn ($appointments) => collect($appointments)->count() === 1
                && collect($appointments)->first()['id'] === $ownAppointment->id
            )
        );
});

test('admins receive the status management flag on appointment edit', function () {
    $admin = User::factory()->admin()->create();
    $client = User::factory()->client()->create();
    $vehicle = Vehicle::factory()->create(['user_id' => $client->id]);
    $appointment = Appointment::factory()->create([
        'user_id' => $client->id,
        'vehicle_id' => $vehicle->id,
    ]);

    $this->actingAs($admin)
        ->get(route('appointments.edit', $appointment))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('appointments/edit')
            ->where('canManage', true)
        );
});
