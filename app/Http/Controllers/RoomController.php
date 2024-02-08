<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoomRequest;
use App\Interfaces\GeneralSettingsInterface;
use App\Interfaces\ImageInterface;
use App\Interfaces\RoomInterface;
use App\Interfaces\RoomOptionsInterface;
use App\Models\Room;
use App\Models\RoomOptions;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RoomController extends Controller
{
    private RoomInterface $roomRepo;

    private ImageInterface $imageRepo;

    private RoomOptionsInterface $roomOptionsRepo;

    private GeneralSettingsInterface $generalSettingsRepo;

    public function __construct(RoomInterface $room, ImageInterface $imageRepo, RoomOptionsInterface $roomOptionsRepo, GeneralSettingsInterface $generalSettingsRepo)
    {
        $this->roomRepo = $room;
        $this->imageRepo = $imageRepo;
        $this->roomOptionsRepo = $roomOptionsRepo;
        $this->generalSettingsRepo = $generalSettingsRepo;
    }

    /**
     * @return JsonResponse
     */
    public function getAboutUsPageData(): JsonResponse
    {
        try {

            $topRooms = $this->roomRepo->getTopRooms();
            $services = $this->roomOptionsRepo->getRoomOptions('services');
            $features = $this->roomOptionsRepo->getRoomOptions('features');
            $aboutUsContent = $this->generalSettingsRepo->getAboutUsPageContent();


            return response()->json([
                'success' => 1,
                'type' => 'success',
                'topRooms' => $topRooms,
                'services' => $services,
                'features' => $features,
                'aboutUsContent' => $aboutUsContent
            ], 200);
        } catch (\Exception $exception) {
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ], 422);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function updateAboutUsPageData(Request $request): JsonResponse
    {
        try {
            DB::beginTransaction();
            $aboutUsPageContent = $request->all();
            $data = [
                'value' => $aboutUsPageContent['image'] ?: '',
                'json_value' => [
                    'en' => $aboutUsPageContent['en'] ?: '',
                    'ru' => $aboutUsPageContent['ru'] ?: '',
                ]
            ];

            $this->generalSettingsRepo->updateOrCreateData('aboutUsPageContent', $data);
            DB::commit();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Room data has been updated',
            ], 200);
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

    /**
     * @param Room $room
     * @return JsonResponse
     */
    public function getRoom($room): JsonResponse
    {
        try {

            $roomData = $this->roomRepo->getRoom($room);

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'room'  => $roomData,
            ], 200);
        } catch (\Exception $exception) {
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ], 422);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getAvailableRooms(Request $request): JsonResponse
    {
        try {

            $data = $request->all();

            $rooms = $this->roomRepo->checkAvailableRooms($data);
            $roomTotalCount = $this->roomRepo->getAvailableRoomsTotalCount($data);

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'rooms'  => $rooms,
                'roomTotalCount' => $roomTotalCount,
            ], 200);
        } catch (\Exception $exception) {
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ], 422);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getRooms(Request $request): JsonResponse
    {
        try {

            $roomsData = $this->roomRepo->getRooms($request->skip, $request->take, $request->startDate, $request->endDate);
            $roomTotalCount = $this->roomRepo->getRoomTotalCount();


            return response()->json([
                'success' => 1,
                'type' => 'success',
                'roomData'  => $roomsData,
                'roomTotalCount' => $roomTotalCount,
            ], 200);
        } catch (\Exception $exception) {
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ], 422);
        }
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
                            'imageable_type' => Room::class,
                            'user_id' => auth()->user()->id,
                            'created_at' => Carbon::now(),
                            'updated_at' => Carbon::now(),
                        ];
                    }

                    $this->imageRepo->store($additionalImageArray);
                }

                #Connecting FSTs to room
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

                if($request['selectedType']) {
                    $roomDataFromDB->roomOptions()->attach($request['selectedType']);
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

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function updateRoom(Request $request): JsonResponse
    {
        try {
            DB::beginTransaction();
            $roomData = $request->params;
            $roomId = $roomData['id'];

            $roomModel = $this->roomRepo->getRoom($roomId);

            $roomUpdateData = [
                'en' => $roomData['en'],
                'ru' => $roomData['ru'],
                'number' => $roomData['number'],
                'main_image' => $roomData['main_image'],
            ];

            $additionalImages = $roomData['additionalImages'];
            $additionalImageArray = [];

            foreach ($additionalImages as $image) {
                if(gettype($image) === 'string') {
                    $additionalImageArray[] = [
                        'image' => $image,
                        'imageable_id' => $roomId,
                        'imageable_type' => Room::class,
                        'user_id' => auth()->user()->id,
                        'created_at' => Carbon::now(),
                        'updated_at' => Carbon::now(),
                    ];
                }
            }

            $room_options_id = [];

            $room_options_id[] = $roomData['selectedType']['id'];

            foreach ($roomData['selectedFeatures'] as $selectedFeatures) {
                $room_options_id[] = $selectedFeatures['id'];
            }

            foreach ($roomData['selectedServices'] as $selectedServices) {
                $room_options_id[] = $selectedServices['id'];
            }

            $roomModel->roomOptions()->sync($room_options_id);

            $this->imageRepo->store($additionalImageArray);

            $this->roomRepo->updateRoom($roomId, $roomUpdateData);

            DB::commit();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Room data has been updated',
            ], 200);
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

    /**
     * @param $roomId
     * @return JsonResponse
     */
    public function removeRoom($roomId): JsonResponse
    {
        try {
            DB::beginTransaction();
            $this->roomRepo->deleteRoom(intval($roomId));
            DB::commit();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message' => 'Room has been removed'
            ], 200);
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
