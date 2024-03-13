<?php

namespace App\Mail;

use App\Http\Controllers\RendelesController;
use App\Models\Esemeny;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class RendelesElkuldese extends Mailable
{
    use Queueable, SerializesModels;

    public $rendeles;
    public $rendelesId;
    public $szamlaPdf;
    public $jegyekPdf;

    /**
     * Create a new message instance.
     */
    public function __construct($rendeles)
    {
        $this->rendeles = $rendeles;
        $this->rendelesId = $rendeles->id;
        $this->jegyekPdf = RendelesController::pdfJegyGeneralas($rendeles);
        $this->szamlaPdf = RendelesController::pdfSzamlaGeneralas($rendeles);
    }
    /**
    *
    * @return $this
    */
   public function build()
   {
        $jegyAdatok = $this->rendeles->jegyAdat;
        $jegyek = [];
        foreach ($jegyAdatok as $jegy) {
            $esemeny = Esemeny::find($jegy->esemeny_id);
            Log::info("". $esemeny);
            $jegyView = [
                'idopont' => $esemeny->idopont,
                'eloado' => $esemeny->eloado->nev,
                'helyszin' => $esemeny->helyszin->nev,
            ];
            $jegyek[] = $jegyView;
        }
       return $this->view('sikeres-rendeles')->with([
           'rendeles' => $this->rendeles, 'jegyek'=> $jegyek
       ])->attachData($this->jegyekPdf->output(), 'JEGYEK_'.$this->rendelesId.'_'.now().'.pdf', [
        'mime' => 'application/pdf',
        ])->attachData($this->szamlaPdf->output(), 'SZAMLA_'.$this->rendelesId.'_'.now().'.pdf', [
        'mime' => 'application/pdf']);
   }
}
