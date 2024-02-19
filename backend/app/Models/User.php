<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    use HasApiTokens,  Notifiable, HasRoles;
    protected $table = 'users';

    protected $fillable = ['username','password','vezeteknev','keresztnev','email','nem','szuletesi_datum'];

    public function rendeles():HasMany
    {
        return $this->HasMany(Rendeles::class);
    }
}
