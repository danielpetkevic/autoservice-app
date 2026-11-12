<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Response;

class AppointmentController extends Controller
{
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Appointment::class);

        $user = $request->user();
        $appointments = Appointment::query()->with(['vehicle', 'repairOrder']);

        if ($user->isClient()) {
            $appointments->whereHas('vehicle', function ($query) use ($user): void {
                $query->where('user_id', $user->id);
            });
        } elseif ($user->isMechanic()) {
            $appointments->whereHas('repairOrder', function ($query) use ($user): void {
                $query->where('mechanic_id', $user->id);
            });
        }

        return inertia('appointments/index', [
            'appointments' => $appointments->latest()->get(),
        ]);
    }

    public function show(Appointment $appointment): Response
    {
        Gate::authorize('view', $appointment);

        return inertia('appointments/show', [
            'appointment' => $appointment->load(['vehicle', 'repairOrder']),
        ]);
    }

    public function create(): Response
    {
        Gate::authorize('create', Appointment::class);

        return inertia('appointments/create');
    }

    public function store(Request $request): RedirectResponse
    {
        Gate::authorize('create', Appointment::class);

        $validated = $request->validate([
            'vehicle_id' => ['required', 'exists:vehicles,id'],
            'scheduled_at' => ['required', 'date', 'after:now'],
            'status' => ['required', 'in:pending,confirmed,cancelled'],
        ]);

        $request->user()->appointments()->create($validated);

        return redirect()->route('appointments.index');
    }
}
