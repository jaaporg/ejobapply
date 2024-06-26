<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Role::truncate();

        Role::create([
            'name' => 'Administrator',
            'display_name' => 'Administrator',
            'guard_name' => 'web',
        ]);

        Role::create([
            'name' => 'User',
            'display_name' => 'User',
            'guard_name' => 'web',
        ]);
    }
}
