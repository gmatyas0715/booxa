<?php

namespace Tests\Unit;

use App\Models\Rendeles;
use PHPUnit\Framework\TestCase;

class RendelesTest extends TestCase
{
    public function test_rendeles_properties(): void
    {
        $rendeles = new Rendeles();
        $rendeles->rendeles_osszeg = 10000;
        $rendeles->user_id = 1;
        $rendeles->vezeteknev = 'Teszt';
        $rendeles->keresztnev = 'Tamás';
        $rendeles->email = 'ttamas@example.com';
        $rendeles->szamlazasi_cim_id = 1;
        $rendeles->status = 'fizetett';
        $rendeles->session_id = 'teszt_session_id';
    
        $this->assertEquals(10000, $rendeles->rendeles_osszeg);
        $this->assertEquals(1, $rendeles->user_id);
        $this->assertEquals('Teszt', $rendeles->vezeteknev);
        $this->assertEquals('Tamás', $rendeles->keresztnev);
        $this->assertEquals('ttamas@example.com', $rendeles->email);
        $this->assertEquals(1, $rendeles->szamlazasi_cim_id);
        $this->assertEquals('fizetett', $rendeles->status);
        $this->assertEquals('teszt_session_id', $rendeles->session_id);
    }
}
