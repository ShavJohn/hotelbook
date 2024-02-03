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
     * @return mixed
     */
    public function store($data): mixed
    {
        return $this->model->create($data);
    }

    /**
     * @return mixed
     */
    public function getBooking(): mixed
    {
        return $this->model->get();
    }

    /**
     * @param $id
     * @param $data
     * @return mixed
     */
    public function updateBooking($id, $data): mixed
    {
        return $this->model->where('id', $id)->update($data);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function deleteBooking($id): mixed
    {
        return $this->model->where('id', $id)->delete();
    }
}
