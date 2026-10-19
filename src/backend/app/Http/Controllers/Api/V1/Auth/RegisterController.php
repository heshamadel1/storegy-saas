<?php

declare(strict_types=1);


namespace App\Http\Controllers\Api\V1\Auth;

use App\Actions\Auth\RegisterUser;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Auth\RegisterRequest;
use App\Http\Resources\Auth\UserResource;
use Illuminate\Http\JsonResponse;

class RegisterController extends Controller
{

    public function __invoke(RegisterRequest $request, RegisterUser $action): JsonResponse
    {
        $data = $request->validated();

        $user = $action->execute($data);

        return response()->json([
            'success' => true,
            'message' => 'Account created successfully.',
            'data' => [
                'user' => new UserResource($user['user']),
                'token' => $user['token'],
            ],
        ], 201);
    }
}
