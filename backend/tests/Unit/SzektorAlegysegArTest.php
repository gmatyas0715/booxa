<?php

namespace Tests\Unit;

use App\Models\SzektorAlegysegAr;
use PHPUnit\Framework\TestCase;

class SzektorAlegysegArTest extends TestCase
{
    public function test_szektor_alegyseg_properties(): void
    {
        $szektorAlegysegAr = new SzektorAlegysegAr();
        $szektorAlegysegAr->szektor_alegyseg_id = 'teszt_szektor_alegyseg_id';
        $szektorAlegysegAr->esemeny_id = 1;
        $szektorAlegysegAr->szektor_alegyseg_ar = 10000;
    
        $this->assertEquals('teszt_szektor_alegyseg_id', $szektorAlegysegAr->szektor_alegyseg_id);
        $this->assertEquals(1, $szektorAlegysegAr->esemeny_id);
        $this->assertEquals(10000, $szektorAlegysegAr->szektor_alegyseg_ar);
    }
}
