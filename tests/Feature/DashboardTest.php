<?php

use App\Models\Appointment;
use App\Models\RepairOrder;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('guests are redirected to the login page', function () {
    $this->get(route('dashboard'))
        ->assertRedirect(route('login'));
});

test('admins can visit the admin dashboard with statistics', function () {
    $admin = User::factory()->admin()->create();
    $vehicle = Vehicle::factory()->create(['user_id' => $admin->id]);
    Appointment::factory()->create([
        'user_id' => $admin->id,
        'vehicle_id' => $vehicle->id,
    ]);

    $this->actingAs($admin)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/dashboard')
            ->where('totalUsers', 1)
            ->where('totalVehicles', 1)
            ->where('totalAppointments', 1)
            ->where('totalRepairOrders', 0)
        );
});

test('mechanics receive only their assigned repair orders', function () {
    $mechanic = User::factory()->mechanic()->create();
    $client = User::factory()->client()->create();
    $vehicle = Vehicle::factory()->create(['user_id' => $client->id]);
    $appointment = Appointment::factory()->create([
        'user_id' => $client->id,
        'vehicle_id' => $vehicle->id,
    ]);
    $assignedRepair = RepairOrder::factory()->create([
        'appointment_id' => $appointment->id,
        'mechanic_id' => $mechanic->id,
    ]);

    $otherMechanic = User::factory()->mechanic()->create();
    RepairOrder::factory()->create([
        'appointment_id' => $appointment->id,
        'mechanic_id' => $otherMechanic->id,
    ]);

    $this->actingAs($mechanic)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('mechanic/dashboard')
            ->where('repairs', fn ($repairs) => $repairs->count() === 1
                && $repairs->first()['id'] === $assignedRepair->id)
        );
});

test('clients receive only their vehicles and appointments', function () {
    $client = User::factory()->client()->create([
        'name' => 'Client User',
    ]);
    $vehicle = Vehicle::factory()->create(['user_id' => $client->id]);
    $appointment = Appointment::factory()->create([
        'user_id' => $client->id,
        'vehicle_id' => $vehicle->id,
    ]);

    $otherClient = User::factory()->client()->create();
    Vehicle::factory()->create(['user_id' => $otherClient->id]);

    $this->actingAs($client)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('client/dashboard')
            ->where('userName', 'Client User')
            ->where('vehicles', fn ($vehicles) => $vehicles->count() === 1
                && $vehicles->first()['id'] === $vehicle->id)
            ->where('appointments', fn ($appointments) => $appointments->count() === 1
                && $appointments->first()['id'] === $appointment->id)
        );
});
