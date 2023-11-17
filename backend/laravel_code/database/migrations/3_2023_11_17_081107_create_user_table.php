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
        Schema::create('user', function (Blueprint $table) {
            $table->id();
            $table->string('vezeteknev',50);
            $table->string('keresztnev',50);
            $table->string('email',50);
            $table->string('nem',50);
            $table->date('szuletesi_datum',50);
            $table->string('felhasznalonev',50);
            $table->string('jelszo');
            $table->string('profilkep_eleres',50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user');
    }
};
