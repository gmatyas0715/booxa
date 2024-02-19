<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Arr;
use App\Models\Szerep;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $szerepek = Szerep::pluck('name')->toArray();
        $csvFilePath = storage_path('../../db/sql scriptek/user.csv');
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
                'username'=>$data[5],
                'password'=>Hash::make($data[6])
            ])->assignRole(Arr::random($szerepek));
        }
    }
}
