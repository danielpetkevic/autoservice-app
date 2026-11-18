<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PartController;
use App\Http\Controllers\ServiceCategoryController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\VehicleController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::resource('vehicles', VehicleController::class);
    Route::resource('service_categories', ServiceCategoryController::class)->except(['show']);
    Route::resource('services', ServiceController::class)->except(['show']);
    Route::patch(
        '/services/{service}/toggle-active',
        [ServiceController::class, 'toggleActive']
    )->name('services.toggle-active');
    Route::resource('parts', PartController::class)->except(['show']);
    Route::patch('/parts/{part}/stock', [PartController::class, 'updateStock'])
        ->name('parts.update-stock');
});

require __DIR__.'/settings.php';
