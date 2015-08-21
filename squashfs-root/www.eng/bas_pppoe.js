function show_hidden_help_top_button(help_flag)
{
	if(!isIE_or_Opera())
		Not_IE_show_hidden_help(help_flag);
	else
	{
		var frame_height= top.document.getElementById("formframe_div").style.height.replace(/px/,"");
		if( help_flag % 2 == 0 )
		{
			document.getElementById("main").style.height=frame_height-285;//30+120+135
			document.getElementById("help").style.display="";
			document.getElementById("help_switch").className="open_help";
		}
		else
		{
			document.getElementById("help").style.display="none";
			document.getElementById("help_switch").className="close_help";
			document.getElementById("main").style.height=frame_height-165;//30+135
		}
	}
}

function myip_update()
{
    var cf = document.forms[0];

    if((cf.myip_1.value.length>0)&&(cf.myip_2.value.length>0)&&(cf.myip_3.value.length>0)&&(cf.myip_4.value.length>0))
    {
        setDisabled(false, cf.mymask_1, cf.mymask_2, cf.mymask_3, cf.mymask_4);
    }
    else
    {
       	setDisabled(true, cf.mymask_1, cf.mymask_2, cf.mymask_3, cf.mymask_4);
    }

}
function setIP(cf,page)
{
	var dflag = cf.WANAssign[0].checked;
	setDisabled(dflag,cf.WPethr1,cf.WPethr2,cf.WPethr3,cf.WPethr4);

	if(russian_pppoe_flag == 1 && gui_region == "Russian" && page == "bas" )
		setDisabled(dflag,cf.WMask1,cf.WMask2,cf.WMask3,cf.WMask4);
        DisableFixedIP = dflag;
}

function setDNS(cf)
{
	var dflag = cf.DNSAssign[0].checked;
	setDisabled(dflag,cf.DAddr1,cf.DAddr2,cf.DAddr3,cf.DAddr4,cf.PDAddr1,cf.PDAddr2,cf.PDAddr3,cf.PDAddr4);
	DisableFixedDNS = dflag;
}

function change_pppoe_password(obj)
{
	if( obj.type == "password" )
	{
		if( get_browser() == "Firefox" )
		{		
			obj.value = "";
			obj.type = "text";
		}
		else
		{
			obj.outerHTML = '<input type="text" name="pppoe_passwd" maxlength="64" size="16" onFocus="this.select();" onKeyPress="return getkey(\'ssid\', event)" value="">';
			document.forms[0].pppoe_passwd.focus();
			document.forms[0].pppoe_passwd.focus();
		}
	}
}

function check_wizard_pppoe(check,servername,page)
{
	var form=document.forms[0];
	if(form.pppoe_username.value=="")
	{
		alert("Login name cannot be blank.");
		return false;
	}
	for(i=0;i<form.pppoe_username.value.length;i++)
	{
		if(isValidChar(form.pppoe_username.value.charCodeAt(i))==false)
		{
			alert("Invalid login name!");
			return false;
		}
	}

	for(i=0;i<form.pppoe_passwd.value.length;i++)
	{
		if(isValidChar(form.pppoe_passwd.value.charCodeAt(i))==false)
		{
			alert("Invalid password.");
			return false;
		}
	}
	for(i=0;i<servername.length;i++)
	{
		if(isValidChar(servername.charCodeAt(i))==false)
		{
			alert("Invalid service name.");
			return false;
		}
	}
	if(form.pppoe_idletime.value.length<=0)
	{
		alert("Please enter idle time.\n");
		return false;
	}
	else if(!_isNumeric(form.pppoe_idletime.value))
	{
		alert("Invalid idle time. Please enter a correct number.\n");
		return false;
	}
        if (check == 1)
        {
                form.run_test.value="test";
                if( page == "wiz")
                        form.action="/apply.cgi?/WIZ_update.htm timestamp="+ts;
        }
        else
                form.run_test.value="no";

	return true;
}

