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

    /**
     * @param $skip
     * @param $take
     * @return mixed
     */
    public function getRooms($skip, $take): mixed
    {
        return $this->model->with(['roomOptions' => function($q) {
                $q->select('room_options.id', 'room_options.type', 'room_options.en', 'room_options.ru');
            }])
            ->with('images')
            ->when(($skip || $skip === '0') && $take, function($q) use ($skip, $take) {
                $q->skip($skip)
                    ->take($take);
            })
            ->get();
    }

    /**
     * @return mixed
     */
    public function getRoomTotalCount(): mixed
    {
        return $this->model->count();
    }

    /**
     * @param $id
     * @return mixed
     */
    public function getRoom($id): mixed
    {
        return $this->model->where('id', $id)
            ->with(['roomOptions' => function($q) {
                $q->select('room_options.id', 'room_options.type', 'room_options.en', 'room_options.ru');
            }])
            ->with('images')
            ->first();
    }

    /**
     * @param $id
     * @param $data
     * @return mixed
     */
    public function updateRoom($id, $data): mixed
    {
        return $this->model->where('id', $id)->update($data);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function deleteRoom($id): mixed
    {
        return $this->model->where('id', $id)->delete();
    }
}
