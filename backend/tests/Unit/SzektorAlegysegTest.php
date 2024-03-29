<?php

namespace Tests\Unit;

use App\Models\SzektorAlegyseg;
use PHPUnit\Framework\TestCase;

class SzektorAlegysegTest extends TestCase
{
    public function test_szektor_alegyseg_properties(): void
    {
        $szektorAlegyseg = new SzektorAlegyseg();
        $szektorAlegyseg->arszorzo = 1.1;
        $szektorAlegyseg->max_kapacitas = 10000;
        $szektorAlegyseg->sorjelzes = 'A';
        $szektorAlegyseg->szektor_id = 'teszt_szektor';
    
        $this->assertEquals(1.1, $szektorAlegyseg->arszorzo);
        $this->assertEquals(10000, $szektorAlegyseg->max_kapacitas);
        $this->assertEquals('A', $szektorAlegyseg->sorjelzes);
        $this->assertEquals('teszt_szektor', $szektorAlegyseg->szektor_id);
    }
}
