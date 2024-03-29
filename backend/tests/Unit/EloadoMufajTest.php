<?php

namespace Tests\Unit;

use App\Models\EloadoMufaj;
use PHPUnit\Framework\TestCase;

class EloadoMufajTest extends TestCase
{
    public function test_eloado_mufaj_properties(): void
    {
        $eloadoMufaj = new EloadoMufaj();
        $eloadoMufaj->eloado_id = 1;
        $eloadoMufaj->mufaj_id = 1;
    
        $this->assertEquals(1, $eloadoMufaj->eloado_id);
        $this->assertEquals(1, $eloadoMufaj->mufaj_id);
    }
}
