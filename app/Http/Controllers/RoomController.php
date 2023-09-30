<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoomRequest;
use App\Interfaces\ImageInterface;
use App\Interfaces\RoomInterface;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RoomController extends Controller
{
    private RoomInterface $roomRepo;

    private ImageInterface $imageRepo;

    public function __construct(RoomInterface $room, ImageInterface $imageRepo)
    {
        $this->roomRepo = $room;
        $this->imageRepo = $imageRepo;
    }

    /**
     * @param RoomRequest $request
     * @return JsonResponse
     */
    public function addRoom(RoomRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();
            if(strlen($request['en']['name']) || strlen($request['ru']['name'])) {
                $roomData = [
                    'en' => $request['en'],
                    'ru' => $request['ru'],
                    'number' => $request['number'],
                    'main_image' => $request['main_image']
                ];

                $roomDataFromDB = $this->roomRepo->addRoom($roomData);



                $additionalImages = $request['additionalImages'];

                if(count($additionalImages)) {
                    $additionalImageArray = [];

                    foreach ($additionalImages as $image) {
                        $additionalImageArray[] = [
                            'image' => $image,
                            'imageable_id' => $roomDataFromDB->id,
                            'imageable_type' => 'Room',
                            'user_id' => auth()->user()->id,
                            'created_at' => Carbon::now(),
                            'updated_at' => Carbon::now(),
                        ];
                    }

                    $this->imageRepo->store($additionalImageArray);
                }

                if(count($request['selectedFeatures'])) {
                    foreach ($request['selectedFeatures'] as $selectedFeature) {
                        $roomDataFromDB->roomOptions()->attach($selectedFeature['id']);
                    }

                }

                if(count($request['selectedServices'])) {
                    foreach ($request['selectedServices'] as $selectedService) {
                        $roomDataFromDB->roomOptions()->attach($selectedService['id']);
                    }
                }

                if(count($request['selectedType'])) {
                    $roomDataFromDB->roomOptions()->attach($request['selectedType']['id']);
                }

                DB::commit();
                return response()->json([
                    'success' => 1,
                    'type' => 'success',
                    'message'  => 'Room has been created',
                ], 200);
            } else {
                return response()->json([
                    'success' => 0,
                    'type' => 'error',
                    'message'  => 'Please fill form correctly',
                ], 200);
            }
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ], 422);
        }
    }
}
