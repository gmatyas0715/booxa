<?php

namespace Tests\Unit;

use App\Models\Szektor;
use PHPUnit\Framework\TestCase;

class SzektorTest extends TestCase
{
    public function test_szektor_properties(): void
    {
        $szektor = new Szektor();
        $szektor->szektor_nev = 'Szektor név';
        $szektor->szektor_tipus = 'Szektor típus';
        $szektor->helyszin_id = 1;
    
        $this->assertEquals('Szektor név', $szektor->szektor_nev);
        $this->assertEquals('Szektor típus', $szektor->szektor_tipus);
        $this->assertEquals(1, $szektor->helyszin_id);
    }
}
