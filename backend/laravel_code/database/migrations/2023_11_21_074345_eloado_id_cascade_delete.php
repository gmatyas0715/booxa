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
        Schema::table('eloado_mufaj', function (Blueprint $table) {
            $table->dropForeign(['eloado_id']);
            $table->foreign('eloado_id')->references('id')->on('eloado')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    
    public function down(): void
    {

    }
};
