var isIE = document.all;
var disable = false;
var serv_array=[["0","","","","0"],["2","1","65535","Any","1"],["0","1","65535","Any(TCP)","1"],["1","1","65535","Any(UDP)","1"],["0","5190","5190","AIM","1"],["1","47624","47624","Age-of-Empire","1"],["0","179","179","BGP","1"],["1","68","68","BOOTP-CLIENT","1"],["1","67","67","BOOTP-SERVER","1"],["2","7648","24032","CU-SEEME","1"],["2","53","53","DNS","1"],["0","79","79","FINGER","1"],["0","20","21","FTP","1"],["0","1720","1720","H.323","1"],["0","80","80","HTTP","1"],["0","443","443","HTTPS","1"],["0","23566","23566","ICUII","1"],["0","113","113","IDENT","1"],["0","6670","6670","IP_Phone","1"],["2","6667","6667","IRC","1"],["0","1720","1720","NetMeeting","1"],["1","2049","2049","NFS","1"],["0","119","119","News","1"],["0","1723","1723","PPTP","1"],["2","27960","27960","QuakeII/III","1"],["0","512","512","RCMD","1"],["2","6970","7170","Real-Audio","1"],["0","514","514","REXEC","1"],["0","513","513","RLOGIN","1"],["0","107","107","RTELNET","1"],["2","554","554","RTSP","1"],["0","115","115","SFTP","1"],["0","25","25","SMTP","1"],["2","161","161","SNMP","1"],["2","162","162","SNMP-TRAPS","1"],["0","1521","1521","SQL-NET","1"],["2","22","22","SSH","1"],["1","1558","1558","STRMWORKS","1"],["1","49","49","TACACS","1"],["0","23","23","Telnet","1"],["1","69","69","TFTP","1"],["0","7000","7000","VDOLIVE","1"],["1","500","500","VPN-IPSEC","1"],["1","1701","1701","VPN-L2TP","1"],["0","1723","1723","VPN-PPTP","1"]];

function pi(val)
{
	return parseInt(val,10);
}  

function chg_by_service(is_load,cf)
{
	var s = cf.service_type.selectedIndex;
	var len = cf.service_type.options.length;
	if(s<0)
	{
		s = cf.service_type.selectedIndex = 0;
	}
	if((s==len-1)&&(is_load == 1))//user defined
		return;
	disable = (pi(serv_array[s][4])==1)?true:false;
	cf.protocol.selectedIndex = pi(serv_array[s][0]);
	cf.portstart.value = serv_array[s][1];
	cf.portend.value = serv_array[s][2];
	cf.userdefined.value = serv_array[s][3];
//	if(isIE)
//	{
		cf.protocol.disabled = disable; 
		cf.portstart.disabled = disable;
		cf.portend.disabled = disable;
		cf.userdefined.disabled = disable;
//	}
}

function change_radio(check,cf)
{
	if(check == 0)
	{
		cf.f_pcip1.disabled = true;
		cf.f_pcip2.disabled = true;
		cf.f_pcip3.disabled = true;
		cf.f_pcip4.disabled = false;
		cf.f_startip1.disabled =true;
		cf.f_startip2.disabled =true;
		cf.f_startip3.disabled =true;
		cf.f_startip4.disabled =true;
		cf.f_endip1.disabled =true;
		cf.f_endip2.disabled =true;
		cf.f_endip3.disabled =true;
		cf.f_endip4.disabled =true;
	}
	else if (check == 1)
	{
		cf.f_pcip1.disabled = true;
		cf.f_pcip2.disabled = true;
		cf.f_pcip3.disabled = true;
		cf.f_pcip4.disabled = true;
		cf.f_startip1.disabled =true;
		cf.f_startip2.disabled =true;
		cf.f_startip3.disabled =true;
		cf.f_startip4.disabled =false;
		cf.f_endip1.disabled =true;
		cf.f_endip2.disabled =true;
		cf.f_endip3.disabled =true;
		cf.f_endip4.disabled =false;
	}
	else
	{
		cf.f_pcip1.disabled = true;
		cf.f_pcip2.disabled = true;
		cf.f_pcip3.disabled = true;
		cf.f_pcip4.disabled = true;
		cf.f_startip1.disabled =true;
		cf.f_startip2.disabled =true;
		cf.f_startip3.disabled =true;
		cf.f_startip4.disabled =true;
		cf.f_endip1.disabled =true;
		cf.f_endip2.disabled =true;
		cf.f_endip3.disabled =true;
		cf.f_endip4.disabled =true;
	}
}

