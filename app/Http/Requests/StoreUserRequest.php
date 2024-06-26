<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
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
            'username' => 'required|unique:users,username',
            'email' => 'required|email:rfc,dns|unique:users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required',
            'status' => 'required',
            'avatar' => 'nullable',
        ];
    }
}
