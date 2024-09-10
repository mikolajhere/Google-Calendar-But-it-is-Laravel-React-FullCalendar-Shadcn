<?php

namespace App\Http\Controllers;

use App\Services\VisitService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class VisitController extends Controller
{
    protected VisitService $visitService;

    public function __construct(VisitService $visitService)
    {
        $this->visitService = $visitService;
    }

    public function index(Request $request)
    {
        // Retrieve user_id from the request query parameters
        $userId = $request->query('user_id');

        // Ensure user_id is an integer and not null
        if (is_null($userId)) {
            return response()->json(['error' => 'User ID is required'], 400);
        }

        // Call the list method on VisitService
        $visits = $this->visitService->list((int) $userId);

        return response()->json($visits);
    }

    // write list method to return all visits
    public function list(Request $request): JsonResponse
    {
        $userId = $request->query('user_id');
        $visits = $this->visitService->list((int) $userId);
        return response()->json(['success' => true, 'visits' => $visits], 200);
    }


    public function store(Request $request): JsonResponse
    {
        $this->visitService->store($request->all());
        return response()->json(['success' => true, 'message' => 'Visit created successfully.'], 201);
    }

    public function get($id): JsonResponse
    {
        $visit = $this->visitService->getById($id);
        if ($visit) {
            return response()->json(['success' => true, 'visit' => $visit], 200);
        } else {
            return response()->json(['success' => false, 'message' => 'Visit not found.'], 404);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        $this->visitService->update($id, $request->all());
        return response()->json(['success' => true, 'message' => 'Visit updated successfully.'], 200);
    }

    public function delete($id): JsonResponse
    {
        $this->visitService->delete($id);
        return response()->json(['success' => true, 'message' => 'Visit deleted successfully.'], 200);
    }
}
