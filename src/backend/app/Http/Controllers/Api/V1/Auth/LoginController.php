<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Actions\Auth\LoginUser;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Auth\LoginRequest;
use App\Http\Resources\Auth\UserResource;
use Illuminate\Http\JsonResponse;


class LoginController extends Controller
{
    public function __invoke(LoginRequest $request, LoginUser $action): JsonResponse
    {
        $data = $request->validated();

        $user = $action->execute($data);

        return response()->json([
            'success' => true,
            'message' => 'Logged in successfully.',
            'data' => [
                'user' => new UserResource($user['user']),
                'token' => $user['token'],
            ],
        ]);
    }
}
