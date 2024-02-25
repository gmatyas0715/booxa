<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\UpdateuserRequest;
use DateTime;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function index()
    {
        $user = User::select('id','vezeteknev','keresztnev','email','nem','szuletesi_datum','username')->get();

        foreach($user as $eachUser){
            $eachUser->setAttribute('szerep',$eachUser->getRoleNames()[0]);
        }
        return response()->json($user);
    }

    public function show(User $user)
    {
        $userInfo = $user->only(['vezeteknev','keresztnev','email','szuletesi_datum','username']);
        return response()->json($userInfo);
    }

    public function userFelhasznalonevek(){
        $felhasznalonevek = User::select('username','email')->get();

        foreach ($felhasznalonevek as $item) {
            $organizedResult['username'][] = $item->username;
            $organizedResult['email'][] = $item->email;
        }

        return $organizedResult;

    }

    public function update(UpdateUserRequest $request, User $user)
    {

        switch ($request->form_tipus) {
            case 'belepesAdatForm':
                $this->belepesAdatCheck($request,$user);
                break;

            case 'emailForm':
                $this->emailCheck($request,$user);
                break;

            case 'szemelyesAdatForm':
                $this->szemelyesAdatCheck($request,$user);
                break;
        }
        $data = $user->toArray();
        unset($data['password']);
        unset($data['email_verified_at']);
        unset($data['created_at']);
        unset($data['updated_at']);
        unset($data['id']);
        unset($data['nem']);

        $user->save();
        return response()->json(['msg'=>'Sikeres profilmódosítás!','user_adatok'=>$data],200);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['msg'=>$user->felhasznalonev.', sikeresen törölted a fiókodat!']);
    }

    public function belepesAdatCheck(UpdateUserRequest $request, User $user) {

        if ($request->felhasznalonev=="" && $request->uj_jelszo==""){
            return response()->json(['msg'=>'Nincs módosítandó adat.'],400);
        }

        $validator = Validator::make($request->only('felhasznalonev', 'jelszo'), [
            'felhasznalonev'=>'sometimes|min:3|unique:user,felhasznalonev|string',
            'uj_jelszo'=>'sometimes|string|min:8|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/'
        ]);

        if ($validator->fails()){
            return response()->json(['msg'=>'A megadott felhasználónév/jelszó nem felel meg a követelményeknek!'],400);
        } 

        if ($request->uj_jelszo!=""){
            if ($user && Hash::check($request['jelszo'], $user->password)){
                return response()->json(['msg'=>'A megadott jelenlegi jelszó nem megfelelő.'],400);
            }

            if ($request->uj_jelszo!=$request->uj_jelszo_megerosites){
                return response()->json(['msg'=>'Az új jelszó és jelszó megerősítés nem egyezik meg.'],400);
            }
        }
        
        if ($request->filled('felhasznalonev')) {
            $user->username = $request->felhasznalonev;
        }
        
        if ($request->filled('uj_jelszo')) {
            $user->password = $request->uj_jelszo;
        }
    }

    public function emailCheck(UpdateUserRequest $request, User $user) {

        if ($request->email==""){
            return response()->json(['msg'=>'Nincs módosítandó adat.'],400);
        }

        $validator = Validator::make($request->only('email'), [
            'email'=>'email|unique:user,email|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/',
        ]);

        if ($validator->fails()){
            return response()->json(['msg'=>'A megadott email nem megfelelő formátumú!'],400);
        } 

        if ($request->email!=$request->email_megerosites){
            return response()->json(['msg'=>'Az új email és email megerősítés nem egyezik meg.'],400);
        }

        $user->email = $request->email;
    }

    public function szemelyesAdatCheck(UpdateUserRequest $request, User $user) {

        if ($request->vezeteknev=="" && $request->keresztnev=="" && $request->szuletesi_datum==""){
            return response()->json(['error'=>'Nincs módosítandó adat.'],400);
        }

        if ($request->szuletesi_datum!=""){
            $datumMost = new DateTime('now');
            $szuletesi_datum = new DateTime($request->szuletesi_datum);
            $korEvben = $datumMost->diff($szuletesi_datum);

            if ($korEvben->y<18){
                return response()->json(['msg'=>'A felhasználó minimun életkora 18 év!'],400);
            }
        }

        if ($request->filled('vezeteknev')) {
            $user->vezeteknev = $request->vezeteknev;
        }

        if ($request->filled('keresztnev')) {
            $user->keresztnev = $request->keresztnev;
        }

        if ($request->filled('szuletesi_datum')) {
            $user->szuletesi_datum = $request->szuletesi_datum;
        }
    }
}
