<?php

namespace App\Repositories;

use App\Interfaces\ReviewInterface;
use App\Models\Review;

class ReviewRepository implements ReviewInterface
{

    private Review $model;

    public function __construct(Review $review)
    {
        $this->model = $review;
    }


    /**
     * @return mixed
     */
    public function getReviews(): mixed
    {
        return $this->model->get();
    }

    /**
     * @param $id
     * @return mixed
     */
    public function deleteReview($id): mixed
    {
        return $this->model->where('id', $id);
    }

    /**
     * @param $data
     * @return mixed
     */
    public function rateHotel($data): mixed
    {
        return $this->model->create($data);
    }
}
