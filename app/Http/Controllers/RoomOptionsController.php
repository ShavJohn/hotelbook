<?php

namespace App\Http\Controllers;

use App\Models\RoomOptions;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Interfaces\RoomOptionsInterface;
use Illuminate\Support\Facades\DB;

class RoomOptionsController extends Controller
{
    /**
     * @var RoomOptionsInterface
     */
    private RoomOptionsInterface $roomOptionsRepo;

    /**
     * RoomOptionsController constructor.
     * @param RoomOptionsInterface $roomOptionsRepo
     */
    public function __construct(RoomOptionsInterface $roomOptionsRepo)
    {
        $this->roomOptionsRepo = $roomOptionsRepo;
    }

    /**
     * @return JsonResponse
     */
    public function getRoomFST(): JsonResponse
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
            ]);
        }
    }

    /**
     * @param RoomOptions $type
     * @param Request $request
     * @return JsonResponse
     */
    public function updateRoomType(RoomOptions $type, Request $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            $type->update([
                'price_list' => $request['currentRoomType']['price_list']
            ]);

            DB::commit();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Type has been updated',
            ], 200);
        } catch (\Exception $exception) {
            DB::rollBack();

            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ]);
        }
    }

    /**
     * @param $fst
     * @param Request $request
     * @return JsonResponse
     */
    public function addRoomFST($fst, Request $request): JsonResponse
    {
        try {
            DB::beginTransaction();
            $data = [
                'type' => $fst,
                'size' => $fst === 'types' ? $request['size'] : '',
                'en'   => $request['en'],
                'ru'   => $request['ru']
            ];

            $this->roomOptionsRepo->setRoomFST($data);


            DB::commit();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => ucfirst(rtrim($fst,'s')) . ' has been created',
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ]);
        }
    }

    /**
     * @param $fst
     * @return JsonResponse
     */
    public function removeFST($fst): JsonResponse
    {
        try {

            $this->roomOptionsRepo->removeFST($fst);

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Item has been removed',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ]);
        }
    }
}
