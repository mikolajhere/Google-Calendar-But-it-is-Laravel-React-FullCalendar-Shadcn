<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Assuming each user has events
        \App\Models\User::all()->each(function ($user) {
            Event::factory()->count(5)->create(['user_id' => $user->id]);
        });
    }
}
