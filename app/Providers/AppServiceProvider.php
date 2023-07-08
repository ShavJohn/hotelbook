<?php

namespace App\Providers;

use App\Interfaces\RoomOptionsInterface;
use App\Repositories\RoomOptionsRepository;
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
    }
}
