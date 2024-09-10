<?php

namespace Database\Seeders;

use App\Models\Visit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VisitsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run() {
        Visit::factory()->count(10)->create();
    }
}
