<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Helyszin;

class HelyszinSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvFilePath = storage_path('../../../db/sql scriptek/helyszin.csv');
        $fileContents = file($csvFilePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        $headerSkipped = false;

        foreach ($fileContents as $line) {
            if (!$headerSkipped) {
                $headerSkipped = true;
                continue;
            }

            $data = str_getcsv($line,';');

            Helyszin::create([
                'nev' => $data[0],
                'cim_id' => $data[1],
                'kapacitas' => $data[2],
                'szabadteri' => $data[3],
                'arkategoria' => $data[4],
                'helyszin_kep_eleres' => $data[5],
            ]);
        }
    }
}
