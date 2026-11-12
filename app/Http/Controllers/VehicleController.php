<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Response;

class VehicleController extends Controller
{
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Vehicle::class);

        $user = $request->user();
        $vehicles = Vehicle::query()->with('user');

        if ($user->isClient()) {
            $vehicles->where('user_id', $user->id);
        } elseif ($user->isMechanic()) {
            $vehicles->whereHas('appointments.repairOrder', function ($query) use ($user): void {
                $query->where('mechanic_id', $user->id);
            });
        }

        return inertia('vehicles/index', [
            'vehicles' => $vehicles->latest()->get(),
        ]);
    }

    public function show(Vehicle $vehicle): Response
    {
        Gate::authorize('view', $vehicle);

        return inertia('vehicles/show', [
            'vehicle' => $vehicle->load('user'),
        ]);
    }

    public function create(): Response
    {
        Gate::authorize('create', Vehicle::class);

        return inertia('vehicles/create');
    }

    public function store(Request $request): RedirectResponse
    {
        Gate::authorize('create', Vehicle::class);

        $validated = $request->validate([
            'brand' => ['required', 'string', 'max:255'],
            'model' => ['required', 'string', 'max:255'],
            'year' => ['required', 'integer', 'between:1900,'.now()->year],
            'license_plate' => ['required', 'string', 'max:255'],
            'vin' => ['required', 'string', 'size:17', 'unique:vehicles,vin'],
            'mileage' => ['required', 'integer', 'min:0'],
        ]);

        $request->user()->vehicles()->create($validated);

        return redirect()->route('vehicles.index');
    }

    public function edit(Vehicle $vehicle): Response
    {
        Gate::authorize('update', $vehicle);

        return inertia('vehicles/edit', [
            'vehicle' => $vehicle,
        ]);
    }

    public function update(Request $request, Vehicle $vehicle): RedirectResponse
    {
        Gate::authorize('update', $vehicle);

        $validated = $request->validate([
            'brand' => ['required', 'string', 'max:255'],
            'model' => ['required', 'string', 'max:255'],
            'year' => ['required', 'integer', 'between:1900,'.now()->year],
            'license_plate' => ['required', 'string', 'max:255'],
            'vin' => ['required', 'string', 'size:17', 'unique:vehicles,vin,'.$vehicle->id],
            'mileage' => ['required', 'integer', 'min:0'],
        ]);

        $vehicle->update($validated);

        return redirect()->route('vehicles.show', $vehicle);
    }

    public function destroy(Vehicle $vehicle): RedirectResponse
    {
        Gate::authorize('delete', $vehicle);
        $vehicle->delete();

        return redirect()->route('vehicles.index');
    }
}
