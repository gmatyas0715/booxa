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
        Schema::create('jegy_adat', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('esemeny_id');
            $table->string('helyszin_id',10);
            $table->string('szektor',20);
            $table->string('sorjelzes',20)->nullable();
            $table->integer('ulohely')->nullable();
            $table->foreign('esemeny_id')->references('id')->on('esemeny');
            $table->foreign('helyszin_id')->references('id')->on('helyszin');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jegy_adat');
    }
};
