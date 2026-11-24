<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAppointmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $user = $this->user();

        $vehicleRule = Rule::exists('vehicles', 'id');

        if (! $user->hasRole('admin')) {
            $vehicleRule->where('user_id', $user->id);
        }

        return [
            'vehicle_id' => [
                'required',
                'integer',
                $vehicleRule,
            ],
            'appointment_at' => [
                'required',
                'date',
                'after:now',
            ],
            'services' => [
                'sometimes',
                'array',
            ],
            'services.*' => [
                'required',
                'integer',
                'distinct',
                Rule::exists('services', 'id')
                    ->where('is_active', true),
            ],
            'status' => $user->hasRole('admin')
                ? [
                    'required',
                    'string',
                    Rule::in(['scheduled', 'completed', 'cancelled']),
                ]
                : ['sometimes', 'prohibited'],
            'notes' => [
                'nullable',
                'string',
                'max:2000',
            ],
        ];
    }
}
