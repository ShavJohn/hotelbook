<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomFST extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'fst_id',
    ];

    public function room()
    {
        return $this->belongsToMany(Room::class);
    }
}
