<?php


namespace App\Interfaces;


interface RoomOptionsInterface
{
    /**
     * @param $roomOptionType
     * @return mixed
     */
    public function getRoomOptions($roomOptionType): mixed;

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
