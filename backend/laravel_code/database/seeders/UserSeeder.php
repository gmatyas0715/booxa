<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $csvFilePath = storage_path('../../db/sql scriptek/user.csv');

        $csvFile = fopen($csvFilePath, 'r');

        $header = fgetcsv($csvFile);

        while (($data = fgetcsv($csvFile)) !== false) {
            $user = array_combine($header, $data);

            $user['password'] = Hash::make($user['password']);

            DB::table('user')->insert($user);
        }

        // Close the file
        fclose($csvFile);
        User::create([
            'vezeteknev'=>'Kovács',
            'keresztnev'=>'Béla',
            'email'=>'kbela1111@gmail.com',
            'nem'=>'f',
            'szuletesi_datum'=>'1994-05-04',
            'felhasznalonev'=>'kbela',
            'jelszo'=>bcrypt('kbela'),
            'profilkep_eleres'=>''
        ]);
    }
}
