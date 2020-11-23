<?php
$email=$_POST["email"];
$password1=$_POST["passwd1"];
$password2=$_POST["passwd2"];

if($password1 != $password2)
 echo 'Password Mismatch. Retype again please. <a href = "hospital register.html"><INPUT TYPE = "submit" NAME = "create" VALUE = "Go back"></a>';
else if($password1 == $password2)
	echo 'Account has created. <a href = "hospital login.html"><INPUT TYPE = "submit" NAME = "create" VALUE = "OK"></a>';
?>