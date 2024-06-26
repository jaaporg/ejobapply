<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response as HttpResponse;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Session;
use Inertia\Response;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $routeName = $request->route()->getName();
        abort_unless($request->user()->can($routeName), HttpResponse::HTTP_UNAUTHORIZED);

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'sessions' => Session::whereNotNull('user_id')
                // ->latest()
                // ->groupBy('ip_address')
                ->get()
                ->map(function($row) use ($request) {
                    return [
                        'id' => $row->id,
                        'ip' => $row->ip_address,
                        'agent' => $row->user_agent,
                        'status' => $request->header('user-agent'),
                        'last_activity' => $row->last_activity->diffForHumans(),
                    ];
                }),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $routeName = $request->route()->getName();
        abort_unless($request->user()->can($routeName), HttpResponse::HTTP_UNAUTHORIZED);
        
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        activity()
            ->performedOn($request->user())
            ->causedBy($request->user())
            ->withProperties(['ip' => $request->ip()])
            ->log('Profile updated.');

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
