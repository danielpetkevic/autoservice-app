<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePartRequest;
use App\Http\Requests\UpdatePartRequest;
use App\Models\Part;
use Gate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Response;

class PartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        Gate::authorize('viewAny', Part::class);

        $parts = Part::query()
            ->orderBy('name')
            ->paginate(12)
            ->through(fn (Part $part) => [
                ...$part->toArray(),
                'can' => [
                    'update' => Gate::allows('update', $part),
                    'delete' => Gate::allows('delete', $part),
                ],
            ]);

        return inertia('parts/index', [
            'parts' => $parts,
            'header' => 'Parts',
            'paragraph' => 'Browse and manage AutoService parts.',
            'can' => [
                'create' => Gate::allows('create', Part::class),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('create', Part::class);

        return inertia('parts/create', [
            'header' => 'Add Part',
            'paragraph' => 'Add a new part to your inventory.',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePartRequest $request): RedirectResponse
    {
        Gate::authorize('create', Part::class);

        $validatedData = $request->validated();

        Part::create([
            ...$validatedData,
            'stock_quantity' => 1,
        ]);

        return redirect()
            ->route('parts.index')
            ->with('success', 'Part created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Part $part): Response
    {
        Gate::authorize('update', $part);

        return inertia('parts/edit', [
            'part' => $part,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePartRequest $request, Part $part): RedirectResponse
    {
        Gate::authorize('update', $part);

        $part->update($request->validated());

        return redirect()
            ->route('parts.index')
            ->with('success', 'Part updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Part $part): RedirectResponse
    {
        Gate::authorize('delete', $part);

        $part->delete();

        return redirect()
            ->route('parts.index')
            ->with('success', 'Part deleted successfully.');
    }

    /**
     * Update the stock quantity of the specified resource.
     */
    public function updateStock(
        Request $request,
        Part $part
    ): RedirectResponse {
        Gate::authorize('update', $part);

        $validated = $request->validate([
            'action' => [
                'required_without:stock_quantity',
                Rule::in(['increment', 'decrement']),
            ],
            'stock_quantity' => [
                'required_without:action',
                'integer',
                'min:0',
                'max:1000',
            ],
        ]);

        if (array_key_exists('stock_quantity', $validated)) {
            $part->update([
                'stock_quantity' => $validated['stock_quantity'],
            ]);
        } elseif ($validated['action'] === 'increment') {
            $part->increment('stock_quantity');
        } else {
            $updated = Part::query()
                ->whereKey($part->id)
                ->where('stock_quantity', '>', 0)
                ->decrement('stock_quantity');

            if ($updated === 0) {
                return back()->with(
                    'error',
                    'Stock quantity cannot be negative.'
                );
            }
        }

        return back()->with(
            'success',
            'Stock quantity updated successfully.'
        );
    }
}
