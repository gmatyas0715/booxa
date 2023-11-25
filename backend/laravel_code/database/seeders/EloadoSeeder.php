<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Eloado;

class EloadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvFilePath = storage_path('../../../db/sql scriptek/eloado.csv');
        $fileContents = file($csvFilePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        $headerSkipped = false;

        foreach ($fileContents as $line) {
            if (!$headerSkipped) {
                $headerSkipped = true;
                continue;
            }

            $data = str_getcsv($line,';');

            Eloado::create([
                'nev' => $data[0],
                'leiras' => $data[1],
                'kep_eleres' => $data[2],
            ]);
        }
    }
}
