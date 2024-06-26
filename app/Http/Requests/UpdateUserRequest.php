<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
        // Let's get the route param by name to get the User object value
        $user = request()->route('user');

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
            'email' => 'required|email:rfc,dns|unique:users,email,'.$user->id,
            'username' => 'required|unique:users,username,'.$user->id,
            'role' => 'required',
            'status' => 'required',
            'avatar' => 'nullable',
        ];
    }
}
