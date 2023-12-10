<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Cim extends Model
{
    protected $table = 'cim';
    use HasFactory;

    public function helyszin() : HasOne {
        return $this->hasOne(Helyszin::class);
    }

    public function fizetes() : HasMany {
        return $this->hasMany(Fizetes::class);
    }
}
