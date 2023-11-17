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
        Schema::create('jegy_adat_kedvezmeny', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('kedvezmeny_id');
            $table->unsignedBigInteger('jegy_adat_id');
            $table->foreign('kedvezmeny_id')->references('id')->on('kedvezmeny');
            $table->foreign('jegy_adat_id')->references('id')->on('jegy_adat');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jegy_adat_kedvezmeny');
    }
};
