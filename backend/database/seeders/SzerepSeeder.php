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
        Szerep::create(['name' => 'esemenyszerkeszto','guard_name'=>'web']);
        Szerep::create(['name' => 'regisztralt_user','guard_name'=>'web']);
    }
}
