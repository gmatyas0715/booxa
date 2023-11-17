<?php

namespace App\Policies;

use App\Models\UserModel;
use App\Models\eloado_mufaj;
use Illuminate\Auth\Access\Response;

class EloadoMufajPolicy
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
    public function view(UserModel $userModel, eloado_mufaj $eloadoMufaj): bool
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
    public function update(UserModel $userModel, eloado_mufaj $eloadoMufaj): bool
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(UserModel $userModel, eloado_mufaj $eloadoMufaj): bool
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(UserModel $userModel, eloado_mufaj $eloadoMufaj): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(UserModel $userModel, eloado_mufaj $eloadoMufaj): bool
    {
        //
    }
}
