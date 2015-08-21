var error_email_addr="Error: Invalid e-mail address.";
var user_name_error="Invalid user name.";
var user_name_null="User name cannot be blank.";
var password_error="Invalid password.";
var password_null="Password cannot be blank.";

function setGray(cf,click)
{
	if(cf.email_notify.checked)
	{

		cf.block_site.disabled = false;
		cf.email_smtp.disabled = false;
		cf.email_addr.disabled = false;
		cf.cfAlert_Select.disabled = false;
		cf.smtp_auth.disabled = false;
		
		if( click == 1 )
			cf.block_site.checked = true;
	}
	else
	{
		cf.block_site.disabled = true;
		cf.email_smtp.disabled = true;
		cf.email_addr.disabled = true;
		cf.cfAlert_Select.disabled = true;
		cf.smtp_auth.disabled = true;
		cf.cfAlert_Day.disabled = true;
		cf.cfAlert_Hour.disabled = true;
		cf.cfAlert_am[0].disabled = true;
		cf.cfAlert_am[1].disabled = true;

	}
	setAuth(cf)
}

function setAuth(cf)
{
	if(cf.email_notify.checked)
	{
		if(cf.smtp_auth.checked == true)
		{
			cf.auth_user.disabled = false;
			cf.auth_pwd.disabled = false;
		}
		else
		{
			cf.auth_user.disabled = true;
			cf.auth_pwd.disabled = true;
		}
	}
	else
	{
		cf.auth_user.disabled = true;
		cf.auth_pwd.disabled = true;
	}
}

function change_type(check,cf)
{
	if(check == 0)
		cf.email_this_addr.disabled =true;
	else
		cf.email_this_addr.disabled =false;
}

function disable_am(disable_flag,cf)
{
	cf.cfAlert_am[0].disabled = disable_flag;
	cf.cfAlert_am[1].disabled = disable_flag;
}

function OnAlertChange(cf)
{
	var index = cf.cfAlert_Select.selectedIndex;
	if ( (index == 0) || (index == 1) || (index == 4) )
	{
		cf.cfAlert_Day.selectedIndex = 0;
		cf.cfAlert_Hour.selectedIndex= 0;
		cf.cfAlert_Day.disabled = true;
		cf.cfAlert_Hour.disabled = true;
		AlertTimeDisabled = true;
		AlertHourDisabled = true;
		disable_am(true,cf);
	}
	else if(index == 2) // daily
	{
		cf.cfAlert_Day.selectedIndex = 0;
		cf.cfAlert_Day.disabled = true;
		cf.cfAlert_Hour.disabled = false;
		AlertTimeDisabled = true;
		AlertHourDisabled = false;
		disable_am(false,cf);
	}
	else if(index == 3) // weekly
	{
		cf.cfAlert_Day.disabled = false;
		cf.cfAlert_Hour.disabled = false;
		AlertTimeDisabled = false;
		AlertHourDisabled = false;
		disable_am(false,cf);
	}
}

function check_email(cf)
{
	if (cf.email_notify.checked) 
	{
		cf.email_notify_enabled.value = "1";
        for(i=0;i<cf.email_smtp.value.length;i++)
		{
			if(isValidChar(cf.email_smtp.value.charCodeAt(i))==false)
			{
				alert("Error: Invalid SMTP server address.");
				cf.email_smtp.focus();
			        return false;
			}
		}
		if( cf.email_smtp.value == "" )
		{
			alert("Error: Invalid SMTP server address.");
			cf.email_smtp.focus();
			return false;
		}	
		for(i=0;i<cf.email_addr.value.length;i++)
		{
			if(isValidChar(cf.email_addr.value.charCodeAt(i))==false)
			{
				alert("Error: Invalid e-mail address.");
				cf.email_addr.focus();	
				return false;
			}
		}
		if(cf.email_addr.value.indexOf("@", 0) == -1 || cf.email_addr.value.indexOf(".", 0) == -1)
		{
			alert("Error: Invalid e-mail address.");
			cf.email_addr.focus();
			return false;
		}
	
		if(cf.smtp_auth.checked == true)
		{	
			for(i=0;i<cf.auth_user.value.length;i++)
			{
				if(isValidChar(cf.auth_user.value.charCodeAt(i))==false)
				{
					alert("Invalid user name.");
					return false;
				}
			}
			for(i=0;i<cf.auth_pwd.value.length;i++)
			{
				if(isValidChar(cf.auth_pwd.value.charCodeAt(i))==false)
				{
					alert("Invalid password.");
					return false;
				}
			}
			if(cf.auth_user.value=="")
			{
				alert("User name cannot be blank.");
				return false;
			}
			if(cf.auth_pwd.value=="")
			{
				alert("Password cannot be blank.");
				return false;
			}
			cf.email_endis_auth.value=1;
		}
		else {
			cf.email_endis_auth.value=0;
		}
	}
	else 
	{
		cf.email_notify_enabled.value = "0";	
		if(cf.smtp_auth.checked == true)
			cf.email_endis_auth.value=1;
		else
			cf.email_endis_auth.value=0;
	}
		if(cf.block_site.checked)
			cf.send_alert_immediately.value = "1";
		else
			cf.send_alert_immediately.value = "0";

		if(cf.cfAlert_Select.selectedIndex == 2)// daily
		{
			if(cf.cfAlert_am[1].checked) 
				cf.schedule_hour.value = parseInt(cf.cfAlert_Hour.value) + 12;
			else
				cf.schedule_hour.value = parseInt(cf.cfAlert_Hour.value);
		}
		if(cf.cfAlert_Select.selectedIndex == 3) // weekly
		{
			if(cf.cfAlert_am[1].checked) 
				cf.schedule_hour.value = parseInt(cf.cfAlert_Hour.value) + 12;
			else
				cf.schedule_hour.value = parseInt(cf.cfAlert_Hour.value);	
		}
		cf.email_addr_hid.value = cf.email_addr.value;
	cf.email_smtp_hid.value = cf.email_smtp.value;
	cf.auth_user_hid.value = cf.auth_user.value;
	cf.auth_pwd_hid.value = cf.auth_pwd.value;
	cf.cfAlert_Select_hid.value = cf.cfAlert_Select.value;
	cf.cfAlert_Day_hid.value = cf.cfAlert_Day.value;
	return true;
}
