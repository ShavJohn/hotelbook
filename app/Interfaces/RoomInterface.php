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
     * @return mixed
     */
    public function getTopRooms(): mixed;

    /**
     * @param $skip
     * @param $take
     * @param $startDate
     * @param $endDate
     * @return mixed
     */
    public function getRooms($skip, $take, $startDate, $endDate): mixed;

    /**
     * @param $data
     * @return mixed
     */
    public function checkAvailableRooms($data): mixed;

    /**
     * @param $startDate
     * @param $endDate
     * @param $roomId
     * @return bool
     */
    public function isRoomBooked($startDate, $endDate, $roomId): mixed;

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
     * @return mixed
     */
    public function getAllRooms(): mixed;

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
