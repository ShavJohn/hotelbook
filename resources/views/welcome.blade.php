<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <meta name="keywords" content="hotel, rooms, guesthouses">

        <meta name="theme-color" content="#375d89">
        <meta name="msapplication-navbutton-color" name="#375d89">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

        @if(get_meta_title())
            <title>{{ get_meta_title() }}</title>
        @else
            <title>{{ config('app.name', 'HotelBook') }}</title>
        @endif

        @if(get_meta_desc())
            <meta name="description" content="{{ get_meta_desc() }}">
        @endif
        @if(get_logo())
            <link rel="icon" href="{{ url('/') . get_logo() }}">
        @endif

        <link href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        <!-- Styles -->
        <link href="{{ mix('/css/app.css') }}" rel="stylesheet">
    </head>
    <body>
    <div id="app">
        <App></App>
    </div>
    <script src="{{ mix('/js/app.js') }}"></script>
    </body>
</html>