function check_pppoe(form,check)
{
	//bug 23249, change the input value format
	format_IP("myip_1", "myip_2", "myip_3", "myip_4", "mymask_1", "mymask_2", "mymask_3", "mymask_4", "WPethr1", "WPethr2", "WPethr3", "WPethr4", "WMask1", "WMask2", "WMask3", "WMask4", "DAddr1", "DAddr2", "DAddr3", "DAddr4", "PDAddr1", "PDAddr2", "PDAddr3", "PDAddr4");

	if(form.auto_conn_24hr.checked == true)
		form.hidden_auto_conn_flag.value=1;
	else
		form.hidden_auto_conn_flag.value=0;

	if(check_wizard_pppoe(check,form.pppoe_servername.value,"bas")==false)
		return false;
	form.hidden_pppoe_idle_time.value = form.pppoe_idletime.value;
	form.hid_pppoe_dod.value = form.pppoe_dod.value;//bug 22322:when connection mode gray out,need a hidden-value to transfer
	if(pppoe_myip_flag == 1)
	{
      		form.pppoe_myip.value=form.myip_1.value+'.'+form.myip_2.value+'.'+form.myip_3.value+'.'+form.myip_4.value;
        	form.pppoe_mask.value=form.mymask_1.value+'.'+form.mymask_2.value+'.'+form.mymask_3.value+'.'+form.mymask_4.value;
		if(form.pppoe_myip.value !="...")
		{
			form.intranet_wan_assign.value = 1;
	                if(checkipaddr(form.pppoe_myip.value)==false)
        	        {
                	        alert("Invalid IP address. Please enter it again, or leave it blank.");
                	        return false;
                	}
                	if(isSameSubNet(form.pppoe_myip.value,lan_subnet,lan_ip,lan_subnet) == true)
                	{
                        	form.conflict_wanlan.value=1;
                	}
                	if(isSameIp(form.pppoe_myip.value,lan_ip) == true)
                	{
                	        form.conflict_wanlan.value=1;
                	}
                        if( form.pppoe_mask.value == "..." )
                        {
                                if( parseInt(form.myip_1.value) < 128 )
                                        form.pppoe_mask.value="255.0.0.0";
                                else if(parseInt(form.myip_1.value) < 192 )
                                        form.pppoe_mask.value="255.255.0.0";
                                else
                                        form.pppoe_mask.value="255.255.255.0";
		
                        }
                        if(checksubnet(form.pppoe_mask.value)==false)
                        {
                                alert("Invalid subnet mask. Please enter it again.\n");
                                return false;
                        }
                        if(isSameSubNet(form.pppoe_myip.value,form.pppoe_mask.value,lan_ip,form.pppoe_mask.value) == true)
                        {
                                form.conflict_wanlan.value=1;
                        }
                        if(isSameSubNet(form.pppoe_myip.value,form.pppoe_mask.value,lan_ip,lan_subnet) == true)
                        {
                                cf.conflict_wanlan.value=1;
                        }
			form.pppoe_myip.value = address_parseInt(form.pppoe_myip.value);
			form.pppoe_mask.value = address_parseInt(form.pppoe_mask.value);
		}
	        else{
	                form.pppoe_myip.value="";
	                form.pppoe_mask.value="";
	                form.intranet_wan_assign.value = 0;
	        }	
	}

	if(form.WANAssign[1].checked == true)
	{	
		form.pppoe_ipaddr.value=form.WPethr1.value+'.'+form.WPethr2.value+'.'+form.WPethr3.value+'.'+form.WPethr4.value;
                if(checkipaddr(form.pppoe_ipaddr.value)==false || is_sub_or_broad(form.pppoe_ipaddr.value, lan_ip, lan_subnet) == false)
		{
			alert("Invalid IP address. Please enter it again.");
			return false;
		}
                if(isSameSubNet(form.pppoe_ipaddr.value,lan_subnet,lan_ip,lan_subnet) == true)
                {
                        form.conflict_wanlan.value=1;
                }
                if(isSameIp(form.pppoe_ipaddr.value,lan_ip) == true)
                {
                        form.conflict_wanlan.value=1;
                }
 
              
		if(russian_pppoe_flag == 1 && gui_region == "Russian")
                {
                	form.pppoe_subnet.value=form.WMask1.value+'.'+form.WMask2.value+'.'+form.WMask3.value+'.'+form.WMask4.value;
                	if((form.pppoe_subnet.value != "...")&&(form.pppoe_subnet.value != "0.0.0.0")) 
                        {
				if (checksubnet(form.pppoe_subnet.value)==false)
        			{
	        			alert("Invalid subnet mask. Please enter it again.\n");
	        			return false;
        			}
                		if(isSameSubNet(form.pppoe_ipaddr.value,form.pppoe_subnet.value,lan_ip,lan_subnet) == true)
				{
					form.conflict_wanlan.value=1;	
				}
                		if(isSameSubNet(form.pppoe_ipaddr.value,form.pppoe_subnet.value,lan_ip,form.pppoe_subnet.value) == true)
				{
					form.conflict_wanlan.value=1;
				}
			}
			else
				form.pppoe_subnet.value = "";	
		}
	}
	if (form.DNSAssign[1].checked == true)
	{
		form.pppoe_dnsaddr1.value=form.DAddr1.value+'.'+form.DAddr2.value+'.'+form.DAddr3.value+'.'+form.DAddr4.value;
		form.pppoe_dnsaddr2.value=form.PDAddr1.value+'.'+form.PDAddr2.value+'.'+form.PDAddr3.value+'.'+form.PDAddr4.value;
		form.pppoe_ipaddr.value=form.WPethr1.value+'.'+form.WPethr2.value+'.'+form.WPethr3.value+'.'+form.WPethr4.value;

                if(form.pppoe_dnsaddr1.value=="...")
                        form.pppoe_dnsaddr1.value="";
		else
			form.pppoe_dnsaddr1.value = address_parseInt(form.pppoe_dnsaddr1.value);
	
		if(form.pppoe_dnsaddr2.value=="...")
			form.pppoe_dnsaddr2.value="";
		else
			form.pppoe_dnsaddr2.value = address_parseInt(form.pppoe_dnsaddr2.value);
		
		if( !check_DNS(form.pppoe_dnsaddr1.value,form.pppoe_dnsaddr2.value,form.WANAssign[1].checked,form.pppoe_ipaddr.value))
			return false;
	}
	form.hid_mtu_value.value=wan_mtu_now;
	form.pppoe_ipaddr.value = address_parseInt(form.pppoe_ipaddr.value);
	if ( !(old_wan_type=="pppoe"))
	{
		form.change_wan_type.value=0;
		mtu_change(wanproto_type);
	}
	else if ( old_pppoe_wan_assign == "1")
	{
		if( old_wan_ip!= form.pppoe_ipaddr.value && form.WANAssign[1].checked)
			form.change_wan_type.value=0;
		else if(form.WANAssign[0].checked)
			form.change_wan_type.value=0;
		else
			form.change_wan_type.value=1;	
	}
	else if( old_pppoe_wan_assign == "0")
	{
		if( old_wan_ip!=form.pppoe_ipaddr.value && form.WANAssign[1].checked)
			form.change_wan_type.value=0;
		else
			form.change_wan_type.value=1;
	}
        if (form.MACAssign[2].checked )
        {
                the_mac=form.Spoofmac.value;
                if(the_mac.indexOf(":")==-1 && the_mac.length=="12")
                {
                        var tmp_mac=the_mac.substr(0,2)+":"+the_mac.substr(2,2)+":"+the_mac.substr(4,2)+":"+the_mac.substr(6,2)+":"+the_mac.substr(8,2)+":"+the_mac.substr(10,2);
                        form.Spoofmac.value = tmp_mac;
                }
                else if ( the_mac.split("-").length == 6 )
                {
                        var tmp_mac = the_mac.replace(/-/g,":");
                        form.Spoofmac.value=tmp_mac;
                }
                if(maccheck_multicast(form.Spoofmac.value) == false)
                        return false;
        }
	return true;
}

