<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $user = Auth::guard('sanctum')->user();
        if (!$user ) {
            return response()->json([
                'status' => 'error',
                'reason' => 'unauthenticated'
            ], 401);
        }
        $result = Contact::where('agent_id', $user->id)->get();
        return response()->json([
            'status' => 'success',
            'contacts' => $result
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|string|email',
            'name' => 'required|min:2',
            'phone' => 'required|min:7',
            'company' => 'required|min:2'
        ]);
        $data['agent_id'] = $request->user()->id;

        $contact = Contact::create($data);

        return response()->json([
            'status' => 'success',
            'contact' => $contact
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        return  response()->json([
            'status' => 'success',
            'contact' => $contact,
            'interactions' => $contact->interactions
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        $data = $request->validate([
            'email' => 'required|string|email',
            'name' => 'required|min:2',
            'phone' => 'required|min:7',
            'company' => 'required|min:2'
        ]);
        $contact->update($data);
        return  response()->json([
            'status' => 'success',
            'contact' => $contact
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();
        return  response()->json([
            'status' => 'success'
        ]); 
    }
}
