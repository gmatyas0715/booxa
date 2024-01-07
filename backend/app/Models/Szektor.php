<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Szektor extends Model
{

    protected $casts = [
        'id' => 'string'
    ];

    protected $table = 'szektor';
    use HasFactory;

    public function helyszin():BelongsTo{
        return $this->belongsTo(Helyszin::class);
    }

    public function szektor_alegyseg():HasMany{
        return $this->hasMany(SzektorAlegyseg::class);
    }
}
