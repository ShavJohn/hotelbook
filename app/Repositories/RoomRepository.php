<?php


namespace App\Repositories;


use App\Interfaces\RoomInterface;
use App\Models\Room;

class RoomRepository implements RoomInterface
{

    private $model;

    public function __construct(Room $room)
    {
        $this->model = $room;
    }

    public function addRoom($data)
    {
        return $this->model->creat($data);
    }
}