function check_block_services_add(cf,flag)
{
	if(flag == 'add' && array_num == 20 )
	{
		alert("The router can support only 20 service rules.");
		return false;
	}
	if(cf.portstart.value==""||cf.portend.value=="")
	{
		alert("Invalid Starting or Ending Port value.");
		return false;
	}
	txt=cf.portstart.value;
	for(i=0;i<txt.length;i++)
	{
		c=txt.charAt(i);
		if("0123456789".indexOf(c,0)<0)
		{
			alert("Invalid Starting Port value.");
			return false;
		}
	}
	txt=cf.portend.value;
	for(i=0;i<txt.length;i++)
	{
		c=txt.charAt(i);
		if("0123456789".indexOf(c,0)<0)
		{
			alert("Invalid Ending Port value.");
			return false;
		}
	}
	if(parseInt(cf.portstart.value,10)<1||parseInt(cf.portstart.value,10)>65535)
	{
		alert("Invalid Starting Port value.");
		return false;
	}
	if(parseInt(cf.portend.value,10)<1||parseInt(cf.portend.value,10)>65535)
	{
		alert("Invalid Ending Port value.");
		return false;
	}
	if(parseInt(cf.portend.value,10)<parseInt(cf.portstart.value,10))
	{
		alert("The Ending Port value should be greater than or equal to the Starting Port value.");
		return false;
	}
/*        var input_start_port=cf.portstart.value;
        var input_end_port=cf.portend.value;
        var input_sertype=cf.protocol.value;
        for(i=1;i<=array_num;i++)
        {
                var str = eval ( 'block_servicesArray' + i );
                var each_info=str.split(' ');
                sertype=each_info[1];
                startport=each_info[2];
                endport=each_info[3];
                serflag=each_info[0];
                if(serflag!="User_Defined")
                {
                }
                else if (sertype=="TCP/UDP"||sertype==input_sertype||input_sertype=="TCP/UDP")
                {
                        if(flag == 'edit')
                        {
                                if ((!(parseInt(endport)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(startport))) && select_edit!=i)
                                {
	                                if ( (sertype == "TCP/UDP" || input_sertype == "TCP/UDP" || input_sertype == sertype) && select_edit!=i)
                                        {
	                                        alert("The specified port(s) are being used by other configurations. Please check your configurations of USB Readyshare, Remote Management, Port forwarding, Port Triggering, UPnP Port Mapping table, RIP, and Internet connection type");
                                                return false;
                                        }
                                }
                        }
                        else
                                if (!(parseInt(endport)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(startport)))
                                {
                                        if ( (sertype == "TCP/UDP" || input_sertype == "TCP/UDP" || input_sertype == sertype) )
                                        {
	                                        alert("The specified port(s) are being used by other configurations. Please check your configurations of USB Readyshare, Remote Management, Port forwarding, Port Triggering, UPnP Port Mapping table, RIP, and Internet connection type");
                                                return false;
                                        }
                                }
                }
        }
*/
	txt=cf.userdefined.value;
	if(txt=="")
	{
		alert("Invalid user defined service type.");
		return false;
	}
	for(i=0;i<txt.length;i++)
	{
		if(isValidChar_space(txt.charCodeAt(i))==false)
		{
			alert("Invalid user defined service type.");
			return false;
		}
	}
	 for(i=1;i<=array_num;i++)
        {
                var str = eval ( 'block_servicesArray' + i );
                var each_info=str.split(' ');
                if(flag == 'edit')
                {
                        if(cf.service_type.value != "User_Defined")
                        {
                                if((cf.service_type.value == each_info[0]||cf.userdefined.value == each_info[4].replace(/&nbsp;/g, " ")) && i!=select_edit )
                                {
                                        alert("The blocked service already exists!");
                                        return false;
                                }
			}
			else
                        {
                                if(cf.userdefined.value == each_info[4].replace(/&nbsp;/g, " ") && i!=select_edit)
                                {
                                        alert("The blocked service already exists!");
                                        return false;
                                }
                        }
                }
		else
                {
                        if(cf.service_type.value != "User_Defined")
                        {
                                if( cf.service_type.value == each_info[0]||cf.userdefined.value == each_info[4].replace(/&nbsp;/g, " "))
                                {
                                        alert("The blocked service already exists!");
                                        return false;
                                }
                        }
                        else
                        {
                                if(cf.userdefined.value == each_info[4].replace(/&nbsp;/g, " "))
                                {
                                        alert("The blocked service already exists!");
                                        return false;
                                }
                        }
                }
	}
	cf.hidden_userdefined.value = cf.userdefined.value.replace(/ /g, "&nbsp;");
	cf.hidden_protocol.value = cf.protocol.value; 
	//cf.hidden_portstart.value = cf.portstart.value;
	//cf.hidden_portend.value = cf.portend.value;
	cf.only_ip.value=cf.f_pcip1.value+'.'+cf.f_pcip2.value+'.'+cf.f_pcip3.value+'.'+cf.f_pcip4.value;
	cf.iprange_start.value=cf.f_startip1.value+'.'+cf.f_startip2.value+'.'+cf.f_startip3.value+'.'+cf.f_startip4.value;
	cf.iprange_end.value=cf.f_endip1.value+'.'+cf.f_endip2.value+'.'+cf.f_endip3.value+'.'+cf.f_endip4.value;
	if(cf.iptype[0].checked == true)
	{
		for(i=1;i<=array_num;i++)
        	{
                	var str = eval ( 'block_servicesArray' + i );
                	var each_info=str.split(' ');
                	if(flag == 'edit')
                	{
				//if the input IP is the same as any other one in the label, 
				//check the service type, if the type is also the same return false.
				if( ( cf.only_ip.value == each_info[6].replace(/&nbsp;/g, " ") ) && i != select_edit )
                               	{
					if(cf.service_type.value != "User_Defined")
					{
						if( cf.service_type.value==each_info[0] || cf.userdefined.value==each_info[4].replace(/&nbsp;/g, " ") )
						{
                                       			alert("You could not add a same rule twice.");
                                       			return false;
						}
					}
					else if( cf.userdefined.value == each_info[4].replace(/&nbsp;/g, " ") )
						{
							alert("You could not add a same rule twice.");
							return false;
						} 
                               	}
                        }
		 	else if( cf.only_ip.value == each_info[6].replace(/&nbsp;/g, " ") )
				{
					if(cf.service_type.value != "User_Defined")
					{
						if( cf.service_type.value==each_info[0] || cf.userdefined.value==each_info[4].replace(/&nbsp;/g, " ") )
						{
                                        		alert("You could not add a same rule twice.");
                                        		return false;
						}
					}
					else if(cf.userdefined.value==each_info[4].replace(/&nbsp;/g, " "))
						{
							alert("You could not add a same rule twice.");
							return false;
						}
                        	}	
                }
	
		if(checkipaddr(cf.only_ip.value)==false || is_sub_or_broad(cf.only_ip.value, lan_ip, lan_subnet) == false || isSameIp(cf.only_ip.value,lan_ip) == true)
		{
			alert("Invalid IP address. Please enter it again.");
			return false;
		}
		if(isSameSubNet(cf.only_ip.value,lan_subnet,lan_ip,lan_subnet) == false)
		{
			alert("This IP address should be in the same subnet as the LAN IP address.");
			return false;
		}		
		cf.iplist.value=address_parseInt(cf.only_ip.value);
	}
	else if(cf.iptype[1].checked == true)
	{
		if(checkipaddr(cf.iprange_start.value)==false || is_sub_or_broad(cf.iprange_start.value, lan_ip, lan_subnet) == false)
		{
			alert("Invalid IP address. Please enter it again.");
			return false;
		}
		if(checkipaddr(cf.iprange_end.value)==false || is_sub_or_broad(cf.iprange_end.value, lan_ip, lan_subnet) == false)
		{
			alert("Invalid IP address. Please enter it again.");
			return false;
		}
		if(cp_ip2(cf.iprange_start.value,cf.iprange_end.value)==false)
		{
			alert("Invalid IP address range.");
			return false;
		}
		if(isSameSubNet(cf.iprange_start.value,lan_subnet,lan_ip,lan_subnet) == false)
		{
			alert("The starting IP address should be in the same subnet as the LAN IP address.");
			return false;
		}	
		if(isSameSubNet(cf.iprange_end.value,lan_subnet,lan_ip,lan_subnet) == false)
		{
			alert("The ending IP address should be in the same subnet as the LAN IP address.");
			return false;
		}		

		/* to fix bug 25203, if ip range is include lan ip, pop up warning message and return false.*/
		if(isIncludeInvIp(lan_ip,cf.iprange_start.value,cf.iprange_end.value))
		{
			alert("Invalid IP address. Please enter it again.");
			return false;
		}
		cf.iplist.value=address_parseInt(cf.iprange_start.value)+'-'+address_parseInt(cf.iprange_end.value);
	}
	else
		cf.iplist.value="all";

        cf.portstart.value=port_range_interception(cf.portstart.value);
        cf.portend.value=port_range_interception(cf.portend.value);
        cf.hidden_portstart.value = cf.portstart.value;
        cf.hidden_portend.value = cf.portend.value;

	return true;
}

