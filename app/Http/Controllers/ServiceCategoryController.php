<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreServiceCategoryRequest;
use App\Http\Requests\UpdateServiceCategoryRequest;
use App\Models\ServiceCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Response;

class ServiceCategoryController extends Controller
{
    public function index(): Response
    {
        Gate::authorize('viewAny', ServiceCategory::class);

        return inertia('service_categories/index', [
            'categories' => ServiceCategory::query()
                ->orderBy('name')
                ->paginate(12)
                ->through(fn (ServiceCategory $category) => [
                    ...$category->toArray(),
                    'can' => [
                        'update' => Gate::allows('update', $category),
                        'delete' => Gate::allows('delete', $category),
                    ],
                ]),
            'header' => 'listings.categories',
            'paragraph' => 'listings.categories_description',
            'can' => [
                'create' => Gate::allows('create', ServiceCategory::class),
            ],
        ]);
    }

    public function create(): Response
    {
        Gate::authorize('create', ServiceCategory::class);

        return inertia('service_categories/create');
    }

    public function store(StoreServiceCategoryRequest $request): RedirectResponse
    {
        Gate::authorize('create', ServiceCategory::class);

        ServiceCategory::create($request->validated());

        return redirect()->route('service_categories.index')->with('success', 'flash.category_created');
    }

    public function edit(ServiceCategory $serviceCategory): Response
    {
        Gate::authorize('update', $serviceCategory);

        return inertia('service_categories/edit', [
            'category' => $serviceCategory,
        ]);
    }

    public function update(
        UpdateServiceCategoryRequest $request,
        ServiceCategory $serviceCategory
    ): RedirectResponse {
        Gate::authorize('update', $serviceCategory);

        $serviceCategory->update($request->validated());

        return redirect()->route('service_categories.index')->with('success', 'flash.category_updated');
    }

    public function destroy(ServiceCategory $serviceCategory): RedirectResponse
    {
        Gate::authorize('delete', $serviceCategory);

        $serviceCategory->delete();

        return redirect()->route('service_categories.index')->with('success', 'flash.category_deleted');
    }
}
