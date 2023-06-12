<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'api'], function() {
    //auth routes

    Route::post('/login', 'App\Http\Controllers\Auth\AuthController@login');

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('/check-auth', 'App\Http\Controllers\Auth\AuthController@checkAuth');

    });

});
