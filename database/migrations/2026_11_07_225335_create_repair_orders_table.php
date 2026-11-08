<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('repair_orders', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('appointment_id')->constrained()->onDelete('cascade');
            $table->foreignId('mechanic_id')->constrained('users')->cascadeOnDelete();
            $table->string('status')->default('in_progress');
            $table->string('diagnosis')->nullable();
            $table->text('repair_notes')->nullable();
            $table->date('start_date')->nullable();
            $table->date('completion_date')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repair_orders');
    }
};
