<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReplyToCustumerMessage extends Mailable
{
    use Queueable, SerializesModels;


    protected $data;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;
        $this->afterCommit();
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build(): static
    {
        $mailData = $this->data;

        return $this
            ->from(config('mail.from.address'), config('mail.from.name'))
            ->subject('Reply from ' . config('mail.from.name'))
            ->markdown('emails.replyToCustomerMessage')
            ->with($mailData);
    }
}
