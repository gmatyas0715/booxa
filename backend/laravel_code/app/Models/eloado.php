<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Eloado extends Model
{
    protected $fillable = ['nev', 'leiras', 'arkategoria', 'kep_eleres'];
    protected $table = 'eloado';
    use HasFactory;
}
