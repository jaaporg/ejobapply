<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response as HttpResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Settings/Index', [
            'tabName' => $request->get('tab', 'general'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function update(Request $request)
    {
        var_dump($request->hasFile('file'));die();
        print_r('<pre>');
        print_r($request->all());die();
    }
}
