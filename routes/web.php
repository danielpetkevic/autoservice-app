<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\VehicleController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::resource('vehicles', VehicleController::class)
        ->middleware('role:admin,client,mechanic');
});

require __DIR__.'/settings.php';
