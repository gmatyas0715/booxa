<?php

namespace App\Policies;

use App\Models\User;
use App\Models\JegyAdatKedvezmeny;
use Illuminate\Auth\Access\Response;

class JegyAdatKedvezmenyPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, JegyAdatKedvezmeny $jegyAdatKedvezmeny): bool
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, JegyAdatKedvezmeny $jegyAdatKedvezmeny): bool
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, JegyAdatKedvezmeny $jegyAdatKedvezmeny): bool
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, JegyAdatKedvezmeny $jegyAdatKedvezmeny): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, JegyAdatKedvezmeny $jegyAdatKedvezmeny): bool
    {
        //
    }
}
