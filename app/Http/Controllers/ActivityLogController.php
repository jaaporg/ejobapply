<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response as HttpResponse;
use Illuminate\Http\Request;
use App\Models\Activity;
use Inertia\Response;
use Inertia\Inertia;

class ActivityLogController extends Controller
{
    public function index(Request $request): Response
    {
        $routeName = $request->route()->getName();
        abort_unless($request->user()->can($routeName), HttpResponse::HTTP_UNAUTHORIZED);

        return Inertia::render('ActivityLog/Index', [
            'activityLogs' => Activity::latest()
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

    public function show($causerId): Response
    {
        return Inertia::render('ActivityLog/Show', [
            'activityLogs' => Activity::latest()
            ->where('causer_id', $causerId)
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
                    'user_id' => $row->causer->id ?? '',
                    'logTime' => $row->created_at->format('Y-m-d h:i A'),
                ];
            }),
        ]);
    }
}
