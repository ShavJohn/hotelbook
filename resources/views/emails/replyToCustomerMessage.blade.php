@extends('emails.layouts.body')
@section('content')
    <div class="margin-top">
        <span>Hello dear</span>
        <b>{{ $messageSelected['name'] }}</b>
    </div>
    <div class="margin-top">
        <b>{{ $replyData['title'] }}</b>
    </div>
    <p style="margin-top: 15px" class="text-center">{{ $replyData['message'] }}</p>
@endsection
