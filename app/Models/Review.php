<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
      'email',
      'phone_number',
      'fist_name',
      'last_name',
      'rating',
      'review_text'
    ];
}
