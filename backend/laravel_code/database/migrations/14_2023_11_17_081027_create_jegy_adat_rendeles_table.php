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
        Schema::create('jegy_adat_rendeles', function (Blueprint $table) {
            $table->id();
            $table->integer('jegy_darab');
            $table->unsignedBigInteger('rendeles_id');
            $table->unsignedBigInteger('jegy_adat_id');
            $table->foreign('rendeles_id')->references('id')->on('rendeles');
            $table->foreign('jegy_adat_id')->references('id')->on('jegy_adat');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jegy_adat_rendeles');
    }
};