function check_block_services_edit(cf)
{
	if( array_num == 0 )
	{
		location.href="edit_fail.htm";
		return false;
	}
	var count_select=0;
	var select_num;
	if( array_num == 1)
	{
		if(cf.ruleSelect.checked == true)
		{
			count_select++;
			select_num=1;
		}
	}
	else for(i=0;i<array_num;i++)
		if(cf.ruleSelect[i].checked == true)
		{
			count_select++;
			select_num=i+1;
		}
	if(count_select==0)
	{
		location.href="edit_fail.htm";
		return false;
	}
	else
	{
		cf.select_edit.value=select_num;
		cf.submit_flag.value="block_services_editnum";
		cf.action="/apply.cgi?/BKS_service_edit.htm timestamp="+ts;
	//	cf.submit();
	//	return true;

		location.href="BKS_service_edit.htm";
		return false;
	}
}

function check_block_services_del(cf)
{
	if( array_num == 0 )
	{
		location.href="del_fail.htm";
		return false;
	}
	var count_select=0;
	var select_num;
	if( array_num == 1)
	{
		if(cf.ruleSelect.checked == true)
		{
			count_select++;
			select_num=1;
		}
	}
	else for(i=0;i<array_num;i++)
		if(cf.ruleSelect[i].checked == true)
		{
			count_select++;
			select_num=i+1;
		}
	if(count_select==0)
	{
		location.href="del_fail.htm";
		return false;
	}
	else
	{
		cf.select_del.value=select_num;
		cf.submit_flag.value="block_services_del";
	//	cf.action="/apply.cgi?/BKS_service.htm";
		cf.submit();
		return true;
	}
}

function check_block_services_apply(cf)
{
	cf.submit_flag.value="block_services_apply";
	//cf.action="/apply.cgi?/BKS_service.htm";
	cf.submit();
	return true;
}
