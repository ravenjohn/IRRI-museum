<?php
header('Content-type: application/xml');
$url=$_GET['url'];
$xml=file_get_contents($url);
echo $xml;
?>