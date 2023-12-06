<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EloadoMufaj;

class EloadoMufajSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvFilePath = storage_path('../../../db/sql scriptek/eloado_mufaj.csv');
        $fileContents = file($csvFilePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        $headerSkipped = false;

        foreach ($fileContents as $line) {
            if (!$headerSkipped) {
                $headerSkipped = true;
                continue;
            }

            $data = str_getcsv($line,';');

            EloadoMufaj::create([
                'eloado_id' => $data[0],
                'mufaj_id' => $data[1]
            ]);
        }
    }
}
