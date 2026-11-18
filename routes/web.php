<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ServiceCategoryController;
use App\Http\Controllers\VehicleController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::resource('vehicles', VehicleController::class);
    Route::resource('service_categories', ServiceCategoryController::class)->except(['show']);
});

require __DIR__.'/settings.php';
