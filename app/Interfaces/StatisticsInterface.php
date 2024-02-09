<?php

namespace App\Interfaces;

interface StatisticsInterface
{
    /**
     * @param $key
     * @param $date
     * @return mixed
     */
    public function visitCounter($key, $date): mixed;

    /**
     * @param $key
     * @param $date
     * @return mixed
     */
    public function checkIfVisitExist($key, $date): mixed;

    /**
     * @param $startDate
     * @param $endDate
     * @param $key
     * @return mixed
     */
    public function getVisitorsData($startDate, $endDate, $key): array;

    /**
     * @param $startDate
     * @param $endDate
     * @return mixed
     */
    public function getBookingsData($startDate, $endDate): mixed;

    /**
     * @return string
     */
    public function getFirstDate(): mixed;

}
