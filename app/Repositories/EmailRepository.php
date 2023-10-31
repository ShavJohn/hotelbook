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
     * @return mixed
     */
    public function replied($id): mixed
    {
        return $this->model->where('id', $id)->update(['replied' => 1]);
    }
}
