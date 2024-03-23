<?php

namespace App\Providers;

use App\Interfaces\BookingInterface;
use App\Interfaces\EmailInterface;
use App\Interfaces\GeneralSettingsInterface;
use App\Interfaces\ImageInterface;
use App\Interfaces\PostInterface;
use App\Interfaces\ReviewInterface;
use App\Interfaces\RoomFSTInterface;
use App\Interfaces\RoomInterface;
use App\Interfaces\RoomOptionsInterface;
use App\Interfaces\StatisticsInterface;
use App\Repositories\BookingRepository;
use App\Repositories\EmailRepository;
use App\Repositories\GeneralSettingsRepository;
use App\Repositories\ImageRepository;
use App\Repositories\PostRepository;
use App\Repositories\ReviewRepository;
use App\Repositories\RoomFSTRepository;
use App\Repositories\RoomOptionsRepository;
use App\Repositories\RoomRepository;
use App\Repositories\StatisticsRepository;
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
            GeneralSettingsInterface::class,
            GeneralSettingsRepository::class
        );
        $this->app->bind(
            PostInterface::class,
            PostRepository::class
        );
        $this->app->bind(
            EmailInterface::class,
            EmailRepository::class
        );
        $this->app->bind(
            BookingInterface::class,
            BookingRepository::class
        );
        $this->app->bind(
            StatisticsInterface::class,
            StatisticsRepository::class
        );
        $this->app->bind(
            ReviewInterface::class,
            ReviewRepository::class
        );
    }
}
