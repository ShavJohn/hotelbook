<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'number',
        'en',
        'ru',
        'number',
        'main_image',
        'position'
    ];

    protected $casts = [
        'en' => 'array',
        'ru' => 'array'
    ];

    public function sft()
    {
        return $this->belongsToMany(RoomFST::class);
    }
}
