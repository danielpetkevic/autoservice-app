<?php

use App\Models\Appointment;
use App\Models\RepairOrder;
use App\Models\User;
use App\Models\Vehicle;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(RolePermissionSeeder::class);
});

test('admin can access the admin dashboard', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->get(route('dashboard'))
        ->assertOk();
});

test('clients access their client dashboard', function () {
    $client = User::factory()->client()->create();

    $this->actingAs($client)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('client/dashboard'));
});

test('a client can view their own vehicle', function () {
    $client = User::factory()->client()->create();
    $vehicle = Vehicle::factory()->create(['user_id' => $client->id]);

    $this->actingAs($client)
        ->get(route('vehicles.show', $vehicle))
        ->assertOk();
});

test('a client cannot view another clients vehicle', function () {
    $owner = User::factory()->client()->create();
    $otherClient = User::factory()->client()->create();
    $vehicle = Vehicle::factory()->create(['user_id' => $owner->id]);

    $this->actingAs($otherClient)
        ->get(route('vehicles.show', $vehicle))
        ->assertForbidden();
});

test('a mechanic can view a vehicle connected to an assigned repair', function () {
    $client = User::factory()->client()->create();
    $mechanic = User::factory()->mechanic()->create();
    $vehicle = Vehicle::factory()->create(['user_id' => $client->id]);
    $appointment = Appointment::factory()->create([
        'vehicle_id' => $vehicle->id,
        'user_id' => $client->id,
    ]);

    RepairOrder::factory()->create([
        'appointment_id' => $appointment->id,
        'mechanic_id' => $mechanic->id,
    ]);

    $this->actingAs($mechanic)
        ->get(route('vehicles.show', $vehicle))
        ->assertOk();
});

test('a mechanic cannot update a vehicle', function () {
    $mechanic = User::factory()->mechanic()->create();
    $vehicle = Vehicle::factory()->create();

    $this->actingAs($mechanic)
        ->put(route('vehicles.update', $vehicle), [
            'brand' => 'Toyota',
            'model' => 'Corolla',
            'year' => 2020,
            'license_plate' => 'ABC123',
            'vin' => '1HGCM82633A123456',
            'mileage' => 50000,
        ])
        ->assertForbidden();
});

test('an admin can create a service category', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->post(route('service_categories.store'), [
            'name' => 'Engine Repair',
            'description' => 'Engine diagnostics and repair',
        ])
        ->assertRedirect(route('service_categories.index'));

    $this->assertDatabaseHas('service_categories', [
        'name' => 'Engine Repair',
        'description' => 'Engine diagnostics and repair',
    ]);
});

test('a client cannot create a service category', function () {
    $client = User::factory()->client()->create();

    $this->actingAs($client)
        ->post(route('service_categories.store'), [
            'name' => 'Unauthorized Category',
            'description' => null,
        ])
        ->assertForbidden();

    $this->assertDatabaseMissing('service_categories', [
        'name' => 'Unauthorized Category',
    ]);
});

test('a client can delete their own vehicle', function () {
    $client = User::factory()->client()->create();
    $vehicle = Vehicle::factory()->create(['user_id' => $client->id]);

    $this->actingAs($client)
        ->delete(route('vehicles.destroy', $vehicle))
        ->assertRedirect(route('vehicles.index'));

    $this->assertModelMissing($vehicle);
});

test('a client cannot delete another clients vehicle', function () {
    $owner = User::factory()->client()->create();
    $otherClient = User::factory()->client()->create();
    $vehicle = Vehicle::factory()->create(['user_id' => $owner->id]);

    $this->actingAs($otherClient)
        ->delete(route('vehicles.destroy', $vehicle))
        ->assertForbidden();

    $this->assertModelExists($vehicle);
});

test('guests cannot access a vehicle', function () {
    $owner = User::factory()->client()->create();
    $vehicle = Vehicle::factory()->create(['user_id' => $owner->id]);

    $this->get(route('vehicles.show', $vehicle))
        ->assertRedirect(route('login'));
});
