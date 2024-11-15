<?php

use App\Models\Role;
use App\Models\Permission;

Role::create(['name' => 'Administrator', 'slug' => 'admin']);
Role::create(['name' => 'Editor', 'slug' => 'editor']);

Permission::create(['name' => 'Edit Posts', 'slug' => 'edit-posts']);
Permission::create(['name' => 'Delete Posts', 'slug' => 'delete-posts']);
