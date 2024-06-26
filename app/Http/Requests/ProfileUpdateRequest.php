<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required',
            'last_name' => 'required',
            'gender' => 'nullable',
            'dob' => 'nullable',
            'address_1' => 'nullable',
            'address_2' => 'nullable',
            'city' => 'nullable',
            'state' => 'nullable',
            'zip_code' => 'nullable',
            'country_id' => 'nullable',
            'phone' => 'nullable',
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
        ];
    }
}
