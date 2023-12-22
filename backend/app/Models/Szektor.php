<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Szektor extends Model
{
    protected $table = 'szektor';
    use HasFactory;

    public function szektorcsoport():BelongsTo{
        return $this->belongsTo(SzektorCsoport::class);
    }
}
