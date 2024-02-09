<?php

namespace App\Http\Controllers;

use App\Interfaces\StatisticsInterface;
use Illuminate\Http\Request;

class StatisticsController extends Controller
{
    private StatisticsInterface $statisticsRepo;

    public function __construct(StatisticsInterface $statisticsRepo)
    {
        $this->statisticsRepo = $statisticsRepo;
    }


}
