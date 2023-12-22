<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(
            [
                CimSeeder::class,
                MufajSeeder::class,
                SzerepSeeder::class,
                UserSeeder::class,
                EloadoSeeder::class,
                EloadoMufajSeeder::class,
                KedvezmenySeeder::class,
                HelyszinSeeder::class,
                SzektorCsoportSeeder::class,
                SzektorSeeder::class,
                EsemenySeeder::class,
                FizetesSeeder::class,
                JegyAdatSeeder::class,
                JegyAdatKedvezmenySeeder::class,
                RendelesSeeder::class,
            ]
        ); 
    }
}
