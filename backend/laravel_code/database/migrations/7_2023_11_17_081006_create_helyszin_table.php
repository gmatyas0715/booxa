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
        Schema::create('helyszin', function (Blueprint $table) {
            $table->string('id',5)->primary();
            $table->string('nev',50);
            $table->unsignedBigInteger('cim_id');
            $table->integer('kapacitas');
            $table->string('kontakt_informacio',50);
            $table->boolean('szabadteri')->default(0);
            $table->string('helyszin_kep_eleres',100);
            $table->foreign('cim_id')->references('id')->on('cim');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('helyszin');
    }
};
