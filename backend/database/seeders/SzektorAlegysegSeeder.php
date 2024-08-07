<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SzektorAlegyseg;

class SzektorAlegysegSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvFilePath = storage_path('../../db/csv_fajlok/szektor_alegyseg.csv');
        $fileContents = file($csvFilePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        $headerSkipped = false;

        foreach ($fileContents as $line) {
            if (!$headerSkipped) {
                $headerSkipped = true;
                continue;
            }

            $data = str_getcsv($line,';');

            SzektorAlegyseg::create([
                'id' => $data[0],
                'arszorzo' => $data[1],
                'max_kapacitas' => $data[2],
                'sorjelzes' => $data[3],
                'szektor_id' => $data[4],
            ]);
        }
    }
}
