<?php

namespace Tests\Unit;

use App\Models\Eloado;
use PHPUnit\Framework\TestCase;

class EloadoTest extends TestCase
{
    public function test_eloado_properties(): void
    {
        $eloado = new Eloado();
        $eloado->nev = 'Teszt előadó';
        $eloado->leiras = 'Teszt leírás';
        $eloado->arkategoria = 1.1;
        $eloado->kep_eleres = 'teszt_kep_eleres.jpg';
    
        $this->assertEquals('Teszt előadó', $eloado->nev);
        $this->assertEquals('Teszt leírás', $eloado->leiras);
        $this->assertEquals(1.1, $eloado->arkategoria);
        $this->assertEquals('teszt_kep_eleres.jpg', $eloado->kep_eleres);
    }
}
