<?php

declare(strict_types=1);

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginUser
{
    /**
     * @param array{email: string, password: string, device_name: string} $data
     * @return array{user: User, token: string}
     *
     * @throws ValidationException
     */

    public function execute(array $data): array
    {
        $user = User::where('email', $data['email'])->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['This credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken($data['device_name'])->plainTextToken;
        return [
            'user' => $user,
            'token' => $token,
        ];
    }
}
