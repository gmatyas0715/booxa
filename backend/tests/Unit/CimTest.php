<?php

namespace Tests\Unit;

use App\Models\Cim;
use PHPUnit\Framework\TestCase;

class CimTest extends TestCase
{
    public function test_cim_properties(): void
    {
        $cim = new Cim();
        $cim->iranyitoszam = '1234';
        $cim->telepules = 'Tesztfalva';
        $cim->kozterulet = 'Teszt utca';
        $cim->hazszam = '12';
    
        $this->assertEquals('1234', $cim->iranyitoszam);
        $this->assertEquals('Tesztfalva', $cim->telepules);
        $this->assertEquals('Teszt utca', $cim->kozterulet);
        $this->assertEquals('12', $cim->hazszam);
    }
}
