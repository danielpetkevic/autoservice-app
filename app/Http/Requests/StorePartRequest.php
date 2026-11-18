<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePartRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function messages(): array
    {
        return [
            'sku.regex' => 'SKU must follow the format PART-NAME-12345 (uppercase letters and exactly 5 digits).',
            'sku.unique' => 'This SKU already exists.',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'sku' => [
                'required',
                'string',
                'regex:/^[A-Z]+(-[A-Z]+)?-[0-9]{5}$/',
                Rule::unique('parts', 'sku'),
            ],
            'price' => ['required', 'numeric', 'min:0'],
        ];
    }
}
