<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Services\FileManagerService;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Facades\Image;
use App\Interfaces\GeneralSettingsInterface;
use Illuminate\Support\Facades\DB;

class GeneralSettingsController extends Controller
{
    /**
     * @var FileManagerService
     */
    protected FileManagerService $fileMenager;

    /**
     * @var GeneralSettingsInterface
     */
    protected GeneralSettingsInterface $generalSettingsRepo;

    /**
     * GeneralSettingsController constructor.
     * @param FileManagerService $fileManagerService
     * @param GeneralSettingsInterface $generalSettings
     */
    public function __construct(FileManagerService $fileManagerService, GeneralSettingsInterface $generalSettings)
    {
        $this->fileMenager = $fileManagerService;
        $this->generalSettingsRepo = $generalSettings;
    }

    /**
     * @return JsonResponse
     */
    public function getGeneralSettings(): JsonResponse
    {
        try {
            $generalSettings =  $this->generalSettingsRepo->getGeneralSettings();
            $logo = '';
            $companyName = '';
            $address = '';
            $phone = '';
            $email = '';
            $fax = '';
            $businessHours = '';
            $metaTitle = '';
            $metaDesc = '';
            foreach ($generalSettings as $setting) {
                if($setting->key === 'logo') {
                    $logo = $setting->value;
                } elseif($setting->key === 'address') {
                    $address = $setting->value;
                } elseif($setting->key === 'companyName') {
                    $companyName = $setting->value;
                } elseif($setting->key === 'phone') {
                    $phone = $setting->value;
                } elseif($setting->key === 'email') {
                    $email = $setting->value;
                } elseif($setting->key === 'fax') {
                    $fax = $setting->value;
                } elseif($setting->key === 'businessHours') {
                    $businessHours = $setting->value;
                }  elseif($setting->key === 'metaTitle') {
                    $metaTitle = $setting->value;
                }  elseif($setting->key === 'metaDesc') {
                    $metaDesc = $setting->value;
                }
            }

            $data = [
                'logo' => $logo ?: '',
                'companyName' => $companyName ?: '',
                'address' => $address ?: '',
                'phone' => $phone ?: '',
                'email' => $email ?: '',
                'fax' => $fax ?: '',
                'businessHours' => $businessHours ?: '',
                'metaTitle' => $metaTitle ?: '',
                'metaDesc' => $metaDesc ?: ''
            ];
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'setting' => $data
            ], 200);
        }  catch (\Exception $exception) {
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
    public function updateGeneralSettings(Request $request): JsonResponse
    {
        try {
            $settingsData = $request->all();
            DB::beginTransaction();
            foreach ($settingsData as $data) {
                $this->generalSettingsRepo->updateOrCreateData($data['key'], $data['value'] === null ? '' : $data['value']);
            }
            DB::commit();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Settings have been updated',
            ], 200);
        }  catch (\Exception $exception) {
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
    public function uploadLogo(Request $request): JsonResponse
    {
        try {
            DB::beginTransaction();
            $file = $request->file('image');
            $filePath = $file->path();
            $fileExtension = 'png';
            $uniqueName = time() . '_' . str_shuffle('local_project_image') . '_' . time();
            $newImageName = $uniqueName . '.' . $fileExtension;


            $newImage = Image::make($filePath)->encode('png');

            if (preg_match("/.(jpg|jpeg|webp|png)$/i", $newImageName)) {
                $this->fileMenager->fixImageOrientation($newImage);
            }

            $newImage = $this->fileMenager->imageSizeLimit($newImage);
            $this->fileMenager->uploadFile($newImage, $newImageName);

            $this->generalSettingsRepo->updateOrCreateData('logo', $newImageName);

            DB::commit();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Logo has been uploaded',
                'logo' => $newImageName
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
     * @param $logo
     * @return JsonResponse
     */
    public function deleteLogo($logo): JsonResponse
    {
        try {

            $this->fileMenager->delete($logo);

            $this->generalSettingsRepo->updateOrCreateData('logo', '');

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Logo has been deleted',
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
}
