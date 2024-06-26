<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $appends = ['name', 'permissions'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'status',
        'address',
        'username',
        'password',
        'country_id',
        'last_login_at',
        'last_login_ip',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_login_at' => 'datetime:Y-m-d H:i:s.u',
        'password' => 'hashed',
    ];

    public function sessions()
    {
        return $this->hasMany(Session::class);
    }

    public function getPermissions()
    {
        return request()->user()
            ->roles
            ->map
            ->permissions
            ->map
            ->pluck('name')
            ->first();
    }

    public function getNameAttribute()
    {
        return trim("{$this->first_name} {$this->last_name}");
    }

    public function getPermissionsAttribute()
    {
        return $this->getPermissions();
    }

    public function getStatus() {
        if($this->status) {
            return '<span className="badge bg-success">Active</span>';
        }
        return '<span className="badge bg-danger">Inactive</span>';
    }
}
