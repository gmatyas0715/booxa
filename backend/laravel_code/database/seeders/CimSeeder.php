<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
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

            $data = str_getcsv($line);

            Cim::create([
                'id' => $data[0],
                'iranyitoszam' => $data[1],
                'telepules' => $data[2],
                'kozterulet' => $data[3],
                'hazszam' => $data[4],
            ]);
        }
    }
}
