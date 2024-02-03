<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Interfaces\BookingInterface;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Carbon;

class BookingController extends Controller
{
    private BookingInterface $bookingRepo;

    public function __construct(BookingInterface $bookingInterface)
    {
        $this->bookingRepo = $bookingInterface;
    }


    /**
     * @param Request $bookingData
     * @return JsonResponse
     */
    public function booking(Request $bookingData) : JsonResponse
    {
        try {
            $bookingStoreData = [
                'name' => $bookingData->guestData['name'],
                'lastname' => $bookingData->guestData['lastname'],
                'email' => $bookingData->guestData['email'],
                'phone' => $bookingData->guestData['phone'],
                'country' => $bookingData->guestData['country'],
                'city' => $bookingData->guestData['city'],
                'address' => $bookingData->guestData['address'],
                'guestCount' => $bookingData->guestCount,
                'bookingStatus' => 'pending',
                'checkIn' => $bookingData->guestData['checkIn'],
                'checkOut' => $bookingData->guestData['checkOut'],
                'message' => $bookingData->guestData['message'],
                'startDate' => Carbon::parse($bookingData->bookingDate['startDate'])->format('Y-m-d H:i:s'),
                'endDate' => Carbon::parse($bookingData->bookingDate['endDate'])->format('Y-m-d H:i:s'),
            ];

            $bookingFromDB = $this->bookingRepo->store($bookingStoreData);

            if($bookingData->chosenRoom['id']) {
                $bookingFromDB->bookedRoom()->attach($bookingData->chosenRoom['id']);
            }

            if(count($bookingData->guestData['extraServices'])) {
                   foreach($bookingData->guestData['extraServices'] as $extraService) {
                       $bookingFromDB->bookingOptions()->attach($extraService['id']);
                }
            }

            return  response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Your booking has been registered',
            ]);
        } catch (\Exception $exception) {
            dd($exception);
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ], 422);
        }
    }
}
