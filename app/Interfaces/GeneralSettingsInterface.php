<?php

namespace App\Interfaces;

interface GeneralSettingsInterface
{
    /**
     * @param $key
     * @param $data
     * @return mixed
     */
    public function updateOrCreateData($key, $data): mixed;

    /**
     * @param $key
     * @return mixed
     */
    public function ifExist($key): mixed;

    /**
     * @return mixed
     */
    public function getGeneralSettings(): mixed;
}
