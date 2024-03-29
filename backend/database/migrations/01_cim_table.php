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
        Schema::create('cim', function (Blueprint $table) {
            $table->id();
            $table->string('iranyitoszam',50)->nullable();
            $table->string('telepules',100);
            $table->string('kozterulet',50);
            $table->string('hazszam',10);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cim');
    }
};