<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Booking extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',
        'lastname',
        'email',
        'phone',
        'country',
        'city',
        'address',
        'checkIn',
        'checkOut',
        'startDate',
        'endDate',
        'message'
    ];


    /**
     * @return BelongsToMany
     */
    public function bookedRoom(): BelongsToMany
    {
        return $this->belongsToMany(RoomBooking::class);
    }

    /**
     * @return BelongsToMany
     */
    public function bookingOptions(): BelongsToMany
    {
        return $this->belongsToMany(BookingRoomOptions::class);
    }
}
