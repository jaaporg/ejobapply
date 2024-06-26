<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Models\Role as BaseModel;

class Role extends BaseModel
{
    use HasFactory;

    public function scopeIgnoreAdministrator($query)
    {
        return $query->where('name', '!=', 'Administrator');
    }
}
