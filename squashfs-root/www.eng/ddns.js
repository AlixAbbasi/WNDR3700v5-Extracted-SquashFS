function click_ddns(form)
{
	if (form.sysDNSActive.checked)
		form.ddns_enabled.value = "1";
	else
		form.ddns_enabled.value = "0";

	if(ddns_wildcards_flag == 1)
	{
		if (form.sysDNSWildCard.checked)
			form.wildcards_enabled.value="1";
		else
			form.wildcards_enabled.value="0";
	}

	if (form.sysDNSActive.checked)
	{
		if(form.sysDNSHost.value=="")
		{
			alert("Host name can not be blank.");
			return false;
		}
		if(form.sysDNSUser.value=="")
		{
			alert("User name cannot be blank.");
			return false;
		}
		if(form.sysDNSPassword.value=="")
		{
			alert("Password cannot be blank.");
			return false;
		}
	}
	for (i=0;i<form.sysDNSHost.value.length;i++)
	{
		if(isValidDdnsHost(form.sysDNSHost.value.charCodeAt(i))==false)
		{
			alert("Invalid host name.");
			return false;
		}
	}
	for (i=0;i<form.sysDNSUser.value.length;i++)
	{
		if(isValidChar_space(form.sysDNSUser.value.charCodeAt(i))==false)
		{
			alert("Invalid user name.");
			return false;
		}
	}
	for (i=0;i<form.sysDNSPassword.value.length;i++)
	{
		if(isValidChar_space(form.sysDNSPassword.value.charCodeAt(i))==false)
		{
			alert("Invalid password.");
			return false;
		}
	}
	if (old_endis_ddns != form.ddns_enabled.value || old_sysDNSHost != form.sysDNSHost.value || old_sysDNSUser != form.sysDNSUser.value || old_sysDNSPassword !=  form.sysDNSPassword.value || old_endis_wildcards != form.wildcards_enabled.value)
		form.change_wan_type.value=0;
	else
		form.change_wan_type.value=1;

	return true;
}