function setIP_welcome_pppoe()
{
	cf=document.forms[0];
	var dflag = cf.WANAssign[0].checked;
	setDisabled(dflag,cf.WPethr1,cf.WPethr2,cf.WPethr3,cf.WPethr4);
	DisableFixedIP = dflag;
}

function setDNS_welcome_pppoe()
{
	cf=document.forms[0];
	var dflag = cf.DNSAssign[0].checked;
	setDisabled(dflag,cf.DAddr1,cf.DAddr2,cf.DAddr3,cf.DAddr4,cf.PDAddr1,cf.PDAddr2,cf.PDAddr3,cf.PDAddr4);
	DisableFixedDNS = dflag;
}

function check_wizard_pppoe_new(check)
{
	var cf=document.forms[0];
	if(check_wizard_pppoe(check,cf.pppoe_servername.value,"wiz")==false)
		return false;
	cf.pppoe_ipaddr.value=cf.WPethr1.value+'.'+cf.WPethr2.value+'.'+cf.WPethr3.value+'.'+cf.WPethr4.value;
	if(cf.WANAssign[1].checked)
	{
		if(checkipaddr(cf.pppoe_ipaddr.value)==false)
		{
			alert("Invalid IP address. Please enter it again.");
			return false;
		}
	}
	if(cf.DNSAssign[1].checked == true)
	{
		cf.pppoe_dnsaddr1.value=cf.DAddr1.value+'.'+cf.DAddr2.value+'.'+cf.DAddr3.value+'.'+cf.DAddr4.value;
		cf.pppoe_dnsaddr2.value=cf.PDAddr1.value+'.'+cf.PDAddr2.value+'.'+cf.PDAddr3.value+'.'+cf.PDAddr4.value;

                if(cf.pppoe_dnsaddr1.value=="...")
                        cf.pppoe_dnsaddr1.value="";

                if(cf.pppoe_dnsaddr2.value=="...")
                        cf.pppoe_dnsaddr2.value="";

		if( !check_DNS(cf.pppoe_dnsaddr1.value,cf.pppoe_dnsaddr2.value,cf.WANAssign[1].checked,cf.pppoe_ipaddr.value))
			return false;

		cf.pppoe_dnsaddr1.value = address_parseInt(cf.pppoe_dnsaddr1.value);
		cf.pppoe_dnsaddr2.value = address_parseInt(cf.pppoe_dnsaddr2.value);
	}
	cf.pppoe_ipaddr.value = address_parseInt(cf.pppoe_ipaddr.value);
}
function check_welcome_pppoe()
{
	var cf=document.forms[0];
	if(check_wizard_pppoe(0, cf.pppoe_servername.value)==false)
		return false;
	cf.pppoe_ipaddr.value=cf.WPethr1.value+'.'+cf.WPethr2.value+'.'+cf.WPethr3.value+'.'+cf.WPethr4.value;	
	if(cf.WANAssign[1].checked)
	{
		if(checkipaddr(cf.pppoe_ipaddr.value)==false || is_sub_or_broad(cf.pppoe_ipaddr.value, lan_ip, lan_subnet) == false)
		{
			alert("Invalid IP address. Please enter it again.");
			return false;
		}
	}
	if(cf.DNSAssign[1].checked == true)
	{
		cf.pppoe_dnsaddr1.value=cf.DAddr1.value+'.'+cf.DAddr2.value+'.'+cf.DAddr3.value+'.'+cf.DAddr4.value;
		cf.pppoe_dnsaddr2.value=cf.PDAddr1.value+'.'+cf.PDAddr2.value+'.'+cf.PDAddr3.value+'.'+cf.PDAddr4.value;
	
                if(cf.pppoe_dnsaddr1.value=="...")
                        cf.pppoe_dnsaddr1.value="";

                if(cf.pppoe_dnsaddr2.value=="...")
                        cf.pppoe_dnsaddr2.value="";

		if( !check_DNS(cf.pppoe_dnsaddr1.value,cf.pppoe_dnsaddr2.value,cf.WANAssign[1].checked,cf.pppoe_ipaddr.value))
			return false;	
	}
	parent.pppoe_username=cf.pppoe_username.value;
	parent.pppoe_passwd=cf.pppoe_passwd.value;
	parent.pppoe_server=cf.pppoe_servername.value;
	parent.pppoe_idle=cf.pppoe_idletime.value;
	if(cf.WANAssign[1].checked)
	{
		parent.pppoe_wan_assign=1;
		parent.pppoe_static_ip=cf.pppoe_ipaddr.value;
	}
	else
	{
		parent.pppoe_wan_assign=0;
		parent.pppoe_static_ip="";
	}
	if(cf.DNSAssign[1].checked == true)
	{
		parent.pppoe_dns_assign=1;
		parent.pppoe_dns1.value=cf.pppoe_dnsaddr1.value;
		parent.pppoe_dns2.value=cf.pppoe_dnsaddr2.value;
	}
	else
	{
		parent.pppoe_dns_assign=0;
		parent.pppoe_dns1.value="";
		parent.pppoe_dns2.value="";
	}
	parent.welcome_wan_type=3;
	return true;
}
