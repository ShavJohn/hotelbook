<?php

namespace App\Http\Controllers;

use App\Interfaces\ReviewInterface;
use App\Models\Booking;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    protected ReviewInterface $reviewRepo;

    public function __construct(ReviewInterface $review)
    {
        $this->reviewRepo = $review;
    }

    /**
     * @return JsonResponse
     */
    public function getReviews(): JsonResponse
    {
        try {

            $reviews = $this->reviewRepo->getReviews();

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'reviews'  => $reviews,
            ], 200);
        } catch (\Exception $exception) {
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ]);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function rateHotel(Request $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            $validate = Validator::make($request->all(), [
                'email' => 'bail|required|string|email|max:40',
                'fist_name' => 'bail|required|string|max:30',
                'phone_number' => 'bail|integer',
                'last_name' => 'bail|required|string|max:30',
                'rating'    => 'bail|required',
                'review_text' => 'bail|required|string|max:800'
            ], [], [
                'email' => 'Email',
                'fist_name' => 'First name',
                'last_name' => 'Last name',
                'rating' => 'Stars Input',
                'review_text' => 'review text'

            ])->validate();

            $reviewer = [
                'email' => $request['email'],
                'phone_number' => $request['phone_number'],
                'fist_name' => $request['fist_name'],
                'last_name' => $request['last_name'],
                'rating' => $request['rating'],
                'review_text' => $request['review_text']
            ];

            $visitor = Booking::where('email', $reviewer['email'])->first();

            if($visitor) {
                $this->reviewRepo->rateHotel($request->all());
                DB::commit();
            } else {
                DB::rollBack();
                return response()->json([
                    'success' => 0,
                    'type' => 'error',
                    'message'  => 'Please enter same email which you have used during reservation',
                ], 200);
            }

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Your review has been posted',
            ], 200);
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => $exception->getMessage(),
            ]);
        }
    }
}
