<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JegyAdat extends Model
{
    protected $table = 'jegy_adat';
    protected $fillable = ['esemeny_id'];
    use HasFactory;

    public function rendeles():BelongsTo
    {
        return $this->belongsTo(Rendeles::class);
    }

    public function esemeny():BelongsTo
    {
        return $this->belongsTo(Esemeny::class);
    }

    public function helyszin() : BelongsTo 
    {
        return $this->belongsTo(Helyszin::class);
    }

    public function szektor_alegyseg() : BelongsTo 
    {
        return $this->belongsTo(SzektorAlegyseg::class);
    }

    public function szektor() : BelongsTo 
    {
        return $this->belongsTo(Szektor::class);
    }
}
