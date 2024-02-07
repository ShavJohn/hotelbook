<?php


namespace App\Repositories;


use App\Interfaces\RoomInterface;
use App\Models\Room;
use Carbon\Carbon;

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
    public function getRooms($skip, $take, $startDate, $endDate): mixed
    {
        $rooms = $this->model->with(['roomOptions' => function($q) {
                $q->select('room_options.id', 'room_options.type', 'room_options.en', 'room_options.ru');
            }])
            ->with('images')
            ->when(($skip || $skip === '0') && $take, function($q) use ($skip, $take) {
                $q->skip($skip)
                    ->take($take);
            })
            ->with(['bookings' => function ($query) use ($startDate, $endDate) {
                $query->where('startDate', '<', $endDate)
                    ->where('endDate', '>', $startDate)
                    ->where('bookingStatus', 'active');
            }])
            ->get();

        foreach ($rooms as &$room) {
            $room['busy'] = false; // Initialize busy status to false by default

            // Check if any bookings exist for the specific dates
            foreach ($room['bookings'] as $booking) {
                $bookingStartDate = Carbon::parse($booking['startDate']);
                $bookingEndDate = Carbon::parse($booking['endDate']);
                $checkStartDate = Carbon::parse($startDate);
                $checkEndDate = Carbon::parse($endDate);

                if ($bookingStartDate->between($checkStartDate, $checkEndDate) ||
                    $bookingEndDate->between($checkStartDate, $checkEndDate) ||
                    ($bookingStartDate->lte($checkStartDate) && $bookingEndDate->gte($checkEndDate))) {
                    // Room is busy for the specified dates
                    $room['busy'] = true;
                    break; // No need to check further bookings for this room
                }
            }

            unset($room['bookings']); // Remove bookings from the room data
        }


        return $rooms;
    }

    /**
     * @param $data
     * @return mixed
     */
    public function checkAvailableRooms($data): mixed
    {
        $startDate = $data['startDate'];
        $endDate = $data['endDate'];
        $skip = $data['skip'] ?: 0;
        $take = $data['take'] ?: 5;
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
            ->skip($skip)
            ->take($take)
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
     * @param $data
     * @return mixed
     */
    public function getAvailableRoomsTotalCount($data): mixed
    {
        $startDate = $data['startDate'];
        $endDate = $data['endDate'];
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

        return count($availableRooms);
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
