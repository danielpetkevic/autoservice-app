<?php

namespace App\Enums;

enum UserRole: string
{
    case ADMIN = 'admin';
    case MECHANIC = 'mechanic';
    case CLIENT = 'client';
}
