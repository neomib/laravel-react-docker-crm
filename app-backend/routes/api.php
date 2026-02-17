<?php
Route::get('/test-api', function (Request $request) {
    return json_encode(array(
        'status' => false,
        'message' => 'test'
    ));
});