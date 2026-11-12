<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\RepairOrder;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        if ($user->isAdmin()) {
            return inertia('admin/dashboard', [
                'totalUsers' => User::count(),
                'totalVehicles' => Vehicle::count(),
                'totalAppointments' => Appointment::count(),
                'totalRepairOrders' => RepairOrder::count(),
            ]);
        }

        if ($user->isMechanic()) {
            return inertia('mechanic/dashboard', [
                'repairs' => RepairOrder::query()
                    ->where('mechanic_id', $user->id)
                    ->with('appointment.vehicle')
                    ->latest()
                    ->get(),
            ]);
        }

        if ($user->isClient()) {
            return inertia('client/dashboard', [
                'vehicles' => $user->vehicles()->get(),
                'appointments' => $user->appointments()
                    ->with('vehicle', 'services')
                    ->latest()
                    ->get(),
                'userName' => $user->name,
            ]);
        }

        abort(403);
    }
}
