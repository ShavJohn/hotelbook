<?php

use Illuminate\Http\Request;
use App\Models\GeneralSettings;

if (!function_exists('get_logo')) {
    /**
     * @return string
     */
    function get_logo(): string
    {
        $logoPath = GeneralSettings::where('key', 'logo')->first();
        if ($logoPath && $logoPath->value) {
            return '/storage/' . $logoPath->value;
        }
        return '';
    }
}

if (!function_exists('get_meta_title')) {
    /**
     * @return string
     */
    function get_meta_title(): string
    {
        $metaTitle = GeneralSettings::where('key', 'metaTitle')->first();
        if ($metaTitle && $metaTitle->value) {
            return $metaTitle->value;
        }
        return '';
    }
}

if (!function_exists('get_meta_desc')) {
    /**
     * @return string
     */
    function get_meta_desc(): string
    {
        $metaDesc = GeneralSettings::where('key', 'metaDesc')->first();
        if ($metaDesc && $metaDesc->value) {
            return $metaDesc->value;
        }
        return '';
    }
}

if (!function_exists('get_company_name')) {
    /**
     * @return string
     */
    function get_company_name(): string
    {
        $companyName = GeneralSettings::where('key', 'companyName')->first();
        if ($companyName && $companyName->value) {
            return $companyName->value;
        }
        return '';
    }
}
