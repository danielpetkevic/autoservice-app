<?php

return [
    'required' => 'The :attribute field is required.',
    'string' => 'The :attribute must be a string.',
    'numeric' => 'The :attribute must be a number.',
    'integer' => 'The :attribute must be an integer.',
    'boolean' => 'The :attribute field must be true or false.',
    'max' => [
        'string' => 'The :attribute may not be greater than :max characters.',
        'numeric' => 'The :attribute may not be greater than :max.',
    ],
    'min' => [
        'numeric' => 'The :attribute must be at least :min.',
        'string' => 'The :attribute must be at least :min characters.',
    ],
    'unique' => 'The :attribute has already been taken.',
    'regex' => 'The :attribute format is invalid.',
    'custom' => [
        'sku' => [
            'regex' => 'validation.sku_format',
            'unique' => 'validation.sku_unique',
        ],
    ],
    'attributes' => [
        'sku' => 'SKU',
        'stock_quantity' => 'stock quantity',
        'category_id' => 'service category',
        'is_active' => 'active status',
    ],
];
