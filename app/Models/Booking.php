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
        'daily_price',
        'guestCount',
        'bookingStatus',
        'checkIn',
        'checkOut',
        'startDate',
        'endDate',
        'message',
        'guest_note'
    ];


    /**
     * @return BelongsToMany
     */
    public function bookedRoom(): BelongsToMany
    {
        return $this->belongsToMany(Room::class);
    }

    /**
     * @return BelongsToMany
     */
    public function bookingOptions(): BelongsToMany
    {
        return $this->belongsToMany(RoomOptions::class);
    }
}
