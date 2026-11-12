<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateVehicleRequest extends FormRequest
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
        $vehicle = $this->route('vehicle');

        return [
            'brand' => ['required', 'string', 'max:255'],
            'model' => ['required', 'string', 'max:255'],
            'year' => [
                'required',
                'integer',
                'between:1900,' . now()->year,
            ],
            'license_plate' => ['required', 'string', 'max:255'],
            'vin' => [
                'required',
                'string',
                'size:17',
                Rule::unique('vehicles', 'vin')->ignore($vehicle->id),
            ],
            'mileage' => ['required', 'integer', 'min:0'],
        ];
    }
}
