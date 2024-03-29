<?php

namespace Tests\Unit;

use App\Models\Helyszin;
use PHPUnit\Framework\TestCase;

class HelyszinTest extends TestCase
{
    public function test_helyszin_properties(): void
    {
        $helyszin = new Helyszin();
        $helyszin->nev = 'Teszt helyszín';
        $helyszin->cim_id = 1;
        $helyszin->kapacitas = 10000;
        $helyszin->helyszin_kep_eleres = 'helyszin_kep_eleres.jpg';
        $helyszin->svg_kep_eleres = 'helyszin_svg_kep_eleres.jpg';
    
        $this->assertEquals('Teszt helyszín', $helyszin->nev);
        $this->assertEquals(1, $helyszin->cim_id);
        $this->assertEquals(10000, $helyszin->kapacitas);
        $this->assertEquals('helyszin_kep_eleres.jpg', $helyszin->helyszin_kep_eleres);
        $this->assertEquals('helyszin_svg_kep_eleres.jpg', $helyszin->svg_kep_eleres);
    }
}
