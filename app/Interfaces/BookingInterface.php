<?php

namespace App\Interfaces;

interface BookingInterface
{
    /**
     * @param $data
     * @return mixed
     */
    public function store($data): mixed;
}
