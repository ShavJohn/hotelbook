<?php


namespace App\Interfaces;


interface RoomOptionsInterface
{
    /**
     * @return mixed
     */
    public function getFST(): mixed;

    /**
     * @param $data
     * @return mixed
     */
    public function setRoomFST($data): mixed;

    /**
     * @param $id
     * @return mixed
     */
    public function removeFST($id): mixed;
}
