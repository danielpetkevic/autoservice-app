<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Models\Service;
use App\Models\ServiceCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Response;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        Gate::authorize('viewActive', Service::class);
        Gate::authorize('viewInactive', Service::class);

        $services = Service::query()
            ->with('serviceCategory')
            ->orderBy('name')
            ->paginate(12)
            ->through(fn (Service $service) => [
                ...$service->toArray(),
                'can' => [
                    'update' => Gate::allows('update', $service),
                    'delete' => Gate::allows('delete', $service),
                ],
            ]);

        return inertia('services/index', [
            'services' => $services,
            'categories' => ServiceCategory::query()
                ->orderBy('name')
                ->get(['id', 'name']),

            'header' => 'Services',
            'paragraph' => 'Browse and manage AutoService services.',
            'can' => [
                'create' => Gate::allows('create', Service::class),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('create', Service::class);

        return inertia('services/create', [
            'categories' => ServiceCategory::query()
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceRequest $request): RedirectResponse
    {
        Gate::authorize('create', Service::class);

        Service::create($request->validated());

        return redirect()
            ->route('services.index')
            ->with('success', 'Service created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service): Response
    {
        Gate::authorize('update', $service);

        return inertia('services/edit', [
            'service' => $service,
            'categories' => ServiceCategory::query()
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceRequest $request, Service $service): RedirectResponse
    {
        Gate::authorize('update', $service);

        $service->update($request->validated());

        return redirect()
            ->route('services.index')
            ->with('success', 'Service updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service): RedirectResponse
    {
        Gate::authorize('delete', $service);

        if (
            $service->appointments()->exists() ||
            $service->repairServices()->exists()
        ) {
            return back()->with(
                'error',
                'This service is used in existing appointments or repair orders. Deactivate it instead.'
            );
        }

        $service->delete();

        return redirect()
            ->route('services.index')
            ->with('success', 'Service deleted successfully.');
    }

    /**
     * Toggle the active status of a service.
     */
    public function toggleActive(
        Request $request,
        Service $service
    ): RedirectResponse {
        Gate::authorize('update', $service);

        $validated = $request->validate([
            'is_active' => ['required', 'boolean'],
        ]);

        $service->update([
            'is_active' => $validated['is_active'],
        ]);

        return back()->with(
            'success',
            'Service status updated successfully.'
        );
    }
}
