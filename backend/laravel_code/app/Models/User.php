<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens,  Notifiable, HasRoles;
    protected $table = 'user';

    protected $fillable = ['felhasznalonev','jelszo','vezeteknev','keresztnev','email','nem','szuletesi_datum'];


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */

    protected $hidden = [
        'jelszo',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'jelszo' => 'hashed',
    ];

    
     public function getAuthPassword()
    {
        return $this->jelszo; // Specify the custom password column
    }

    public function getAuthIdentifierName()
    {
        return 'felhasznalonev'; // Specify the custom username column
    }
    
}
