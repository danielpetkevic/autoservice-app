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

        if ($user->hasRole('admin')) {
            // Admin sees all appointments.
        } elseif ($user->hasRole('client')) {
            $appointments->whereHas('vehicle', fn ($query) => $query->where('user_id', $user->id));
        } elseif ($user->hasRole('mechanic')) {
            $appointments->whereHas(
                'repairOrder',
                fn ($query) => $query->where('mechanic_id', $user->id)
            );
        } else {
            abort(403);
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
