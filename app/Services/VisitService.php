<?php

namespace App\Services;

use App\Models\Visit;
use Illuminate\Support\Facades\DB;

class VisitService
{
    public function list(?int $userId)
    {
        return Visit::where('user_id', $userId)->orderBy('created_at')->get();
    }

    public function getById(int $id)
    {
        return Visit::where('id', $id)->first();
    }

    public function store(array $data): void
    {
        Visit::create($data);
    }

    public function update(int $id, array $data): void
    {
        $visit = $this->getById($id);
        if (!$visit) return;
        $visit->update($data);
    }

    public function delete(int $id): void
    {
        $visit = $this->getById($id);
        if (!$visit) return;
        $visit->delete();
    }
}
