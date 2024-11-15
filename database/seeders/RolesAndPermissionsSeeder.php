<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles
        $adminRole = Role::create([
            'name' => 'Administrator',
            'slug' => 'admin',
            'description' => 'Full access to all features'
        ]);

        $editorRole = Role::create([
            'name' => 'Editor',
            'slug' => 'editor',
            'description' => 'Manage content and posts'
        ]);

        // Create permissions
        $createPosts = Permission::create([
            'name' => 'Create Posts',
            'slug' => 'create-posts',
            'group' => 'content'
        ]);

        $editPosts = Permission::create([
            'name' => 'Edit Posts',
            'slug' => 'edit-posts',
            'group' => 'content'
        ]);

        // Assign permissions to roles
        $adminRole->syncPermissions([$createPosts, $editPosts]);
        $editorRole->syncPermissions([$createPosts]);
    }
}
