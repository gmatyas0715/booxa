<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Mufaj extends Model
{
    protected $table = 'mufaj';
    use HasFactory;

    public function eloado() : BelongsToMany {
        return $this->belongsToMany(Eloado::class);
    }
}
