<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingRoomOptions extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'room_options_id'
    ];
}
