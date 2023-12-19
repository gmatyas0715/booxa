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
        Schema::create('helyszin', function (Blueprint $table) {
            $table->id();
            $table->string('nev',100);
            $table->foreignId('cim_id')->unique();
            $table->integer('kapacitas');
            $table->boolean('szabadteri')->default(0);
            $table->decimal('arkategoria',2,1);
            $table->string('helyszin_kep_eleres',100);
            $table->string('svg_kep_eleres',100);
            $table->foreign('cim_id')
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
        Schema::dropIfExists('helyszin');
    }
};
