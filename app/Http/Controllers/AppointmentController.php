<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAppointmentRequest;
use App\Http\Requests\UpdateAppointmentRequest;
use App\Models\Appointment;
use App\Models\Service;
use App\Models\Vehicle;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Inertia\Response;

class AppointmentController extends Controller
{
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Appointment::class);

        $user = $request->user();
        $appointmentsQuery = Appointment::query()
            ->with(['vehicle', 'services', 'repairOrder']);

        if ($user->hasRole('admin')) {
            $header = 'listings.appointments';
            $paragraph = 'listings.appointments_description';
        } elseif ($user->hasRole('client')) {
            $appointmentsQuery->whereHas(
                'vehicle',
                fn ($query) => $query->where('user_id', $user->id)
            );
            $header = 'listings.my_appointments';
            $paragraph = 'listings.my_appointments_description';
        } else {
            abort(403);
        }

        $appointments = $appointmentsQuery
            ->orderBy('appointment_at', 'desc')
            ->paginate(12)
            ->through(fn (Appointment $appointment) => [
                ...$appointment->toArray(),
                'can' => [
                    'update' => Gate::allows('update', $appointment),
                    'delete' => Gate::allows('delete', $appointment),
                    'manage' => Gate::allows('manageStatus', $appointment),
                    'cancel' => Gate::allows('cancel', $appointment),
                ],
            ]);

        return inertia('appointments/index', [
            'appointments' => $appointments,
            'header' => $header,
            'paragraph' => $paragraph,
            'can' => [
                'create' => Gate::allows('create', Appointment::class),
            ],
        ]);
    }

    public function create(): Response
    {
        Gate::authorize('create', Appointment::class);

        $user = request()->user();

        $vehicles = Vehicle::query()
            ->when(
                ! $user->hasRole('admin'),
                fn ($query) => $query->where('user_id', $user->id)
            )
            ->orderBy('brand')
            ->get(['id', 'brand', 'model', 'license_plate']);

        return inertia('appointments/create', [
            'vehicles' => $vehicles,
            'services' => Service::query()
                ->where('is_active', true)
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    public function store(StoreAppointmentRequest $request): RedirectResponse
    {
        Gate::authorize('create', Appointment::class);

        $validated = $request->validated();

        DB::transaction(function () use ($validated): void {
            $vehicle = Vehicle::query()
                ->whereKey($validated['vehicle_id'])
                ->firstOrFail();

            $appointment = $vehicle->appointments()->create([
                ...Arr::except($validated, ['services']),
                'user_id' => $vehicle->user_id,
            ]);

            $appointment->services()->sync(
                $validated['services'] ?? []
            );
        });

        return redirect()
            ->route('appointments.index')
            ->with('success', 'flash.appointment_created');
    }

    public function edit(Appointment $appointment): Response
    {
        Gate::authorize('update', $appointment);

        $user = request()->user();

        $vehicles = Vehicle::query()
            ->when(
                ! $user->hasRole('admin'),
                fn ($query) => $query->where('user_id', $user->id)
            )
            ->orderBy('brand')
            ->get(['id', 'brand', 'model', 'license_plate']);

        $services = Service::query()
            ->where(function ($query) use ($appointment) {
                $query->where('is_active', true)
                    ->orWhereHas(
                        'appointments',
                        fn ($query) => $query->whereKey($appointment->id)
                    );
            })
            ->orderBy('name')
            ->get(['id', 'name']);

        return inertia('appointments/edit', [
            'appointment' => $appointment->load(['vehicle', 'services']),
            'vehicles' => $vehicles,
            'services' => $services,
            'canManage' => Gate::allows('manageStatus', $appointment),
        ]);
    }

    public function update(
        UpdateAppointmentRequest $request,
        Appointment $appointment
    ): RedirectResponse {
        Gate::authorize('update', $appointment);

        $validated = $request->validated();

        DB::transaction(function () use ($appointment, $validated): void {
            $vehicle = Vehicle::query()
                ->whereKey($validated['vehicle_id'])
                ->firstOrFail();

            $appointment->update([
                ...Arr::except($validated, ['services']),
                'user_id' => $vehicle->user_id,
            ]);

            $appointment->services()->sync(
                $validated['services'] ?? []
            );
        });

        return redirect()
            ->route('appointments.index')
            ->with('success', 'flash.appointment_updated');
    }

    public function updateStatus(
        Request $request,
        Appointment $appointment
    ): RedirectResponse {
        Gate::authorize('manageStatus', $appointment);

        $validated = $request->validate([
            'status' => [
                'required',
                Rule::in(['completed', 'cancelled']),
            ],
        ]);

        if ($appointment->status !== 'scheduled') {
            return back()->with(
                'error',
                'flash.appointment_invalid_status'
            );
        }

        $appointment->update([
            'status' => $validated['status'],
        ]);

        return back()->with(
            'success',
            'flash.appointment_status_updated'
        );
    }

    public function cancelStatus(
        Request $request,
        Appointment $appointment
    ): RedirectResponse {
        Gate::authorize('cancel', $appointment);

        $request->validate([
            'status' => [
                'required',
                Rule::in(['cancelled']),
            ],
        ]);

        if ($appointment->status !== 'scheduled') {
            return back()->with(
                'error',
                'flash.appointment_invalid_status'
            );
        }

        $appointment->update([
            'status' => 'cancelled',
        ]);

        return back()->with(
            'success',
            'flash.appointment_status_updated'
        );
    }

    public function destroy(Appointment $appointment): RedirectResponse
    {
        Gate::authorize('delete', $appointment);

        if ($appointment->repairOrder()->exists()) {
            return back()->with(
                'error',
                'flash.appointment_has_repair_order'
            );
        }

        $appointment->delete();

        return redirect()
            ->route('appointments.index')
            ->with('success', 'flash.appointment_deleted');
    }
}
