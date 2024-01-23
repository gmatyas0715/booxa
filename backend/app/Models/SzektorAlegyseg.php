<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SzektorAlegyseg extends Model
{
    protected $casts = [
    'id' => 'string',
    ];

    protected $table = 'szektor_alegyseg';
    use HasFactory;

    public function szektor():BelongsTo{
        return $this->belongsTo(Szektor::class);
    }

    public function szektor_alegyseg_ar():HasMany{
        return $this->hasMany(SzektorAlegysegAr::class);
    }
}
