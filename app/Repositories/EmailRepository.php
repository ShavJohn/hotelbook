<?php

namespace App\Repositories;

use App\Models\Email;
use App\Interfaces\EmailInterface;

class EmailRepository implements  EmailInterface
{
    private Email $model;

    public function __construct(Email $email)
    {
        $this->model = $email;
    }

    public function index($skip, $take): mixed
    {
        return $this->model->skip($skip)->take($take)->orderBy('created_at', 'desc')->get();
    }

    /**
     * @return int
     */

    public function getUnreadEmailsCount(): int
    {
        return $this->model->where('read', 0)->count();
    }

    /**
     * @param $messageId
     * @return mixed
     */
    public function updateMessageStatus($messageId): mixed
    {
        return $this->model->where('id', $messageId)->update([
            'read' => 1
        ]);
    }

    /**
     * @param $data
     * @return mixed
     */
    public function store($data): mixed
    {
        return $this->model->create($data);
    }


    /**
     * @param $id
     * @param $data
     * @return mixed
     */
    public function update($id, $data): mixed
    {
        return $this->model->where('id', $id)->update($data);
    }

    /**
     * @param $id
     * @param $replyData
     * @return mixed
     */
    public function reply($id, $replyData): mixed
    {
        return $this->model->where('id', $id)->update(['reply' => $replyData]);
    }
}
