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
        Schema::create('esemeny', function (Blueprint $table) {
            $table->id();
            $table->datetime('idopont');
            $table->string('jegy_alapar',50);
            $table->unsignedBigInteger('eloado_id');
            $table->string('helyszin_id',5);
            $table->foreign('eloado_id')->references('id')->on('eloado');
            $table->foreign('helyszin_id')->references('id')->on('helyszin');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('esemeny');
    }
};
