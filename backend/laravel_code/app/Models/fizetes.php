<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Fizetes extends Model
{
    protected $table = 'fizetes';
    use HasFactory;
    
    public function rendeles() : HasOne
    {
        return $this->hasOne(Rendeles::class);
    }

    public function cim() : BelongsTo {
        return $this->belongsTo(Cim::class);
    }
}
