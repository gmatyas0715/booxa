<?php

namespace Database\Seeders;

use App\Models\SzektorCsoport;
use Illuminate\Database\Seeder;

class SzektorCsoportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvFilePath = storage_path('../../db/sql scriptek/szektor_csoport.csv');
        $fileContents = file($csvFilePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        $headerSkipped = false;

        foreach ($fileContents as $line) {
            if (!$headerSkipped) {
                $headerSkipped = true;
                continue;
            }

            $data = str_getcsv($line,';');

            SzektorCsoport::create([
                'id' => $data[0],
                'szektor_csoport_nev' => $data[1],
                'szektor_tipus' => $data[2],
                'helyszin_id' => $data[3]
            ]);
        }
    }
}