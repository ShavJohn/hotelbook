<?php

namespace App\Http\Controllers;

use App\Interfaces\RoomInterface;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    private $roomRepo;

    public function __construct(RoomInterface $room)
    {
        $this->roomRepo = $room;
    }

    public function addRoom(Request $request)
    {
        try {
            dd($request);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ], 422);
        }
    }
}
