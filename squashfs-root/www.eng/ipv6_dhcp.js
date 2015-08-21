function check_ipv6_dhcp(cf)
{
	for(i=0;i<cf.userClass.value.length;i++)
	{
		if(isValidChar(cf.userClass.value.charCodeAt(i))==false)
		{
			alert("Invalid account name.");
			return false;
		}
	}

	for(i=0;i<cf.domainName.value.length;i++)
	{
		if(isValidDdnsHost(cf.domainName.value.charCodeAt(i))==false)
		{
			alert("Invalid domain name.");
			return false;
		}
	}

	if( ipv6_save_common(cf) == false )
        {
                return false;
        }
	else
	{
        	return true;
	}
}
