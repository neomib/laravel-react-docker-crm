<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'company',
        'agent_id'
    ];

    public function interactions()
    {
        return $this->hasMany(Interaction::class, 'contact_id');
    }
}
