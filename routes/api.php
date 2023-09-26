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


    Route::post('/login', 'App\Http\Controllers\AuthController@login');

    Route::get('/get-room-fst', 'App\Http\Controllers\RoomOptionsController@getRoomFST');

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('/check-auth', 'App\Http\Controllers\AuthController@checkAuth');

        //room feature routs
        Route::post('/add-room-{fst}', 'App\Http\Controllers\RoomOptionsController@addRoomFST');
        Route::delete('/delete-fst/{fst}', 'App\Http\Controllers\RoomOptionsController@removeFST');

        Route::post('/logout', 'App\Http\Controllers\AuthController@logOut');
    });

});
