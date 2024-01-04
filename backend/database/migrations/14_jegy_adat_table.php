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
            $table->foreignId('esemeny_id');
            $table->foreignId('helyszin_id');
            $table->foreignId('rendeles_id');
            $table->string('szektor_csoport_id',20);
            $table->string('szektor_id',20)->nullable();
            $table->integer('ulohely')->nullable();
            $table->foreign('esemeny_id')
                ->references('id')
                ->on('esemeny')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('helyszin_id')
                ->references('id')
                ->on('helyszin')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('szektor_csoport_id')
                ->references('id')
                ->on('szektor_csoport')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('szektor_id')
                ->references('id')
                ->on('szektor')
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
        Schema::dropIfExists('jegy_adat');
    }
};
