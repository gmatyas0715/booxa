<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Esemeny extends Model
{
    protected $table = 'esemeny';
    use HasFactory;

    public function jegyAdat() : HasMany
    {
        return $this->hasMany(JegyAdat::class);
    }

    public function helyszin() : BelongsTo
    {
        return $this->belongsTo(Helyszin::class);
    }

    public function eloado() : BelongsTo 
    {
        return $this->belongsTo(Eloado::class);
    }
}
