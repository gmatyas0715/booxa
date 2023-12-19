<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Szerep;
use Illuminate\Support\Facades\Hash;

class SzerepSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Szerep::create(['name' => 'admin','guard_name'=>'web']);
        Szerep::create(['name' => 'szerkeszto','guard_name'=>'web']);
        Szerep::create(['name' => 'user_support','guard_name'=>'web']);
        Szerep::create(['name' => 'regisztralt_user','guard_name'=>'web']);
    }
}
