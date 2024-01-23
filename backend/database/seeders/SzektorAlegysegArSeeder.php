<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Esemeny;
use App\Models\SzektorAlegysegAr;
use Illuminate\Support\Facades\Log;

class SzektorAlegysegArSeeder extends Seeder
{

    public function run(): void
    {
        Log::info('seeder eleje');
        $esemenyek = Esemeny::select('id','helyszin_id','jegy_alapar')->get();
        Log::info($esemenyek);

        foreach ($esemenyek as $esemeny) {
            $esemenyAlapar = $esemeny->jegy_alapar;
            $szektorok = $esemeny->helyszin->szektor;
            foreach ($szektorok as $szektor) {
                foreach ($szektor->szektor_alegyseg as $szektor_alegyseg) {
                    $szektorAr = round($szektor_alegyseg->arszorzo*$esemenyAlapar-$esemenyAlapar * $szektor_alegyseg->arszorzo%100-1);
                    SzektorAlegysegAr::create([
                        'szektor_alegyseg_id'=>$szektor_alegyseg->id,
                        'esemeny_id'=>$esemeny->id,
                        'szektor_alegyseg_ar'=>$szektorAr
                    ]);
                }
            }
        }
        Log::info('seeder vége');
    }
}
