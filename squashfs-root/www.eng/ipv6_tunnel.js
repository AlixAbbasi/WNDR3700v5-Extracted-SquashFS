function setRemote()
{
	var cf = document.forms[0];
	var i;
	for( i=0; i<cf.Romte_IP.length; i++)
	{
		if( cf.remote[0].checked == true )
		{
			cf.Romte_IP[i].disabled = true;
		}
		else if( cf.remote[1].checked == true )
		{
			cf.Romte_IP[i].disabled = false;
		}
	}
}	

function check_ipv6_6to4(cf)
{
	var i;

	if(internet_basic_type == 0)	//not dhcp
	{	
		if((internet_ppp_type == 0) || (internet_ppp_type == 1))	//(pptp, 1),(pppoe, 0)
		{
			if(confirm("6to4 Tunnel requires the IPv4 PPPoE/PPTP connection mode to be \"Always On\", other connection modes (\"Dial on Demand\" and \"Manually Connect\") will become unavailable. Please confirm the change.") == false)
			{
				return false;
			}	
		}
	}

	/* Remote 6to4 Relay Router */
	if(cf.remote[1].checked == true)
	{
		cf.ipv6_hidden_6to4_relay.value = "";
		for( i=0; i<cf.Romte_IP.length; i++)
		{
			if( i < (cf.Romte_IP.length-1) )
			{
				cf.ipv6_hidden_6to4_relay.value = cf.ipv6_hidden_6to4_relay.value + cf.Romte_IP[i].value + ".";
			}
			else if( i == (cf.Romte_IP.length-1) )
			{
				cf.ipv6_hidden_6to4_relay.value = cf.ipv6_hidden_6to4_relay.value + cf.Romte_IP[i].value;
			}
		}
		if( checkipaddr(cf.ipv6_hidden_6to4_relay.value) == false )
		{
			alert("Invalid IP address. Please enter it again.");
			return false;
		}
	}
	else
		cf.ipv6_hidden_6to4_relay.value = ipv6_6to4_relay_ip;
	
	if( ipv6_save_common(cf) == false )
	{
		return false;
	}
	return true;
}

