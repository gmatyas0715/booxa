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
                'id' => $data[0],
                'nev' => $data[1],
                'cim_id' => $data[2],
                'kapacitas' => $data[3],
                'szabadteri' => $data[4],
                'helyszin_kep_eleres' => $data[5],
                'cim_id' => $data[6],
            ]);
        }
    }
}
