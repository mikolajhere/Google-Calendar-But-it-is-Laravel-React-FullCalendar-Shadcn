<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\VisitController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::group(['prefix' => '/tasks', 'as' => 'tasks.'], function () {
    Route::get('/', [TaskController::class, 'list']);
    Route::get('/{id}', [TaskController::class, 'get'])
        ->where('id', '[1-9][0-9]*');
    Route::post('/', [TaskController::class, 'store']);
    Route::put('/{id}', [TaskController::class, 'update'])
        ->where('id', '[1-9][0-9]*');
    Route::delete('/{id}', [TaskController::class, 'delete'])
        ->where('id', '[1-9][0-9]*');
    Route::put('/', [TaskController::class, 'reorder']);
    Route::get('/lala', [TaskController::class, 'list']);
});

Route::group(['prefix' => '/visits', 'as' => 'visits.'], function () {
    Route::get('/', [VisitController::class, 'list']);
    Route::post('/', [VisitController::class, 'store']);
    Route::get('/{id}', [VisitController::class, 'get']);
    Route::put('/{id}', [VisitController::class, 'update']);
    Route::delete('/{id}', [VisitController::class, 'delete']);
});
