<?php

namespace App\Repositories;

use App\Interfaces\StatisticsInterface;
use App\Models\Statistics;

class StatisticsRepository implements StatisticsInterface
{
    private Statistics $model;

    public function __construct(Statistics $model)
    {
        $this->model = $model;
    }



}
