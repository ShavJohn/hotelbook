<?php

namespace App\Providers;

use App\Interfaces\GeneralSettingsInterface;
use App\Interfaces\ImageInterface;
use App\Interfaces\RoomFSTInterface;
use App\Interfaces\RoomInterface;
use App\Interfaces\RoomOptionsInterface;
use App\Repositories\GeneralSettingsRepository;
use App\Repositories\ImageRepository;
use App\Repositories\RoomFSTRepository;
use App\Repositories\RoomOptionsRepository;
use App\Repositories\RoomRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->bind(
            RoomOptionsInterface::class,
            RoomOptionsRepository::class
        );
        $this->app->bind(
            ImageInterface::class,
            ImageRepository::class
        );
        $this->app->bind(
            RoomInterface::class,
            RoomRepository::class
        );
        $this->app->bind(
            RoomFSTInterface::class,
            RoomFSTRepository::class
        );
        $this->app->bind(
            GeneralSettingsInterface::class,
            GeneralSettingsRepository::class
        );
    }
}
