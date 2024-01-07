<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
}
