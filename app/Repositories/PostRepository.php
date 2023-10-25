<?php

namespace App\Repositories;

use App\Interfaces\PostInterface;
use App\Models\Post;

class PostRepository implements PostInterface
{
    /**
     * @var Post
     */
    protected Post $model;

    public function __construct(Post $post)
    {
        $this->model = $post;
    }

    /**
     * @return mixed
     */
    public function getPosts(): mixed
    {
        return $this->model->get();
    }

    /**
     * @param $data
     * @return mixed
     */
    public function createPost($data): mixed
    {
        return $this->model->create($data);
    }

    /**
     * @param $id
     * @param $data
     * @return mixed
     */
    public function updatePost($id, $data): mixed
    {
        return $this->model->where('id', $id)->update($data);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function deletePost($id): mixed
    {
        return $this->model->where('id', $id)->delete();
    }
}
