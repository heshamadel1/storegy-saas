<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Support\Facades\Hash;

it('registers a user and returns a token', function () {
    $response = $this->postJson('/api/v1/auth/register', [
        'name' => 'Hesham Adel',
        'email' => 'hesham@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'device_name' => 'web',
    ]);

    $response
        ->assertCreated()
        ->assertJsonStructure(['data' => ['user' => ['id', 'name', 'email'], 'token']])
        ->assertJsonPath('data.user.email', 'hesham@example.com')
        ->assertJsonMissingPath('data.user.password');

    $user = User::where('email', 'hesham@example.com')->firstOrFail();

    expect(Hash::check('password', $user->password))->toBeTrue();
    expect($user->tokens()->where('name', 'web')->count())->toBe(1);
});

it('rejects an email that is already registered', function () {
    User::factory()->create(['email' => 'taken@example.com']);

    $this->postJson('/api/v1/auth/register', [
        'name' => 'Someone Else',
        'email' => 'taken@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'device_name' => 'web',
    ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['email']);
});

it('validates the required fields', function () {
    $this->postJson('/api/v1/auth/register', [
        'email' => 'not-an-email',
        'password' => 'password',
        'password_confirmation' => 'wrong password',
    ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['name', 'email', 'password', 'device_name']);
});
