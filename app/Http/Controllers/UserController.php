<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Country;
use App\Models\Activity;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Response as HttpResponse;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $routeName = $request->route()->getName();
        abort_unless($request->user()->can($routeName), HttpResponse::HTTP_UNAUTHORIZED);

        return Inertia::render('User/Index', [
            'users' => User::latest()
                ->where('id', '!=', $request->user()->id)
                ->with('roles')
                ->withoutRole('administrator')
                ->paginate()
                ->withQueryString()
                ->through(function ($row) {
                    return [
                        'id' => $row->id,
                        'name' => $row->name,
                        'email' => $row->email,
                        'username' => $row->username,
                        'roles' => $row->roles,
                        'last_login_at' => $row->last_login_at ? $row->last_login_at->diffForHumans() : '-',
                        'status' => $row->status,
                    ];
                }),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $routeName = $request->route()->getName();
        abort_unless($request->user()->can($routeName), HttpResponse::HTTP_UNAUTHORIZED);

        return Inertia::render('User/Create', [
            'roles' => Role::latest()->ignoreAdministrator()->get()->map->only('name', 'id'),
            'countries' => Country::active()->get()->map->only('name', 'id'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(User $user, StoreUserRequest $request)
    {
        $routeName = $request->route()->getName();
        abort_unless($request->user()->can($routeName), HttpResponse::HTTP_UNAUTHORIZED);

        $validated = $request->validated();

        try {
            DB::beginTransaction();

            $user->fill($validated);
            $user->username = str_replace(' ', '', strtolower($validated['username']));
            $user->email = strtolower($validated['email']);
            $user->save();
            $user->syncRoles($request->get('role'));

            activity()
                ->performedOn($user)
                ->causedBy($request->user())
                ->withProperties(['ip' => $request->ip()])
                ->log('The '.$user->username . ' user profile created by '. $request->user()->username);

            DB::commit();
            return Redirect::route('user.store')->withSuccess('User created successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();
            return Redirect::back()->withErrors('User create failed.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, User $user)
    {
        $routeName = $request->route()->getName();
        abort_unless($request->user()->can($routeName), HttpResponse::HTTP_UNAUTHORIZED);
        
        $user->load('sessions');

        return Inertia::render('User/Show', [
            'user' => $user,
            'sessions' => $user->sessions
                ->map(function ($row) {
                    return [
                        'id' => $row->id,
                        'ip' => $row->ip_address,
                        'agent' => $row->user_agent,
                        'last_activity' => $row->last_activity->diffForHumans(),
                    ];
                }),
            'activityLogs' => Activity::latest()
                ->where('causer_id', $user->id)
                ->paginate()
                ->withQueryString()
                ->through(function ($row) {
                    return [
                        'id' => $row->id,
                        'causer_id' => $row->causer_id,
                        'log_name' => $row->log_name,
                        'properties' => $row->properties,
                        'description' => $row->description,
                        'subject_name' => $row->subject->username ?? '',
                        'username' => $row->causer->username ?? '',
                        'logTime' => $row->created_at->format('Y-m-d h:i A'),
                    ];
                }),
        ]);
    }
    /**
     * Display the user's form.
     */
    public function edit(Request $request, User $user): Response
    {
        $routeName = $request->route()->getName();
        abort_unless($request->user()->can($routeName), HttpResponse::HTTP_UNAUTHORIZED);

        return Inertia::render('User/Edit', [
            'user' => $user,
            'userRole' => $user->roles->first()->name ?? '',
            'roles' => Role::latest()->ignoreAdministrator()->get(),
            'countries' => Country::active()->get()->map->only('name', 'id'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $routeName = $request->route()->getName();
        abort_unless($request->user()->can($routeName), HttpResponse::HTTP_UNAUTHORIZED);

        $validated = $request->validated();

        try {
            DB::beginTransaction();
            
            $user->fill($validated);
            $user->username = str_replace(' ', '', strtolower($validated['username']));
            $user->email = strtolower($validated['email']);
            $user->save();
            $user->syncRoles([$request->get('role')]);

            activity()
                ->performedOn($user)
                ->causedBy($request->user())
                ->withProperties(['ip' => $request->ip()])
                ->log('The '. $user->username . ' user profile updated by '. $request->user()->username);

            DB::commit();

            return Redirect::route('user.index')->withSuccess('User updated successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();
            return Redirect::back()->withErrors('User update Failed.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, User $user): RedirectResponse
    {
        $routeName = $request->route()->getName();
        abort_unless($request->user()->can($routeName), HttpResponse::HTTP_UNAUTHORIZED);

        activity()
            ->performedOn($user)
            ->causedBy(request()->user())
            ->withProperties(['ip' => request()->ip()])
            ->log('User Deleted.');

        $user->delete();

        return Redirect::route('user.index')->withSuccess('User deleted successfully');
    }
}
