<?php

declare(strict_types=1);

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Support\Facades\DB;



class RegisterUser
{
    /**
     * @param array{name: string, email: string, password: string, device_name: string} $data
     * @return array{user: User, token: string}
     */
    public function execute(array $data)
    {
        return DB::transaction(function () use ($data): array {
            $user = User::create([
                'name'     => $data['name'],
                'email'    => $data['email'],
                'password' => $data['password'],
            ]);

            $token = $user->createToken($data['device_name'])->plainTextToken;

            return [
                'user' => $user,
                'token' => $token,
            ];
        });
    }
}
