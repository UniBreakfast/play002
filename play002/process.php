<?php
ini_set('display_errors', 1);
error_reporting(E_PARSE | E_ERROR);
mb_internal_encoding('UTF-8');
date_default_timezone_set('Europe/Kiev');

require_once $_SERVER['DOCUMENT_ROOT'].'sbdb.php';

//echo 'Jeronimo!';

$creds    = array();
$updates  = array();
$data     = array();
$message  = array();
$settings = array('option1'=>true, 'option2'=>false);
$response = array('creds'=>$creds, 'data'=>$data, 'cfg'=>$settings,
                  'msg'=>$message, 'upd'=>$updates);
echo json_encode($response);

?>
