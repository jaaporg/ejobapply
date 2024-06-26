<?php

namespace App\Models;

use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    protected $appends = ['expires_at'];

    protected $casts = [
        'last_activity' => 'datetime:Y-m-d H:i:s.u',
    ];

    public function isExpired()
    {
        return $this->last_activity < Carbon::now()->subMinutes(config('session.lifetime'))->getTimestamp();
    }

    public function getExpiresAtAttribute()
    {
        return Carbon::createFromTimestamp($this->last_activity)->addMinutes(config('session.lifetime'))->toDateTimeString();
    }
}
