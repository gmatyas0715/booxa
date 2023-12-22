<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SzektorCsoport extends Model
{
    protected $table = 'szektorcsoport';
    use HasFactory;

    public function helyszin():BelongsTo{
        return $this->belongsTo(Helyszin::class);
    }

    public function szektor():HasMany{
        return $this->hasMany(Szektor::class);
    }
}
