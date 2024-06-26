<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Permission;
use App\Models\Role;
use Inertia\Inertia;

class RolesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $routeName = $request->route()->getName();
        abort_unless($request->user()->can($routeName), HttpResponse::HTTP_UNAUTHORIZED);

        return Inertia::render('Role/Index', [
            'roles' => Role::where('name', '!=', 'administrator')->withCount('users')->paginate(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $routeName = $request->route()->getName();
        abort_unless($request->user()->can($routeName), HttpResponse::HTTP_UNAUTHORIZED);

        $permissions = Permission::get();

        return Inertia::render('Role/Create', [
            'permissions' => $permissions,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $routeName = $request->route()->getName();
        abort_unless($request->user()->can($routeName), HttpResponse::HTTP_UNAUTHORIZED);
        
        $this->validate($request, [
            'name' => 'required|unique:roles,name',
            'permission' => 'required',
        ]);

        try {
            DB::beginTransaction();

            $role = Role::create([
                'name' => $request->get('name'),
                'display_name' => $request->get('display_name'),
            ]);

            $role->syncPermissions($request->get('permission'));

            activity()
                ->performedOn($role)
                ->causedBy($request->user())
                ->withProperties(['ip' => $request->ip()])
                ->log('Role created.');

            DB::commit();
            return Redirect::route('roles.edit', $role->id)->withSuccess('created successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();
            return Redirect::back('roles.index')->withErrors('created failed');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Role $role)
    {
        $routeName = $request->route()->getName();
        abort_unless($request->user()->can($routeName), HttpResponse::HTTP_UNAUTHORIZED);

        $role = $role->where('name', '!=', 'administrator')->first();
        
        return Inertia::render('Role/Show', [
            'role' => $role,
            'rolePermissions' => $role->permissions,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Role $role)
    {
        $routeName = $request->route()->getName();
        abort_unless($request->user()->can($routeName), HttpResponse::HTTP_UNAUTHORIZED);

        $role = $role->where('name', '!=', 'administrator')->first();

        return Inertia::render('Role/Edit', [
            'role' => $role,
            'rolePermissions' => $role->permissions->pluck('id')->toArray(),
            'permissions' => Permission::get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Role $role, Request $request)
    {
        $routeName = $request->route()->getName();
        abort_unless($request->user()->can($routeName), HttpResponse::HTTP_UNAUTHORIZED);

        $this->validate($request, [
            'name' => 'required',
            'permission' => 'required',
        ]);

        try {
            DB::beginTransaction();

            $role->update($request->only('name', 'display_name'));
            $role->syncPermissions($request->get('permission'));

            activity()
                ->performedOn($role)
                ->causedBy($request->user())
                ->withProperties(['ip' => $request->ip()])
                ->log('role updated');

            DB::commit();
            return Redirect::route('roles.index')->withSuccess('updated successfully');
        } catch (\Throwable $th) {
            DB::rollBack();
            return Redirect::back()->withErrors('updated failed');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Role $role)
    {
        $routeName = $request->route()->getName();
        abort_unless($request->user()->can($routeName), HttpResponse::HTTP_UNAUTHORIZED);
        
        try {
            DB::beginTransaction();

            
            activity()
            ->performedOn($role)
            ->causedBy(request()->user())
            ->withProperties(['ip' => request()->ip()])
            ->log('role deleted');

            $role->delete();

            DB::commit();
            return Redirect::route('roles.index')->withSuccess('deleted successfully');
        } catch (\Throwable $th) {
            DB::rollBack();
            return Redirect::back()->withErrors('delete failed');
        }
    }
}
