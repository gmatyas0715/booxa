<?php

namespace App\Policies;

use App\Models\UserModel;
use App\Models\jegy_adat_rendeles;
use Illuminate\Auth\Access\Response;

class JegyAdatRendelesPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(UserModel $userModel): bool
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(UserModel $userModel, jegy_adat_rendeles $jegyAdatRendeles): bool
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(UserModel $userModel): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(UserModel $userModel, jegy_adat_rendeles $jegyAdatRendeles): bool
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(UserModel $userModel, jegy_adat_rendeles $jegyAdatRendeles): bool
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(UserModel $userModel, jegy_adat_rendeles $jegyAdatRendeles): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(UserModel $userModel, jegy_adat_rendeles $jegyAdatRendeles): bool
    {
        //
    }
}
