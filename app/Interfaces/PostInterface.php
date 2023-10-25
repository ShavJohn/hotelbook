<?php

namespace App\Interfaces;

interface PostInterface
{
    /**
     * @return mixed
     */
    public function getPosts(): mixed;

    /**
     * @param $data
     * @return mixed
     */
    public function createPost($data): mixed;

    /**
     * @param $id
     * @param $data
     * @return mixed
     */
    public function updatePost($id, $data): mixed;

    /**
     * @param $id
     * @return mixed
     */
    public function deletePost($id): mixed;
}
