<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Esemeny;
use App\Models\Helyszin;
use App\Models\Eloado;
use Carbon\Carbon;


class EsemenySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Generált esmények változtatható paraméterei (eleje)
    
        $ESEMENY_NAPSZAM = 5;
        $ESEMENY_KEZDESI_IDOPONT = '15:00';
        $ESEMENY_INTERVALLUM_PERCBEN = 90;
        $ESEMENY_DARAB_EGYMAS_UTAN_PER_NAP = 6;
        $EGYSEG_JEGYAR = 4000;

        // Generált esmények változtatható paraméterei (vége)

        $helyszinek = Helyszin::all();
        $startDate = Carbon::now()->addWeek();

        foreach ($helyszinek as $helyszin) {
            $helyszin_id = $helyszin->id;
            for ($napSzama=0; $napSzama < $ESEMENY_NAPSZAM; $napSzama+=rand(1,3)) { 
                for ($percSzorzo=0; $percSzorzo < $ESEMENY_DARAB_EGYMAS_UTAN_PER_NAP; $percSzorzo++) { 
                    $idopont = Carbon::instance($startDate)
                    ->addDays($napSzama)
                    ->modify($ESEMENY_KEZDESI_IDOPONT)
                    ->addMinutes($ESEMENY_INTERVALLUM_PERCBEN * $percSzorzo)
                    ->format('Y-m-d H:i:s');

                    $eloado_id =  Eloado::inRandomOrder()->first()->id;

                    while(Esemeny::where('eloado_id',$eloado_id)
                            ->whereDate('idopont', '=', Carbon::parse($idopont)->format('Y-m-d'))
                            ->exists())
                    {
                        $eloado_id =  Eloado::inRandomOrder()->first()->id;
                    }

                    // Jegyár generátor
                    $eloadoArszorzo = Eloado::where('id',$eloado_id)->first()->arkategoria;
                    $helyszinArszorzo = Helyszin::where('id',$helyszin_id)->first()->arkategoria;
                    $jegyAlapar = round($eloadoArszorzo*$helyszinArszorzo*$EGYSEG_JEGYAR/100)*100-1;

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
