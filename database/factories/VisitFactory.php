<?php

namespace Database\Factories;

use App\Models\Visit;
use App\Models\User; // Assuming you have a User model
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class VisitFactory extends Factory
{
    protected $model = Visit::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::factory(), // Generates a new user if you want to create users along with visits
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
