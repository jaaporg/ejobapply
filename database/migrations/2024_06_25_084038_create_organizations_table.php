<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('organizations', function (Blueprint $table) {
            $table->id();
            $table->string('organization_code')->nullable();
            $table->string('organization_name')->nullable();
            $table->mediumText('description')->nullable();
            $table->tinyInteger('status')->default(0)->comment('0: Pending, 1: verified, 2: processing, 3: disabled');
            $table->timestamps();
        });
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('organization_id')->nullable();
            $table->foreign('organization_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organizations');
    }
};
