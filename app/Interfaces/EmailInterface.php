<?php

namespace App\Interfaces;

interface EmailInterface
{
    /**
     * @param $skip
     * @param $take
     * @return mixed
     */
    public function index($skip, $take): mixed;

    /**
     * @return int
     */

    public function getUnreadEmailsCount(): int;

    /**
     * @param $messageId
     * @return mixed
     */
    public function updateMessageStatus($messageId): mixed;

    /**
     * @param $data
     * @return mixed
     */
    public function store($data): mixed;

    /**
     * @param $id
     * @param $data
     * @return mixed
     */
    public function update($id, $data): mixed;

    /**
     * @param $id
     * @return mixed
     */
    public function reply($id, $replyData): mixed;
}
