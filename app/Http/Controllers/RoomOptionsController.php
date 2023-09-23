<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Interfaces\RoomOptionsInterface;
use function League\Flysystem\get;
use function Ramsey\Uuid\Codec\encode;

class RoomOptionsController extends Controller
{
    private $roomOptionsRepo;

    public function __construct(RoomOptionsInterface $roomOptionsRepo)
    {
        $this->roomOptionsRepo = $roomOptionsRepo;
    }

    public function getRoomFST()
    {
        try {

            $fst = $this->roomOptionsRepo->getFST();

            $features = [];

            $services = [];

            $roomTypes = [];

            foreach ($fst as $item) {
                if($item->type === 'features') {
                    $features[] = $item;
                }

                if($item->type === 'services') {
                    $services[] = $item;
                }

                if($item->type === 'types') {
                    $roomTypes[] = $item;
                }
            }

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'features'  => $features,
                'services'  => $services,
                'roomTypes'  => $roomTypes,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ], 422);
        }
    }

    public function addRoomFST($fst, Request $request)
    {
        try {

            $data = [
                'type' => $fst,
                'en'   => $request['en'],
                'ru'   => $request['ru']
            ];

            $this->roomOptionsRepo->setRoomFST($data);


            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => ucfirst(rtrim($fst,'s')) . ' has been created',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ], 422);
        }
    }
}
