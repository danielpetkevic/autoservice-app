<?php

return [
    'required' => 'Laukas :attribute yra privalomas.',
    'string' => 'Laukas :attribute turi būti tekstas.',
    'numeric' => 'Laukas :attribute turi būti skaičius.',
    'integer' => 'Laukas :attribute turi būti sveikasis skaičius.',
    'boolean' => 'Laukas :attribute turi būti teisingas arba klaidingas.',
    'max' => [
        'string' => 'Laukas :attribute negali būti ilgesnis nei :max simbolių.',
        'numeric' => 'Laukas :attribute negali būti didesnis nei :max.',
    ],
    'min' => [
        'numeric' => 'Laukas :attribute turi būti ne mažesnis nei :min.',
        'string' => 'Laukas :attribute turi būti bent :min simbolių.',
    ],
    'unique' => 'Laukas :attribute jau naudojamas.',
    'regex' => 'Lauko :attribute formatas neteisingas.',
    'custom' => [
        'sku' => [
            'regex' => 'validation.sku_format',
            'unique' => 'validation.sku_unique',
        ],
    ],
    'attributes' => [
        'sku' => 'SKU',
        'stock_quantity' => 'kiekis',
        'category_id' => 'paslaugų kategorija',
        'is_active' => 'aktyvumo būsena',
    ],
];
