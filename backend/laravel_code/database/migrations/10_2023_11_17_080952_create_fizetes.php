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
        Schema::create('fizetes', function (Blueprint $table) {
            $table->id();
            $table->timestamp('fizetes_idopont');
            $table->integer('fizetes_osszeg');
            $table->string('fizetes_tipusa',50);
            $table->foreignId('szamlazasi_cim_id');
            $table->foreign('szamlazasi_cim_id')
                ->references('id')
                ->on('cim');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fizetes');
    }
};
