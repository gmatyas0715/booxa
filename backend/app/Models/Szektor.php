<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Szektor extends Model
{
    protected $table = 'szektor';
    use HasFactory;

    public function helyszin() : BelongsTo {
        return $this->belongsTo(Helyszin::class,'helyszin_id');
    }
}
