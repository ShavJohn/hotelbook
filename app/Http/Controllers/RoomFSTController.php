<?php

namespace App\Http\Controllers;

use App\Interfaces\RoomFSTInterface;
use Illuminate\Http\Request;

class RoomFSTController extends Controller
{
    private $roomFSTRepo;

    public function __construct(RoomFSTInterface $roomFSTRepo)
    {
        $this->roomFSTRepo = $roomFSTRepo;
    }


}
