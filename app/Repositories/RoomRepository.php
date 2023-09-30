<?php


namespace App\Repositories;


use App\Interfaces\RoomInterface;
use App\Models\Room;

class RoomRepository implements RoomInterface
{

    private Room $model;

    public function __construct(Room $room)
    {
        $this->model = $room;
    }

    /**
     * @param $data
     * @return mixed
     */
    public function addRoom($data): mixed
    {
        return $this->model->create($data);
    }
}
