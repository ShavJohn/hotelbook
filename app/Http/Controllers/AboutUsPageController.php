<?php

namespace App\Http\Controllers;

use App\Interfaces\GeneralSettingsInterface;
use App\Interfaces\RoomInterface;
use App\Interfaces\RoomOptionsInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AboutUsPageController extends Controller
{

    private RoomInterface $roomRepo;

    private RoomOptionsInterface $roomOptionsRepo;

    private GeneralSettingsInterface $generalSettingsRepo;

    public function __construct(RoomInterface $room, RoomOptionsInterface $roomOptionsRepo, GeneralSettingsInterface $generalSettingsRepo)
    {
        $this->roomRepo = $room;
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
}
