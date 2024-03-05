<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sikeres rendelés!</title>
</head>
<style>
    body{
        font-family: Arial, Helvetica, sans-serif;
        text-align: center;
    }
</style>
<body>

    <h2>Kedves {{ $rendeles->keresztnev }}!</h2>

    <p>Örömmel értesítünk, hogy rendelésed sikeresen rögzítésre került.</p>
    <p style="font-weight: bold">A jegyeid és a számla letölthető a mellékletben.</p>

    <h3>Rendelés részletei:</h3>
    <p>Rendelésazonosító: {{$rendeles->id}}</p>
    <p>Vásárolt jegyek:</p>
        @foreach($jegyek as $jegy)
            <p>{{ $jegy['idopont'] }} - {{ $jegy['eloado'] }} - {{ $jegy['helyszin'] }}</p>
        @endforeach
    <p style="font-weight: bold; margin-top:60px">Köszönjük, hogy a Booxát választottad!</p>

    <p>Üdvözlettel,<br>
    <a href="http://localhost:4200" target="_blank"><img style="width: 200px" src="{{ asset('booxa.jpg') }}" alt="booxa_logo"></a>
    <br>
    <br>
    <p style="font-size: 15px"><span>Booxa</span>©</p>

</body>
</html>
