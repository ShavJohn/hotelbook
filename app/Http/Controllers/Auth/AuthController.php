<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct(Request $request)
    {

    }

    /**
     * @param RegisterRequest $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $requestData = $request->all();
            $requestData['password'] = Hash::make($requestData['password']);

            $user = User::create($requestData);

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'User registered successfully',
            ], 200);
        } catch (\Exception $exception) {
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ], 422);
        }
    }

    /**
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        try {

            $user = User::where('email', $request->email)->first();

            if($user) {
                if (Hash::check($request->password, $user->password)) {

                    $token = $user->createToken('authToken');
                    $accessToken = $token->accessToken;
                    Auth::login($user);

                    return response()->json([
                        'success' => 1,
                        'type' => 'success',
                        'message'  => 'You are Logged in',
                        'authUser' => $user,
                        'token' => $accessToken,
                    ], 200);
                } else {
                    return response()->json([
                        'success' => 0,
                        'type' => 'error',
                        'message'  => 'Something went wrong',
                    ], 422);
                }
            }

        } catch (\Exception $e) {
            dd($e);
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ], 422);
        }
    }

    /**
     * @return JsonResponse
     */
    public function checkAuth(): JsonResponse
    {
        try {
            $user = auth()->user();

            if($user) {
                return response()->json([
                    'success' => 1,
                    'type' => 'success',
                    'message'  => 'You are Logged in',
                    'authUser' => $user,
                ], 200);
            } else {
                return response()->json([
                    'success' => 1,
                    'type' => 'success',
                    'message'  => 'You aren\'t Logged in',
                    'authUser' => [],
                ], 200);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ], 422);
        }
    }

    /**
     * @param Request $request
     * @param User $user
     * @return JsonResponse
     */
    public function changeUserData(Request $request, User $user): JsonResponse
    {
        try {
            if($user) {
                if(!$request->name || !$request->email) {
                    if(!$request->name) {
                        return response()->json([
                            'success' => 0,
                            'type' => 'error',
                            'message'  => 'Your name fild is required',
                        ]);
                    } else {
                        return response()->json([
                            'success' => 0,
                            'type' => 'error',
                            'message'  => 'Your email fild is required',
                        ]);
                    }
                } else {
                    if($request->password) {
                        if (!Hash::check($request->password, $user->password)) {
                            return response()->json([
                                'success' => 0,
                                'type' => 'error',
                                'message'  => 'Your old password is wrong',
                            ]);
                        }
                    }

                    if($request->newPassword || $request->newPasswordConfirm) {
                        if($request->newPassword !== $request->newPasswordConfirm) {
                            return response()->json([
                                'success' => 0,
                                'type' => 'error',
                                'message'  => 'Your password and password confirmation are different',
                            ]);
                        }
                        else {
                            if(strlen($request->newPassword) >= 8) {
                                $user->password = Hash::make($request->newPassword);
                            } else {
                                return response()->json([
                                    'success' => 0,
                                    'type' => 'error',
                                    'message'  => 'Your new password is too short',
                                ]);
                            }

                        }
                    }

                    $user->name = $request->name;

                    if($request->email !== $user->email) {
                        if($request->email) {
                            $emailValidate = $request->validate([
                                'email'  =>  'email|unique:users',
                            ]);

                            if($emailValidate) {
                                $user->email = $request->email;
                            } else {
                                return response()->json([
                                    'success' => 0,
                                    'type' => 'error',
                                    'message'  => 'Email is already taken',
                                ]);
                            }
                        }
                    }

                    $user->notification_switch = $request->notification_switch;

                    $user->save();

                    return response()->json([
                        'success' => 1,
                        'type' => 'success',
                        'message'  => 'Your data has been updated',
                    ], 200);
                }
            } else {
                return response()->json([
                    'success' => 0,
                    'type' => 'error',
                    'message'  => 'Something went wrong',
                ], 422);
            }
        } catch (\Exception $exception) {
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ], 422);
        }
    }

    /***
     * @param Request $request
     * @return JsonResponse
     */
    public function logOut(Request $request): JsonResponse
    {
        try {

            $token = $request->user()->token();
            $token->revoke();

            return response()->json([
                'success' => 1,
                'type' => 'success',
                'message'  => 'You are Logged out',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => 0,
                'type' => 'error',
                'message'  => 'Something went wrong',
            ], 422);
        }
    }
}
