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
        Schema::create('eloado_mufaj', function (Blueprint $table) {
            $table->id();
            $table->foreignId('eloado_id');
            $table->foreignId('mufaj_id');
            $table->foreign('eloado_id')
                ->references('id')
                ->on('eloado')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('mufaj_id')
                ->references('id')
                ->on('mufaj')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->timestamps();
        }
    );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eloado_mufaj');
    }
};
