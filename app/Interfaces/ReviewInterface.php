<?php

namespace App\Interfaces;

interface ReviewInterface
{
    /**
     * @return mixed
     */
    public function getReviews(): mixed;

    /**
     * @param $id
     * @return mixed
     */
    public function deleteReview($id): mixed;

    /**
     * @param $data
     * @return mixed
     */
    public function rateHotel($data): mixed;
}
