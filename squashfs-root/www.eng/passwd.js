function checkpasswd(cf)
{
	for(i=0;i<cf.sysNewPasswd.value.length;i++)
	{       
		if(isValidChar_space(cf.sysNewPasswd.value.charCodeAt(i))==false)
		{
			alert("Invalid password.");
			return false;
		}
	}
	if (cf.sysNewPasswd.value.length == 33 || cf.sysConfirmPasswd.value.length == 33)
	{
		alert("Maximum password length is 32 characters!");
		return false;
	}
	if(cf.sysNewPasswd.value != cf.sysConfirmPasswd.value)
	{ 
		alert("The password you typed does not match. Please enter it again.");
		return false;	
	}
	if(cf.sysOldPasswd.value != "" && cf.sysNewPasswd.value == "")
	{
		alert("Password cannot be blank.");
		return false;
	}
	if( cf.enable_recovery.checked == true )
	{
		cf.hidden_enable_recovery.value="1";
		if( cf.question1.value == "0" || cf.question2.value == "0")
		{
			alert("Please select a question.");
			return false;
		}
	
		if( cf.answer1.value == "" || cf.answer2.value == "" )
		{
			alert("Please enter your answer for each question.");
			return false;
		}

	}
	else
	{
		if(cf.sysOldPasswd.value != "")
		{
			if(confirm("If you do not enable password recovery and forget your new password, the only way to recover the password is to reset the device to factory default. \nAre you sure you want to change the admin password without recovery option?") == false)
				return false;
		}

		cf.hidden_enable_recovery.value="0";
	}

	return true;

}
