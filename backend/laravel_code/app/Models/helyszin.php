<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class helyszin extends Model
{
    protected $table = 'helyszin';
    protected $primaryKey = 'id';
    use HasFactory;
}
