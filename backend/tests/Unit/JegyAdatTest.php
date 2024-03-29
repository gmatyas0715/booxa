<?php

namespace Tests\Unit;

use App\Models\JegyAdat;
use PHPUnit\Framework\TestCase;

class JegyAdatTest extends TestCase
{
    public function test_jegy_adat_properties(): void
    {
        $jegyAdat = new JegyAdat();
        $jegyAdat->esemeny_id = 1;
        $jegyAdat->helyszin_id = 1;
        $jegyAdat->rendeles_id = 1;
        $jegyAdat->szektor_id = 1;
        $jegyAdat->szektor_alegyseg_id = 1;
        $jegyAdat->ulohely = 100;
    
        $this->assertEquals(1, $jegyAdat->esemeny_id);
        $this->assertEquals(1, $jegyAdat->helyszin_id);
        $this->assertEquals(1, $jegyAdat->rendeles_id);
        $this->assertEquals(1, $jegyAdat->szektor_id);
        $this->assertEquals(1, $jegyAdat->szektor_alegyseg_id);
        $this->assertEquals(100, $jegyAdat->ulohely);
    }
}
