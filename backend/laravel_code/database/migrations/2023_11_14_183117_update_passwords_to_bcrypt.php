<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class UpdatePasswordsToBcrypt extends Migration
{
    public function up()
    {
        // Fetch all users with plain text passwords
        $users = DB::table('user')->get();

        foreach ($users as $user) {
            // Update each user's password to bcrypt hash
            DB::table('user')->where('id', $user->id)->update([
                'jelszo' => bcrypt($user->jelszo),
            ]);
        }
    }

    public function down()
    {
        // Reversing the operation is not necessary for this specific case
    }
}