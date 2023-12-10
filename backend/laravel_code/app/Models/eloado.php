<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Eloado extends Model
{
    protected $fillable = ['nev', 'leiras', 'arkategoria', 'kep_eleres'];
    protected $table = 'eloado';
    use HasFactory;

    public function esemeny() : HasMany {
        return $this->hasMany(Esemeny::class);
    }

    public function mufaj() : BelongsToMany {
        return $this->belongsToMany(Mufaj::class);
    }
}
