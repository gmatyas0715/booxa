<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Arr;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $szerepek = ['admin', 'szerkeszto', 'user_support', 'regisztralt_user'];
        $csvFilePath = storage_path('../../../db/sql scriptek/user.csv');
        $fileContents = file($csvFilePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        $headerSkipped = false;

        foreach ($fileContents as $line) {
            if (!$headerSkipped) {
                $headerSkipped = true;
                continue;
            }

            $data = str_getcsv($line,';');

            User::create([
                'vezeteknev'=>$data[0],
                'keresztnev'=>$data[1],
                'email'=>$data[2],
                'nem'=>$data[3],
                'szuletesi_datum'=>$data[4],
                'felhasznalonev'=>$data[5],
                'jelszo'=>Hash::make($data[6]),
                'profilkep_eleres'=>null,
            ])->assignRole(Arr::random($szerepek));
        }
    }
}
