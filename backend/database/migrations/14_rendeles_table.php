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
        Schema::create('rendeles', function (Blueprint $table) {
            $table->id();
            $table->timestamp('rendeles_idopont');
            $table->integer('rendeles_osszeg')->nullable();
            $table->timestamp('fizetes_idopont')->nullable();
            $table->foreignId('user_id');
            $table->string('vezeteknev');
            $table->string('keresztnev');
            $table->string('email',100);
            $table->foreignId('szamlazasi_cim_id');
            $table->string('status');
            $table->string('session_id')->nullable();
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('szamlazasi_cim_id')
                ->references('id')
                ->on('cim')
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
        Schema::dropIfExists('rendeles');
    }
};
