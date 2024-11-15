<?php

namespace Database\Factories;

use App\Models\Event;
use Illuminate\Console\Scheduling\Event as SchedulingEvent;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class EventFactory extends Factory
{
    // Specify the corresponding model
    protected $model = SchedulingEvent::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => \App\Models\User::factory(), // Assuming each event belongs to a user
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'event_date' => $this->faker->dateTimeBetween('now', '+1 year'),
        ];
    }
}
