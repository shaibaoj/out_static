<?php
header("content-Type: text/html; charset=UTF-8");

$target=$ori_link;

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html><head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Cache-Control" content="no-cache">
<meta http-equiv="Expires" content="0">
<title></title>
<script type="text/javascript">
function funtz(){   
	// var u='<?php echo $target ?>';   
	// location.replace(u);
	var real_jump_address='<?php echo $target ?>';  
	if (!window.attachEvent) {
        document.write('<input style="display:none" type="button" id="exe" value="" onclick="window.location=\'' + real_jump_address + '\'">');
        document.getElementById('exe').click();
    } else {
        document.write('<a style="display:none" href="' + real_jump_address + '" id="exe"></a>');
        document.getElementById('exe').click();
    }
}
setTimeout(funtz,1);
</script>
<noscript>
<meta http-equiv="refresh" content="0;url=<?php echo $target ?>">
</noscript>
</head><body></body></html>