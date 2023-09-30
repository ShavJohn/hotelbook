<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomRoomOptions extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'room_options_id',
    ];
}
