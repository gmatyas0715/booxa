<?php

namespace App\Policies;

use App\Models\User;
use App\Models\EloadoMufaj;
use Illuminate\Auth\Access\Response;

class EloadoMufajPolicy
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
    public function view(User $user, EloadoMufaj $eloadoMufaj): bool
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
    public function update(User $user, EloadoMufaj $eloadoMufaj): bool
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, EloadoMufaj $eloadoMufaj): bool
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, EloadoMufaj $eloadoMufaj): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, EloadoMufaj $eloadoMufaj): bool
    {
        //
    }
}
