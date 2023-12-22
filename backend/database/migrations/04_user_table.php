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
            $table->string('vezeteknev',100);
            $table->string('keresztnev',100);
            $table->string('email',100);
            $table->string('nem',1);
            $table->date('szuletesi_datum');
            $table->string('felhasznalonev',100);
            $table->string('jelszo',255);
            $table->string('profilkep_eleres',100)->nullable();
	    $table->timestamp('email_verified_at')->nullable();
	    $table->rememberToken();
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
