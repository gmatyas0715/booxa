<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Rendeles extends Model
{
    protected $table = 'rendeles';
    use HasFactory;

    public function fizetes():BelongsTo
    {
        return $this->belongsTo(Fizetes::class);
    }

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function jegyAdat():HasMany
    {
        return $this->hasMany(JegyAdat::class);
    }
}
