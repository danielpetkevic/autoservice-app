<?php

return [
    'required' => 'Pole :attribute jest wymagane.',
    'string' => 'Pole :attribute musi być tekstem.',
    'numeric' => 'Pole :attribute musi być liczbą.',
    'integer' => 'Pole :attribute musi być liczbą całkowitą.',
    'boolean' => 'Pole :attribute musi mieć wartość prawda lub fałsz.',
    'max' => [
        'string' => 'Pole :attribute nie może mieć więcej niż :max znaków.',
        'numeric' => 'Pole :attribute nie może być większe niż :max.',
    ],
    'min' => [
        'numeric' => 'Pole :attribute musi być co najmniej :min.',
        'string' => 'Pole :attribute musi mieć co najmniej :min znaków.',
    ],
    'unique' => 'Wartość pola :attribute jest już zajęta.',
    'regex' => 'Format pola :attribute jest nieprawidłowy.',
    'custom' => [
        'sku' => [
            'regex' => 'validation.sku_format',
            'unique' => 'validation.sku_unique',
        ],
    ],
    'attributes' => [
        'sku' => 'SKU',
        'stock_quantity' => 'ilość',
        'category_id' => 'kategoria usługi',
        'is_active' => 'status aktywności',
    ],
];
