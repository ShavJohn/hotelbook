<?php


namespace App\Interfaces;


interface RoomInterface
{
    /**
     * @param $data
     * @return mixed
     */
    public function addRoom($data): mixed;

    /**
     * @param $skip
     * @param $take
     * @return mixed
     */
    public function getRooms($skip, $take, $startDate, $endDate): mixed;

    /**
     * @param $data
     * @return mixed
     */
    public function checkAvailableRooms($data): mixed;

    /**
     * @param $data
     * @return mixed
     */
    public function getAvailableRoomsTotalCount($data): mixed;

    /**
     * @return mixed
     */
    public function getRoomTotalCount(): mixed;

    /**
     * @param $id
     * @return mixed
     */
    public function getRoom($id): mixed;

    /**
     * @param $id
     * @param $data
     * @return mixed
     */
    public function updateRoom($id, $data): mixed;

    /**
     * @param $id
     * @return mixed
     */
    public function deleteRoom($id): mixed;
}
