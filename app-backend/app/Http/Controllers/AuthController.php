<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $registerUserData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|min:8'
        ]);
        $user = User::create([
            'name' => $registerUserData['name'],
            'email' => $registerUserData['email'],
            'password' => Hash::make($registerUserData['password']),
        ]);
        return response()->json([
            'status' => 'success',
        ]);
    }

    public function login(Request $request)
    {
        $loginUserData = $request->validate([
            'email' => 'required|string|email|exists:users',
            'password' => 'required|min:8'
        ]);
        $user = User::where('email', $loginUserData['email'])->first();
        if (!$user || !Hash::check($loginUserData['password'], $user->password)) {
            return response()->json([
                'status' => 'error',
                'reason' => 'invalid'
            ], 401);
        }
        $token = $user->createToken($user->name . '-AuthToken')->plainTextToken;
        return response()->json([
            'status' => 'success',
            'access_token' => $token,
            'user' => ['name' => $user->name, 'email' => $user->email]
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            return response()->json(['status' => 'error', 'reason' => 'unauthenticated'], 401);
        }

        try {
            // Revoke all tokens for the authenticated user
             $request->user()->currentAccessToken()->delete();
        } catch (\Exception $e) {
            // Log the exception for investigation
            Log::error('Token revocation failed: ' . $e->getMessage());

            return response()->json(['status' => 'error', 'reason' => 'cannot-revoke-tokens'], 500);
        }

        return response()->json(['status' => 'success']);
    }
}
