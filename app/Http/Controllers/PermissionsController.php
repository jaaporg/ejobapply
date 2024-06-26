<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Models\Permission;

class PermissionsController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request): RedirectResponse
    {   
        $routeName = $request->route()->getName();
        abort_unless($request->user()->can($routeName), HttpResponse::HTTP_UNAUTHORIZED);

        Artisan::call('make:pm');

        activity()
            ->causedBy($request->user())
            ->withProperties(['ip' => $request->ip()])
            ->log('Refresh permission.');

        return Redirect::back()->withSuccess(__('Permission sync successfully.'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Permission $permission): RedirectResponse
    {
        $routeName = $request->route()->getName();
        abort_unless($request->user()->can($routeName), HttpResponse::HTTP_UNAUTHORIZED);
        
        $request->validate([
            'display_name' => 'required|unique:permissions,name,'.$permission->id
        ]);

        $permission->update($request->only('display_name'));

        activity()
            ->causedBy($request->user())
            ->withProperties(['ip' => $request->ip()])
            ->log('Changed permission name.');

        return Redirect::back()->withSuccess(__('Permission updated successfully.'));
    }
}