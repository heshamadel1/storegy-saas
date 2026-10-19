<?php

declare(strict_types=1);

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Support\Facades\DB;



class RegisterUser
{
    public function execute(string $name, string $email, string $password, string $deviceName)
    {
        return DB::transaction(function () use ($name, $email, $password, $deviceName): array {
            $user = User::create([
                'name' => $name,
                'email' => $email,
                'password' => $password,
            ]);

            $token = $user->createToken($deviceName)->plainTextToken;

            return [
                'user' => $user,
                'token' => $token,
            ];
        });
    }
}
