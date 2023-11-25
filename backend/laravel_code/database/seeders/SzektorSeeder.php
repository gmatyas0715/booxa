<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Szektor;

class SzektorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvFilePath = storage_path('../../../db/sql scriptek/szektor.csv');
        $fileContents = file($csvFilePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        $headerSkipped = false;

        foreach ($fileContents as $line) {
            if (!$headerSkipped) {
                $headerSkipped = true;
                continue;
            }

            $data = str_getcsv($line,';');

            Szektor::create([
                'szektor_id' => $data[0],
                'szektor_nev' => $data[1],
                'szektor_tipus' => $data[2],
                'arszorzo' => $data[3],
                'max_kapacitas' => $data[4],
                'sorjelzes' => $data[5],
                'helyszin_id' => $data[6],
            ]);
        }
    }
}
