function checkwan()
{
	var cf = document.forms[0];
	cf.hid_iptv_show_tag.value=have_bridge_iptv;
	cf.wan_mtu.value = parseInt(cf.wan_mtu.value, 10);
	if(basic_type == "1")
	{
		if(!((cf.wan_mtu.value<=1500)&&(cf.wan_mtu.value>=616)))
		{
			alert("Invalid MTU value, valid range is 616 to"+"1500");
			return false;
		}
	}
	else if(ppp_login_type == "0" || ppp_login_type == "3")
	{
		if(!((cf.wan_mtu.value<=1492)&&(cf.wan_mtu.value>=616)))
		{
			alert("Invalid MTU value, valid range is 616 to"+"1492");
			return false;
		}	
	}
	else if(ppp_login_type == "1" )
	{
		if(!((cf.wan_mtu.value<=1450)&&(cf.wan_mtu.value>=616)))
		{
			alert("Invalid MTU value, valid range is 616 to"+"1450");
			return false;
		}
	}
	else
	{
		if(!((cf.wan_mtu.value<=1500)&&(cf.wan_mtu.value>=616)))
		{
			alert("Invalid MTU value, valid range is 616 to"+"1500");
			return false;
		}

	}
	if (cf.bri_lan1.checked == true)
		cf.hid_bri_lan1.value = 1;
	else
		cf.hid_bri_lan1.value = 0;	
	if (cf.bri_lan2.checked == true)
		cf.hid_bri_lan2.value = 1;
	else
		cf.hid_bri_lan2.value = 0;
	if (cf.bri_lan3.checked == true)
		cf.hid_bri_lan3.value = 1;
	else
		cf.hid_bri_lan3.value = 0;	
	if (cf.bri_lan4.checked == true)
		cf.hid_bri_lan4.value = 1;
	else
		cf.hid_bri_lan4.value = 0;

	cf.hid_iptv_mask.value=parseInt(cf.hid_bri_lan1.value)+parseInt(cf.hid_bri_lan2.value*2)+parseInt(cf.hid_bri_lan3.value*4)+parseInt(cf.hid_bri_lan4.value*8);
 	
	if (cf.brig_ssid1.checked == true)
		cf.hid_brig_ssid1.value = 1;
	else
		cf.hid_brig_ssid1.value = 0;
	if (cf.brig_ssid2.checked == true)
		cf.hid_brig_ssid2.value = 1;
	else
		cf.hid_brig_ssid2.value = 0;
	if (cf.brig_guest_ssid1.checked == true)
		cf.hid_brig_guest_ssid1.value = 1;
	else
		cf.hid_brig_guest_ssid1.value = 0;
	if (cf.brig_guest_ssid2.checked == true)
		cf.hid_brig_guest_ssid2.value = 1;
	else
		cf.hid_brig_guest_ssid2.value = 0;
		
	if (cf.disable_spi.checked == false)
		cf.spi_value.value = 1;
	else
		cf.spi_value.value = 0;
	cf.dmz_ip.value = cf.dmzip1.value + '.' + cf.dmzip2.value + '.' + cf.dmzip3.value + '.' + cf.dmzip4.value; //store the value of dmzip at any time
	if (cf.dmz_enable.checked == true)
	{
		cf.dmz_value.value = 1;
		//cf.dmz_ip.value = cf.dmzip1.value + '.' + cf.dmzip2.value + '.' + cf.dmzip3.value + '.' + cf.dmzip4.value; 
		if(checkipaddr(cf.dmz_ip.value)==false || is_sub_or_broad(cf.dmz_ip.value, lan_ip, lan_mask) == false)
		{
			alert("Invalid IP address. Please enter it again.");
			return false;
		}
		cf.dmz_ip.value = address_parseInt(cf.dmz_ip.value);
		if(isSameIp(lan_ip,cf.dmz_ip.value) == true)
		{
			alert("The DMZ IP address should not be the same as the LAN IP address.");
			return false;
		}
		if(isSameSubNet(cf.dmz_ip.value,lan_mask,lan_ip,lan_mask) == false)
                {
                        alert("This IP address should be in the same subnet as the LAN IP address.");
                        return false;
                }
	}
	else
		cf.dmz_value.value = 0;
	if (cf.rspToPing.checked == true)
		cf.rspToPing_value.value = 1;
	else
		cf.rspToPing_value.value = 0;

	if (cf.disable_sipalg.checked == true)
		cf.sipalg_value.value = 1;
	else
		cf.sipalg_value.value = 0;
        if( have_igmp == 1 )
        {
                if (cf.disable_igmp.checked == true)
                        cf.igmp_value.value = 0;
                else
                        cf.igmp_value.value = 1;
        }

	return true;
}

function checkdmzip()
{
	var cf = document.forms[0];
	if(!cf.dmz_enable.checked)
	{
		cf.dmzip1.disabled = true;
		cf.dmzip2.disabled = true;
		cf.dmzip3.disabled = true;
		cf.dmzip4.disabled = true;
	}
	else
	{
		cf.dmzip1.disabled = false;
		cf.dmzip2.disabled = false;
		cf.dmzip3.disabled = false;
		cf.dmzip4.disabled = false;
	}
}

