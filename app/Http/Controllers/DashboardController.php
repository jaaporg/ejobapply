<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response as HttpResponse;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Response;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $count = User::selectRaw('COUNT(*) as total_user, SUM(status=1) as active_user, SUM(status=2) as inactive_user')
            ->whereHas('roles', function($query) {
                $query->where('name', '!=', 'Administrator');
            })
            ->first();

        $monthlyCounts = User::selectRaw('month(created_at) as month')
            ->selectRaw('count(*) as count')
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('count', 'month');

        $monthlyCount = [];
        for ($i = 1; $i <= 12; $i++) {
            if (isset($monthlyCounts[$i])) {
                $monthlyCount[] = $monthlyCounts[$i];
            } else {
                $monthlyCount[] = 0;
            }
        }

        $from = now()->startOfMonth(); // first date of the current month
        $to = now();
        $usersRegisteredThisMonth = User::whereBetween('created_at', [$from, $to])->count();

        return Inertia::render('Dashboard/Index', [
            'count' => $count,
            'monthlyCount' => $monthlyCount,
            'usersRegisteredThisMonth' => $usersRegisteredThisMonth,
            'users' => User::with('roles')
                ->latest()
                ->withoutRole('administrator')
                ->take(10)
                ->get()
                ->map(function ($row) {
                    return [
                        'id' => $row->id,
                        'name' => $row->name,
                        'email' => $row->email,
                        'username' => $row->username,
                        'role_name' => $row->roles[0]->display_name ?? '',
                        'status' => $row->status,
                    ];
                }),
        ]);
    }
}
