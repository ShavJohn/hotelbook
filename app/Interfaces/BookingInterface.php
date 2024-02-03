<?php

namespace App\Interfaces;

interface BookingInterface
{
    /**
     * @param $data
     * @return mixed
     */
    public function store($data): mixed;


    /**
     * @return mixed
     */
    public function getBooking(): mixed ;

    /**
     * @param $id
     * @param $data
     * @return mixed
     */
    public function updateBooking($id, $data): mixed ;

    /**
     * @param $id
     * @return mixed
     */
    public function deleteBooking($id): mixed ;
}
