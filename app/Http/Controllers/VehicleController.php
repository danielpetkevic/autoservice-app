<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use App\Http\Resources\VehicleResource;
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

        if ($user->hasRole('admin')) {
            $header = 'Vehicle Management';
            $paragraph = 'Manage user vehicles and their details.';
        } elseif ($user->hasRole('client')) {
            $vehicles->where('user_id', $user->id);

            $header = 'My Vehicles';
            $paragraph = 'View and manage your registered vehicles.';
        } elseif ($user->hasRole('mechanic')) {
            $vehicles->whereHas(
                'appointments.repairOrder',
                fn ($query) => $query->where('mechanic_id', $user->id)
            );

            $header = 'Assigned Vehicles';
            $paragraph = 'View vehicles associated with your assigned repairs.';
        } else {
            abort(403);
        }

        return inertia('vehicles/index', [
            'vehicles' => VehicleResource::collection(
                $vehicles->latest()->paginate(10)
            ),
            'header' => $header,
            'paragraph' => $paragraph,
            'role' => $user->getRoleNames()->first(),
            'can' => [
                'create' => Gate::allows('create', Vehicle::class),
            ],
        ]);
    }

    public function show(Vehicle $vehicle): Response
    {
        Gate::authorize('view', $vehicle);

        return inertia('vehicles/show', [
            'vehicle' => new VehicleResource($vehicle->load('user')),
        ]);
    }

    public function create(): Response
    {
        Gate::authorize('create', Vehicle::class);

        return inertia('vehicles/create');
    }

    public function store(StoreVehicleRequest $request): RedirectResponse
    {
        Gate::authorize('create', Vehicle::class);

        $request->user()
            ->vehicles()
            ->create($request->validated());

        return redirect()->route('vehicles.index')->with('success', 'Vehicle created successfully.');
    }

    public function edit(Vehicle $vehicle): Response
    {
        Gate::authorize('update', $vehicle);

        return inertia('vehicles/edit', [
            'vehicle' => $vehicle,
        ]);
    }

    public function update(
        UpdateVehicleRequest $request,
        Vehicle $vehicle
    ): RedirectResponse {
        Gate::authorize('update', $vehicle);

        $vehicle->update($request->validated());

        return redirect()->route('vehicles.show', $vehicle)->with('success', 'Vehicle updated successfully.');
    }

    public function destroy(Vehicle $vehicle): RedirectResponse
    {
        Gate::authorize('delete', $vehicle);

        $vehicle->delete();

        return redirect()->route('vehicles.index')->with('success', 'Vehicle deleted successfully.');
    }
}
