<?php


namespace App\Repositories;


use App\Interfaces\RoomFSTInterface;
use App\Models\RoomFST;

class RoomFSTRepository implements RoomFSTInterface
{
    private $model;

    public function __construct(RoomFST $roomFST)
    {
        $this->model = $roomFST;
    }

    public function addRoomFST($data)
    {
        return $this->model->create($data);
    }
}
