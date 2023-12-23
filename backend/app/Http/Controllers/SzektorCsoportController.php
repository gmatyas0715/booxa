<?php

namespace App\Http\Controllers;

use App\Models\SzektorCsoport;
use App\Http\Requests\StoreSzektorCsoportRequest;
use App\Http\Requests\UpdateSzektorCsoportRequest;

class SzektorCsoportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $szektorcsoportok = SzektorCsoport::with('szektor')->get();
        return response()->json($szektorcsoportok);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSzektorCsoportRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(SzektorCsoport $szektorcsoport)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SzektorCsoport $szektorcsoport)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSzektorCsoportRequest $request, SzektorCsoport $szektorcsoport)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SzektorCsoport $szektorcsoport)
    {
        //
    }
}
