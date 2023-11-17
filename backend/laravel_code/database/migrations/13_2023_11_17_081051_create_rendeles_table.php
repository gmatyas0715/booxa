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
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('fizetes_id');
            $table->foreign('user_id')->references('id')->on('user');
            $table->foreign('fizetes_id')->references('id')->on('fizetes');
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
