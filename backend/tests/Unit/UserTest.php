<?php

namespace Tests\Unit;

use App\Models\User;
use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{
    public function test_user_properties(): void
    {
        $user = new User();
        $user->vezeteknev = 'Teszt';
        $user->keresztnev = 'Tamás';
        $user->email = 'ttamas@example.com';
        $user->nem = 'f';
        $user->szuletesi_datum = '1997-03-12';
        $user->username = 'ttamas';
        $user->password = 'pw123';
    
        $this->assertEquals('Teszt', $user->vezeteknev);
        $this->assertEquals('Tamás', $user->keresztnev);
        $this->assertEquals('ttamas@example.com', $user->email);
        $this->assertEquals('f', $user->nem);
        $this->assertEquals('1997-03-12', $user->szuletesi_datum);
        $this->assertEquals('ttamas', $user->username);
        $this->assertEquals('pw123', $user->password);
    }
}
