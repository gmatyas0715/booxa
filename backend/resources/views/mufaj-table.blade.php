<div class="container">
    <div class="row">
        <div class="col d-flex justify-content-center align-items-center">
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>név</th>
                        <th>leírás</th>
                        <th>módosítás</th>
                        <th>törlés</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($mufajok as $mufaj)
                        <tr>
                            <td>{{ $mufaj->id }}</td>
                            <td>{{ $mufaj->nev }}</td>
                            <td>{{ $mufaj->leiras }}</td>
                            <td>
                                <form method="POST" action="/mufajok-update/{{ $mufaj->id }}" style="display: inline;">
                                    @csrf
                                    @method('UPDATE')
                                    <button type="submit" onclick="return confirm('Véglegesíted a szerkesztést?')">Szerkesztés</button>
                                </form>  
                            </td>
                            <td>
                                <form method="POST" action="/mufajok-delete/{{ $mufaj->id }}" style="display: inline;">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" onclick="return confirm('Biztosan kitörlöd a műfajt?')">Törlés</button>
                                </form>                  
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            <button>Új műfaj hozzáadása</button>
        </div>
    </div>
</div>
