<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EloadoMufaj extends Model
{
    protected $table = 'eloado_mufaj';
    protected $fillable = ['eloado_id','mufaj_id'];
    use HasFactory;
}
