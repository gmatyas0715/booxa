<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Helyszin extends Model
{
    protected $table = 'helyszin';
    use HasFactory;

    public function esemeny() : HasMany
    {
        return $this->hasMany(Esemeny::class);
    }

    public function jegyAdat() : HasMany {
        return $this->hasMany(JegyAdat::class);
    }

    public function cim() : BelongsTo {
        return $this->belongsTo(Cim::class);
    }

    public function szektorcsoport() : HasMany {
        return $this->hasMany(SzektorCsoport::class);
    }
}
