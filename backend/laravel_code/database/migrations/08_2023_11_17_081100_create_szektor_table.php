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
        Schema::create('szektor', function (Blueprint $table) {
            $table->string('szektor_id',20)->primary();
            $table->string('szektor_nev',50);
            $table->string('szektor_tipus',50);
            $table->decimal('arszorzo',3,2);
            $table->integer('max_kapacitas');
            $table->string('sorjelzes',20)->nullable();
            $table->string('helyszin_id',10);
            $table->foreign('helyszin_id')->references('id')->on('helyszin');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('szektor');
    }
};
