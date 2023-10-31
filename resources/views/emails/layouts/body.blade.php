<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="theme-color" content="#fe7900">
    <meta name="msapplication-navbutton-color" name="#fe7900">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <title>{{ config('app.name', 'Handyman') }}</title>

    <style>
        @media screen and (max-width: 980px) {
            .mail-inner-part {
                width: 80% !important;
            }
        }

        @media screen and (max-width: 680px) {
            .mail-inner-part {
                width: 100% !important;
            }
        }
    </style>
</head>
<body>
@include('emails.layouts.header.header')

<div style="display: flex!important;justify-content: center !important;" class="mail-container">
    <div class="mail-inner-part text-center" style="margin: 0 auto;">
        @yield('content')
    </div>
</div>
@include('emails.layouts.footer.footer')
</body>
</html>
