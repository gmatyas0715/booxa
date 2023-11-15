<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class UserModel extends Authenticatable
{
    use Notifiable;
    protected $table = 'user';
    protected $fillable = ['id','vezeteknev','keresztnev','email','nem','szuletesi_datum','felhasznalonev','jelszo','profilkep_eleres'];
}
