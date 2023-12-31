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
        Schema::create('eloado', function (Blueprint $table) {
            $table->id();
            $table->string('nev',50);
            $table->text('leiras');
            $table->decimal('arkategoria',2,1);
            $table->string('kep_eleres',100)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eloado');
    }
};
