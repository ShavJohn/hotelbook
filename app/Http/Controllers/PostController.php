<?php

namespace App\Http\Controllers;

use App\Interfaces\PostInterface;
use App\Models\Post;
use App\Services\FileManagerService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PostController extends Controller
{
    protected PostInterface $postRepo;

    protected FileManagerService $fileManagerService;

    public function __construct(PostInterface $postRepo, FileManagerService $fileManagerService)
    {
        $this->postRepo = $postRepo;
        $this->fileManagerService = $fileManagerService;
    }

    /**
     * @return JsonResponse
     */
    public function getPosts(): JsonResponse
    {
        try {
            $posts = $this->postRepo->getPosts();

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'posts'  => $posts,
            ], 200);
        } catch (\Exception $exception) {
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ], 422);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function createPost(Request $request): JsonResponse
    {
        try {
            DB::beginTransaction();
            $data = $request->all();

            $this->postRepo->createPost($data);

            DB::commit();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Post has been created',
            ], 200);
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ], 422);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function updatePost(Request $request): JsonResponse
    {
        try {
            DB::beginTransaction();
            $data = $request->all();

            $this->postRepo->updatePost($data['id'], $data);

            DB::commit();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Post has been updated',
            ], 200);
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ], 422);
        }
    }

    /**
     * @param Post $post
     * @return JsonResponse
     */
    public function deletePost(Post $post): JsonResponse
    {
        try {
            DB::beginTransaction();

            $this->filemenager->delete($post->image_path);
            $this->postRepo->deletePost($post->id);

            DB::commit();
            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'Post has been deleted',
            ], 200);
        } catch (\Exception $exception) {
            DB::rollBack();
            Log::error($exception);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ], 422);
        }
    }
}
