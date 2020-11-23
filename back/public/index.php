<?php
    $text=$_POST["passwd1"];
	$role=$_POST["doctor"];
	$role=$_POST["patient"];
     if(strlen($text) < 5)
	    echo 'Password Mismatch. Try again please <a href= "hospital login.html">here</a>';
     else if (strlen($text) >= 5 && $role == "doctor")
	    echo 'Login success. <a href = "doctor_home.html"><INPUT TYPE = "submit" NAME = "create" VALUE = "OK"></a>'
	 else if (strlen($text) >= 5 && $role == "patient")
		echo 'Login success. <a href = "patient_home.html"><INPUT TYPE = "submit" NAME = "create" VALUE = "OK"></a>'
?>
