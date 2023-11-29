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
            $table->foreignId('kedvezmeny_id');
            $table->foreignId('jegy_adat_id');
            $table->foreign('kedvezmeny_id')
                ->references('id')
                ->on('kedvezmeny')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('jegy_adat_id')
                ->references('id')
                ->on('jegy_adat')
                ->onDelete('cascade')
                ->onUpdate('cascade');
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
