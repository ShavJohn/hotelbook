<?php


namespace App\Repositories;

use App\Models\RoomOptions;
use App\Interfaces\RoomOptionsInterface;

class RoomOptionsRepository implements RoomOptionsInterface
{
    private RoomOptions $model;

    public function __construct(RoomOptions $roomOptions)
    {
        $this->model = $roomOptions;
    }

    /**
     * @return mixed
     */
    public function getFST(): mixed
    {
        return $this->model->get();
    }

    /**
     * @param $data
     * @return mixed
     */
    public function setRoomFST($data): mixed
    {
        return $this->model->create($data);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function removeFST($id): mixed
    {
        return $this->model->where('id', $id)->delete();
    }
}
