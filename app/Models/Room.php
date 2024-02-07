<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

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

    /**
     * @return MorphMany
     */
    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'imageable');
    }


    /**
     * @return BelongsToMany
     */
    public function bookings(): BelongsToMany
    {
        return $this->belongsToMany(Booking::class);
    }
}
