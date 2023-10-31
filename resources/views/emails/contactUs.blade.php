@extends('emails.layouts.body')
@section('content')
    <div class="margin-top">
        <b>Message from</b>
        <span>{{ $name }}</span>
    </div>
    <div class="margin-top">
        <b>Users Email</b>
        <span>{{ $email }}</span>
    </div>
    @if($phone_number)
        <div class="margin-top">
            <b>Users Phone</b>
            <span>{{ $phone_number  }}</span>
        </div>
    @endif
    <div style="margin-top: 30px" class="text-left">
        <b>User message:</b>
    </div>
    <p style="margin-top: 15px" class="text-center">{{ $message  }}</p>

@endsection
