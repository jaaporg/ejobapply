<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Frontend.Home');
    }
}
