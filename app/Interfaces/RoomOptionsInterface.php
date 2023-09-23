<?php


namespace App\Interfaces;


interface RoomOptionsInterface
{
    /**
     * @return mixed
     */
    public function getFST();

    /**
     * @param $data
     * @return mixed
     */
    public function setRoomFST($data);
}
