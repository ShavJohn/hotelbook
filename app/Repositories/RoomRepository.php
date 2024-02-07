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
     * @param $data
     * @return mixed
     */
    public function checkAvailableRooms($data): mixed
    {
        $startDate = $data['startDate'];
        $endDate = $data['endDate'];
        $skip = $data['skip'];
        $take = $data['take'];
        $guestCount = $data['guestCount'];

        $availableRooms = $this->model->whereDoesntHave('bookings', function ($query) use ($startDate, $endDate) {
            $query->where(function ($query) use ($startDate, $endDate) {
                $query->where('startDate', '<', $endDate)
                    ->where('endDate', '>', $startDate)
                    ->where('bookingStatus', 'active');
            });
        })->orWhereDoesntHave('bookings')
            ->with(['roomOptions' => function ($query) {
                $query->where('type', 'types');
            }])
            ->get()->toArray();


        $availableRooms = array_filter($availableRooms, function ($room) use ($guestCount) {
            if (isset($room['room_options'])) {
                foreach ($room['room_options'] as $room_option) {
                    $roomGuestCount = intval($room_option['size']);
                    return $roomGuestCount >= (int)$guestCount;
                }
            }
            return false;
        });

        // Sort available rooms by guest count in ascending order
        usort($availableRooms, function ($a, $b) {
            $guestCountA = isset($a['room_options']) && isset($a['room_options']['size']) ? intval($a['room_options']['size']) : PHP_INT_MAX;
            $guestCountB = isset($b['room_options']) && isset($b['room_options']['size']) ? intval($b['room_options']['size']) : PHP_INT_MAX;
            return $guestCountA - $guestCountB;
        });


        return $availableRooms;
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
