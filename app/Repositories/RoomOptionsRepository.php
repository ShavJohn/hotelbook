<?php


namespace App\Repositories;

use App\Models\RoomOptions;
use App\Interfaces\RoomOptionsInterface;

class RoomOptionsRepository implements RoomOptionsInterface
{
    private $model;

    public function __construct(RoomOptions $roomOptions)
    {
        $this->model = $roomOptions;
    }

    /**
     * @return mixed
     */
    public function getFST()
    {
        return $this->model->get();
    }

    /**
     * @param $data
     * @return mixed
     */
    public function setRoomFST($data)
    {
        return $this->model->create($data);
    }

    /**
     * @param $data
     * @return mixed|void
     */
    public function removeFST($id)
    {
        return $this->model->where('id', $id)->delete();
    }
}
