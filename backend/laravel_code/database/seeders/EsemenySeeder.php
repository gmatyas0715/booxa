<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Esemeny;
use App\Models\Helyszin;
use App\Models\Eloado;
use Carbon\Carbon;
use App\database\factories\EsemenyFactory;
use Illuminate\Support\Facades\Log;


class EsemenySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
     
        $helyszinek = Helyszin::all();
        $startDate = Carbon::now()->addWeek();

        foreach ($helyszinek as $helyszin) {
            $helyszin_id = $helyszin->id;
            for ($napSzama=0; $napSzama < 30; $napSzama+=rand(1,3)) { 
                for ($percSzorzo=0; $percSzorzo < 6 ; $percSzorzo++) { 
                    $idopont = Carbon::instance($startDate)
                    ->addDays($napSzama)
                    ->modify('15:00')
                    ->addMinutes(90 * $percSzorzo)
                    ->format('Y-m-d H:i:s');

                    $eloado_id =  \App\Models\Eloado::inRandomOrder()->first()->id;

                    while(Esemeny::where('eloado_id',$eloado_id)
                            ->whereDate('idopont', '=', Carbon::parse($idopont)->format('Y-m-d'))
                            ->exists())
                    {
                        $eloado_id =  \App\Models\Eloado::inRandomOrder()->first()->id;
                    }

                    // Jegyár generátor
                    $eloadoArszorzo = Eloado::where('id',$eloado_id)->first()->arkategoria;
                    $helyszinArszorzo = Helyszin::where('id',$helyszin_id)->first()->arkategoria;
                    $jegyAlapar = round($eloadoArszorzo*$helyszinArszorzo*4000/100)*100-1;

                    Log::info($eloadoArszorzo.' '.$helyszinArszorzo);

                    $esemenyAdatok = [
                        'idopont' => $idopont,
                        'jegy_alapar' => $jegyAlapar, 
                        'eloado_id' => $eloado_id,
                        'helyszin_id' => $helyszin_id,
                    ];

                    Esemeny::factory()->create($esemenyAdatok);
                }
            }
        }
    }
}
