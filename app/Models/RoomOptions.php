<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class RoomOptions extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'en',
        'ru',
        'size',
        'price_list'
    ];

    protected $casts = [
        'en' => 'array',
        'ru' => 'array',
        'price_list' => 'array',
    ];

    /**
     * @return BelongsToMany
     */
    public function room(): BelongsToMany
    {
        return $this->belongsToMany(Room::class);
    }
}
