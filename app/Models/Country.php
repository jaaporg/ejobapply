<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;
    
    /**
     * Scope a query to only include popular users.
     */
    public function scopeActive(Builder $query): void
    {
        $query->where('active', 1);
    }
}
