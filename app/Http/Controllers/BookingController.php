<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Interfaces\BookingInterface;

class BookingController extends Controller
{
    private BookingInterface $bookingRepo;

    public function __construct(BookingInterface $bookingInterface)
    {
        $this->bookingRepo = $bookingInterface;
    }

    public function book()
    {
        try {

        } catch (\Exception $exception) {

        }
    }
}
