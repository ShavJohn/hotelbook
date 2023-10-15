<?php

namespace App\Repositories;

use App\Models\GeneralSettings;
use App\Interfaces\GeneralSettingsInterface;

class GeneralSettingsRepository implements GeneralSettingsInterface
{

    /**
     * @var GeneralSettings
     */
    protected GeneralSettings $model;

    /**
     * GeneralSettingsRepository constructor.
     * @param GeneralSettings $generalSettings
     */
    public function __construct(GeneralSettings $generalSettings)
    {
        $this->model = $generalSettings;
    }

    /**
     * @param $key
     * @param $data
     * @return mixed
     */
    public function updateOrCreateData($key, $data): mixed
    {
        if($this->ifExist($key)) {
            return $this->model->where('key', $key)->update([
                'value' => $data
            ]);
        } else {
            $myData = [
                'key' => $key,
                'value' => $data,
            ];
            return $this->model->create($myData);
        }
    }

    /**
     * @param $key
     * @param $data
     * @return mixed
     */
    public function updateOrCreatePageData($key, $data)
    {
        if($this->ifExist($key)) {
            return $this->model->where('key', $key)->update($data);
        } else {
            return $this->model->create($data);
        }
    }

    /**
     * @param $key
     * @return mixed
     */
    public function ifExist($key): mixed
    {
        return $this->model->where('key', $key)->exists();
    }

    /**
     * @param $page_setting
     * @return mixed
     */
    public function getGeneralSettings($page_setting): mixed
    {
        return $this->model->where('page_setting', $page_setting)->get();
    }
}
