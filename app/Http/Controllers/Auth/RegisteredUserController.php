<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Organization;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'organization_name' => 'required|string|max:255|unique:'. Organization::class,
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        try {
            DB::beginTransaction();

            $organization = Organization::create([
                'organization_name' => $request->organization_name,
                'organization_code' => uniqid(),
                'status' => 1,
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'organization_id' => $organization->id,
                'username' => str_replace(' ', '', strtolower($request->name)),
                'status' => 1,
                'password' => Hash::make($request->password),
            ]);

            $user->syncRoles('User');

            activity()
            ->performedOn($user)
            ->causedBy($user)
            ->withProperties(['ip' => $request->ip()])
            ->log($user->username. ' registered.');

            event(new Registered($user));

            Auth::login($user);

            $user->update([
                'last_login_at' => now(),
                'last_login_ip' => $request->ip(),
            ]);

            activity()
            ->performedOn($user)
            ->causedBy($user)
            ->withProperties(['ip' => $request->ip()])
            ->log($user->username. ' login.');

            DB::commit();
            return redirect(RouteServiceProvider::HOME);
        } catch (\Throwable $th) {

            throw $th;
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Registration Failed']);
        }
    }
}
