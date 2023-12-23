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
            $table->string('id',20)->primary();
            $table->decimal('arszorzo',3,2);
            $table->integer('max_kapacitas');
            $table->string('sorjelzes',20)->nullable();
            $table->string('szektor_csoport_id',20);
            $table->foreign('szektor_csoport_id')
                ->references('id')
                ->on('szektor_csoport')
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
        Schema::dropIfExists('szektor');
    }
};
