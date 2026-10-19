<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Support\Facades\Hash;

beforeEach(function () {
    $this->user = User::factory()->create([
        'email' => 'hesham@example.com',
        'password' => Hash::make('password'),
    ]);
});

it('logs in with valid credentials and returns a token', function () {
    $this->postJson('/api/v1/auth/login', [
        'email' => 'hesham@example.com',
        'password' => 'password',
        'device_name' => 'web',
    ])
        ->assertOk()
        ->assertJsonStructure(['data' => ['user' => ['id', 'name', 'email'], 'token']])
        ->assertJsonPath('data.user.email', 'hesham@example.com');

    expect($this->user->tokens()->where('name', 'web')->count())->toBe(1);
});

it('rejects a wrong password', function () {
    $this->postJson('/api/v1/auth/login', [
        'email' => 'hesham@example.com',
        'password' => 'wrong-password',
        'device_name' => 'web',
    ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['email']);

    expect($this->user->tokens()->count())->toBe(0);
});

it('returns the same error for an unknown email as for a wrong password', function () {
    $wrongPassword = $this->postJson('/api/v1/auth/login', [
        'email' => 'hesham@example.com',
        'password' => 'wrong-password',
        'device_name' => 'web',
    ]);

    $unknownEmail = $this->postJson('/api/v1/auth/login', [
        'email' => 'nobody@example.com',
        'password' => 'wrong-password',
        'device_name' => 'web',
    ]);

    $unknownEmail->assertUnprocessable();
    expect($unknownEmail->json())->toBe($wrongPassword->json());
});

it('validates the required fields', function () {
    $this->postJson('/api/v1/auth/login', [])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['email', 'password', 'device_name']);
});

//<!----------------------------- LogOut Test --------------------------------------------->

it('logs out the authenticated user by revoking their token', function () {
    $user = User::factory()->create();

    $token = $user->createToken('web')->plainTextToken;

    $response = $this->withHeader('Authorization', 'Bearer ' . $token)
        ->postJson('/api/v1/auth/logout');

    $response
        ->assertOk()
        ->assertJson([
            'success' => true,
            'message' => 'Logged out successfully.',
        ]);

    expect($user->tokens()->count())->toBe(0);
});

it('rejects unauthenticated logout requests', function () {
    $this->postJson('/api/v1/auth/logout')
        ->assertUnauthorized();
});
