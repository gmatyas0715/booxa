<?php

namespace Tests\Unit;

use App\Models\Esemeny;
use PHPUnit\Framework\TestCase;

class EsemenyTest extends TestCase
{
    public function test_esemeny_properties(): void
    {
        $esemeny = new Esemeny();
        $esemeny->idopont = '2024-07-14';
        $esemeny->jegy_alapar = 13400;
        $esemeny->eloado_id = 1;
        $esemeny->helyszin_id = 2;
    
        $this->assertEquals('2024-07-14', $esemeny->idopont);
        $this->assertEquals(13400, $esemeny->jegy_alapar);
        $this->assertEquals(1, $esemeny->eloado_id);
        $this->assertEquals(2, $esemeny->helyszin_id);
    }
}
