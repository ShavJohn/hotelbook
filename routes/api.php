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

    //get rooms features, service and types
    Route::get('/get-room-fst', 'App\Http\Controllers\RoomOptionsController@getRoomFST');

    //message route
    Route::post('/send-message', 'App\Http\Controllers\EmailController@store');

    //get general settings
    Route::get('/get-general-settings', 'App\Http\Controllers\GeneralSettingsController@getGeneralSettings');

    //get page settings
    Route::get('/get-page-settings', 'App\Http\Controllers\GeneralSettingsController@getPageSettings');

    //get posts
    Route::get('get-posts', 'App\Http\Controllers\PostController@getPosts');

    //get rooms
    Route::get('/get-rooms','App\Http\Controllers\RoomController@getRooms');
    Route::get('/get-room/{room}','App\Http\Controllers\RoomController@getRoom');
    Route::get('/check-available-room', 'App\Http\Controllers\RoomController@getAvailableRooms');

    //booking room
    Route::post('/booking-room', 'App\Http\Controllers\BookingController@makeBooking');
    Route::get('/get-bookings-list', 'App\Http\Controllers\BookingController@getBookings');

    //about us
    Route::get('/get-about-us-data', 'App\Http\Controllers\AboutUsPageController@getAboutUsPageData');

    //statistics
    Route::post('/count-visitor', 'App\Http\Controllers\StatisticsController@countVisitors');

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('/check-auth', 'App\Http\Controllers\AuthController@checkAuth');
        Route::post('/create-user', 'App\Http\Controllers\AuthController@register');

        //message routs
        Route::get('/get-messages', 'App\Http\Controllers\EmailController@index');
        Route::post('/reply-to-message', 'App\Http\Controllers\EmailController@reply');
        Route::put('/update-message-status/{messageId}', 'App\Http\Controllers\EmailController@updateStatus');

        //room feature routs
        Route::post('/add-room-{fst}', 'App\Http\Controllers\RoomOptionsController@addRoomFST');
        Route::delete('/delete-fst/{fst}', 'App\Http\Controllers\RoomOptionsController@removeFST');

        //image routes
        Route::post('/upload-image', 'App\Http\Controllers\ImageController@uploadImage');
        Route::delete('/delete/image/{image}', 'App\Http\Controllers\ImageController@deleteImage');
        Route::delete('/delete-image-from-db/{image}', 'App\Http\Controllers\ImageController@deleteImageFromDB');

        //General Settings
        Route::post('/upload-logo', 'App\Http\Controllers\GeneralSettingsController@uploadLogo');
        Route::delete('/delete-logo/{logo}', 'App\Http\Controllers\GeneralSettingsController@deleteLogo');
        Route::post('/update-general-settings', 'App\Http\Controllers\GeneralSettingsController@updateGeneralSettings');

        //Page Settings
        Route::post('/update-page-settings', 'App\Http\Controllers\GeneralSettingsController@updatePageSettings');

        //Post Actions
        Route::post('/create-post', 'App\Http\Controllers\PostController@createPost');
        Route::put('/update-post', 'App\Http\Controllers\PostController@updatePost');
        Route::delete('/delete-post/{post}', 'App\Http\Controllers\PostController@deletePost');

        //Room routs
        Route::post('/add-room', 'App\Http\Controllers\RoomController@addRoom');
        Route::delete('/delete-room/{roomId}', 'App\Http\Controllers\RoomController@removeRoom');
        Route::put('/update-room', 'App\Http\Controllers\RoomController@updateRoom');

        //Booking Rout
        Route::put('/update-booking/{booking}', 'App\Http\Controllers\BookingController@updateBooking');
        Route::delete('/delete-booking/{booking}', 'App\Http\Controllers\BookingController@deleteBooking');

        //About Us page
        Route::post('/update-about-us-page', 'App\Http\Controllers\AboutUsPageController@updateAboutUsPageData');

        //statistics
        Route::get('/get-statistics-data', 'App\Http\Controllers\StatisticsController@getStatisticsData');

        Route::post('/logout', 'App\Http\Controllers\AuthController@logOut');
    });

});
