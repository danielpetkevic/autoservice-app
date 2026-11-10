<?php

use App\Models\Appointment;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('database seeder creates valid AutoService data', function () {
    $this->seed();

    expect(User::count())->toBeGreaterThan(0);
    expect(Vehicle::count())->toBeGreaterThan(0);

    expect(
        Vehicle::whereDoesntHave('user')->count()
    )->toBe(0);

    expect(
        Appointment::whereDoesntHave('vehicle')->count()
    )->toBe(0);
});
