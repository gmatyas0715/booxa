<?php

namespace Tests\Unit;

use App\Models\Mufaj;
use PHPUnit\Framework\TestCase;

class MufajTest extends TestCase
{
    public function test_mufaj_properties(): void
    {
        $mufaj = new Mufaj();
        $mufaj->nev = 'Teszt műfaj';
        $mufaj->leiras = 'Teszt leírás';
    
        $this->assertEquals('Teszt műfaj', $mufaj->nev);
        $this->assertEquals('Teszt leírás', $mufaj->leiras);
    }
}

