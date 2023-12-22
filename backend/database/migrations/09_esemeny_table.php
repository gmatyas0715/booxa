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
            $table->integer('jegy_alapar');
            $table->foreignId('eloado_id');
            $table->foreignId('helyszin_id');
            $table->foreign('eloado_id')
                ->references('id')
                ->on('eloado')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('helyszin_id')
                ->references('id')
                ->on('helyszin')
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
        Schema::dropIfExists('esemeny');
    }
};
