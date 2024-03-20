<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"  content="text/html; charset=utf-8">
    <title>SZAMLA_{{ $rendeles->id }}_{{now()}}</title>
    <style>
        body {
            font-family: DejaVu Sans !important;
        }
        .ticket {
            width: 18cm; /* A4 width */
            height: 25cm; /* A4 height */
            margin: 0 auto;
            padding: 15px 20px 0 20px;
            border-radius: 10px;
            page-break-after: always; /* Start each item on a new page */
        }
        .header {
            text-align: center;
            margin-bottom: 15px;
        }
        .ar-info{
            text-align: right;
        }
        .ar-info span {
            font-weight: bold;
        }
        .megrendelo-info{
            text-align: center;
            font-weight: bold
        }
        .footer {
            margin-top: 5cm;
            text-align: center;
            display: flex;
            flex-direction: column;
        }
    </style>
</head>
<body>
    <div class="ticket">
        <div class="header">
            <h2>Számla adatok</h2>
        </div>
        <div class="ar-info">
            <ul>
            @foreach ($jegyek as $jegy)
                <p><span>- {{ $jegy['idopont'] }} - {{ $jegy['eloado'] }} - {{ $jegy['helyszin'] }} -  {{ $jegy['jegyar'] }} Ft</span> </p></li>
            @endforeach
                <p><span>- Szervizköltség: 390 Ft</span></p>
                <hr>
                <p><span>Összesen: {{ $rendeles->rendeles_osszeg }} Ft</span></p>
            </ul>
        </div>
        <div class="megrendelo-info">
            <h2>Megrendelő adatai</h2>
            <p><span>Név: {{ $rendeles->vezeteknev }} {{ $rendeles->keresztnev }}</span></p>
            <p><span>Email: {{ $rendeles->email }}</span></p>
            <p><span>Cím: {{ $teljes_cim }}</span></p>
        </div>
        <div class="footer">
            <h3>Köszönjük, hogy a Booxát választotta!</h3>
            <a href="http://localhost:4200" target="_blank"><img style="width: 10cm;margin-top:0cm" src="booxa.jpg" alt=""></a>
            <p><span>Booxa</span>©</p>
        </div>
    </div>
</body>
</html>