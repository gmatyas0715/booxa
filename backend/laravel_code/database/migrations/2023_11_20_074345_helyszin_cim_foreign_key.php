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
        Schema::table('helyszin', function (Blueprint $table) {
            $table->foreign('cim_id')->references('id')->on('cim');
        });
    }

    /**
     * Reverse the migrations.
     */
    
    public function down(): void
    {
        //
    }
};
