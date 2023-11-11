<?php

namespace App\Repositories;
use App\Models\Booking;
use App\Interfaces\BookingInterface;

class BookingRepository implements BookingInterface
{
    /**
     * @var Booking
     *
     */
    private Booking $model;

    /**
     * @param Booking $booking
     */
    public function __construct(Booking $booking)
    {
        $this->model = $booking;
    }

    /**
     * @param $data
     */
    public function store($data): mixed
    {
        return $this->model->create($data);
    }
}
