<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Interfaces\BookingInterface;
use Illuminate\Support\Facades\DB;
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
    public function makeBooking(Request $bookingData) : JsonResponse
    {
        try {
            DB::beginTransaction();
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
                'message' => $bookingData->guestData['message'] ?: '',
                'startDate' => Carbon::parse($bookingData->bookingDate['startDate'])->setHour($bookingData->guestData['checkIn'])->format('Y-m-d H:i:s'),
                'endDate' => Carbon::parse($bookingData->bookingDate['endDate'])->setHour($bookingData->guestData['checkOut'])->format('Y-m-d H:i:s'),
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

            DB::commit();

            return  response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Your booking has been registered',
            ]);
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
    public function getBookings(Request $request) : JsonResponse
    {
        try {

            $bookings = $this->bookingRepo->getBookings($request->startDate);

            return  response()->json([
                'success' => 1,
                'type' => 'success',
                'bookings' => $bookings,
            ]);
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
     * @param Booking $booking
     * @param Request $request
     * @return JsonResponse
     */
    public function updateBooking(Booking $booking, Request $request)
    {
        try {
            DB::beginTransaction();
            $updatedBooking = $request->all();
            $bookingData = [
                'name' => $updatedBooking['name'],
                'lastname' => $updatedBooking['lastname'],
                'email' => $updatedBooking['email'],
                'phone' => $updatedBooking['phone'],
                'country' => $updatedBooking['country'],
                'city' => $updatedBooking['city'],
                'address' => $updatedBooking['address'],
                'guestCount' => $updatedBooking['guestCount'],
                'bookingStatus' => $updatedBooking['bookingStatus'],
                'checkIn' => $updatedBooking['checkIn'],
                'checkOut' => $updatedBooking['checkOut'],
                'message' => $updatedBooking['message'],
                'startDate' => Carbon::parse($updatedBooking['startDate'])->setHour($updatedBooking['checkIn'])->format('Y-m-d H:i:s'),
                'endDate' => Carbon::parse($updatedBooking['endDate'])->setHour($updatedBooking['checkOut'])->format('Y-m-d H:i:s'),
            ];

            $this->bookingRepo->updateBooking($booking->id, $bookingData);
            DB::commit();
            return  response()->json([
                'success' => 1,
                'type' => 'success',
                'message' => 'Booking has been updated',
            ]);
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
     * @param Booking $booking
     * @return JsonResponse
     */
    public function deleteBooking(Booking $booking): JsonResponse
    {
        try {
            $booking->delete();

            return  response()->json([
                'success' => 1,
                'type' => 'success',
                'message' => 'Booking has been deleted',
            ]);
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
