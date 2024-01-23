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
        Schema::create('szektor_alegyseg_jegyar', function (Blueprint $table) {
            $table->id('id');
            $table->string('szektor_alegyseg_id',20);
            $table->foreignId('esemeny_id');
            $table->integer('szektor_alegyseg_ar');
            $table->foreign('szektor_id')
                ->references('id')
                ->on('szektor')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('esemeny_id')
                ->references('id')
                ->on('esemeny')
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
        Schema::dropIfExists('szektor_alegyseg_jegyar');
    }
};
