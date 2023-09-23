<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomOptions extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'en',
        'ru'
    ];

    protected $casts = [
        'en' => 'array',
        'ru' => 'array'
    ];
}
