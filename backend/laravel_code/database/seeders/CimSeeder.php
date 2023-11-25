<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cim;

class CimSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $csvFilePath = storage_path('../../../db/sql scriptek/cim.csv');
        $fileContents = file($csvFilePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        $headerSkipped = false;

        foreach ($fileContents as $line) {
            if (!$headerSkipped) {
                $headerSkipped = true;
                continue;
            }

            $data = str_getcsv($line,';');

            Cim::create([
                'iranyitoszam' => $data[0],
                'telepules' => $data[1],
                'kozterulet' => $data[2],
                'hazszam' => $data[3],
            ]);
        }
    }
}
