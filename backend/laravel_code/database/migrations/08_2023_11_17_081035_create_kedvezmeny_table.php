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
        Schema::create('kedvezmeny', function (Blueprint $table) {
            $table->id();
            $table->text('leiras');
            $table->string('kedvezmeny_tipus',20);
            $table->decimal('kedvezmeny_erteke',3,2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kedvezmeny');
    }
};
