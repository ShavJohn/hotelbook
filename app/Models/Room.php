<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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

    /**
     * @return BelongsToMany
     */
    public function roomOptions(): BelongsToMany
    {
        return $this->belongsToMany(RoomOptions::class);
    }
}
