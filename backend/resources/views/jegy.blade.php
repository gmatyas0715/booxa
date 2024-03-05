<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"  content="text/html; charset=utf-8">
    <title>JEGYEK_{{ $rendeles_id }}_{{now()}}</title>
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
        .info span {
            font-weight: bold;
        }
        .info{
            margin-bottom: 3cm
        }
        .footer {
            text-align: center;
            display: flex;
            flex-direction: column;
        }
    </style>
</head>
<body>
    @foreach ($jegyek as $jegy)
    <div class="ticket">
        <div class="header">
            <h2>Jegy Információk</h2>
        </div>
        <div class="info">
            <p><span>Időpont:</span> {{ $jegy['idopont'] }}</p>
            <p><span>Előadó:</span> {{ $jegy['eloado'] }}</p>
            <p><span>Helyszín:</span> {{ $jegy['helyszin'] }}</p>
            <p><span>Helyszín cím:</span> {{ $jegy['helyszin_cim'] }}</p>
            <p><span>Szektor:</span> {{ $jegy['szektor'] }}</p>
            <p><span>Sor:</span> {{ $jegy['sor'] }} sor </p>
            <p><span>Ülőhely:</span> {{ $jegy['ulohely'] }}</p>
            <p><span>Jegyár:</span> {{ $jegy['jegyar'] }} Ft</p>
        </div>
        <div class="footer">
            <h3>Köszönjük, hogy a Booxát választotta!</h3>
            <h3>Jó szórakozást kívánunk!</h3>
            <a href="http://localhost:4200" target="_blank"><img style="width: 8cm" src="booxa.jpg" alt=""></a>
            <br>
            <img style="width: 4cm;margin-top:2cm" src="qr_kod.png" alt="">
            <p><span>Booxa</span>©</p>
        </div>
    </div>
    @endforeach
</body>
</html>