function check_reservation_add(cf,flag)
{
	var rsvipaddr = new Array();
	if( array_num == 64 && flag== 'add')
	{
		alert("Maximum Number of Reserved Address Reached.");
		return false;
	}

	rsvipaddr = cf.rsv_ip1.value+'.'+cf.rsv_ip2.value+'.'+cf.rsv_ip3.value+'.'+cf.rsv_ip4.value;
	if(cf.dv_name.value == "")
	{
		alert("Device name can not be null.");
		return false;
	}
	for(i=0;i<cf.dv_name.value.length;i++)
	{ 
		if(isValidChar(cf.dv_name.value.charCodeAt(i))==false)
		{
			alert("Invalid device name.");
			return false;
		}
	}

	if(checkipaddr(rsvipaddr)==false)
	{
		alert("Invalid IP address. Please enter it again.");
		return false;
	}
	if(cf.rsv_mac.value.length==12 && cf.rsv_mac.value.indexOf(":")==-1)
	{
		var mac=cf.rsv_mac.value; 
		cf.rsv_mac.value=mac.substr(0,2)+":"+mac.substr(2,2)+":"+mac.substr(4,2)+":"+mac.substr(6,2)+":"+mac.substr(8,2)+":"+mac.substr(10,2);
	}
	else if ( cf.rsv_mac.value.split("-").length == 6 )
	{
		var tmp_mac = cf.rsv_mac.value.replace(/-/g,":");
		cf.rsv_mac.value=tmp_mac;
	}	
	if(maccheck(cf.rsv_mac.value) == false)
		return false;
	if(isSameSubNet(rsvipaddr,lanmask,lanip,lanmask) == false)
	{
		alert("This IP address should be in the same subnet as the LAN IP address.");
		return false;
	}	
	var start_array=startip.split('.');
	var end_array=endip.split('.');
	var msg_ip="The IP address should be within the DHCP range. "+"[ "+startip+" ~ "+endip+" ].";

	if(!(parseInt(start_array[3]) <= parseInt(cf.rsv_ip4.value,10) && parseInt(cf.rsv_ip4.value,10) <= parseInt(end_array[3]) && start_array[2] == parseInt(cf.rsv_ip3.value,10) && start_array[1] == parseInt(cf.rsv_ip2.value,10) && start_array[0] == parseInt(cf.rsv_ip1.value,10)))
	{
		alert(msg_ip);
		return false;
	}

	cf.duplicated_reservation.value="";
	cf.duplicated_num.value=0;
	for(i=1;i<=array_num;i++)
	{
		var str = eval ( 'resevArray' + i );
		var each_info=str.split(' ');
		if(flag == 'edit')
		{
			if(select_editnum!=i)
			{
				if( (each_info[2]==cf.dv_name.value && each_info[2]!="<unknown>") || rsvipaddr == each_info[0] || cf.rsv_mac.value.toLowerCase() == each_info[1].toLowerCase() )
				{
					if( cf.duplicated_num.value == 0 )
					{
						if( confirm("The input data is duplicated with current record,\ncontinue to overwrite?") )
						{
							cf.duplicated_num.value=1;
							cf.duplicated_reservation.value=i.toString();
						}
						else
							return false;	
					}
					else
					{
						cf.duplicated_num.value++;
						cf.duplicated_reservation.value=cf.duplicated_reservation.value+" "+i.toString();	
					}
				}
			}
		}
		else
		{
			if( (each_info[2]==cf.dv_name.value && cf.dv_name.value !="<unknown>") || rsvipaddr == each_info[0] || cf.rsv_mac.value.toLowerCase() == each_info[1].toLowerCase() )
			{
                              	if( cf.duplicated_num.value == 0 )
                                {
                    	               	if( confirm("The input data is duplicated with current record,\ncontinue to overwrite?") )
                           	        {
                	                        cf.duplicated_num.value=1;
            	                                cf.duplicated_reservation.value=i.toString();
       	                                }
                          	        else
                           	                return false;
                     	        }
            	                else
                       	        {
            	                        cf.duplicated_num.value++;
     	                                cf.duplicated_reservation.value=cf.duplicated_reservation.value+" "+i.toString();
                                }
			}	
		}
	}
	cf.reservation_ipaddr.value=address_parseInt(rsvipaddr);
	return true;
}
function check_reservation_del(cf)
{
	if(array_num == 0)
	{
		alert("Please select an item to delete.");
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
		alert("Please select an item to delete.");
		return false;
	}
	else
	{
		cf.select_del.value=select_num;
		cf.submit_flag.value="reservation_del";
		return true;
	}	
}

function check_reservation_editnum(cf)
{
	if (array_num == 0)
	{
		alert("Please select an item to edit.");
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
		alert("Please select an item to edit.");
		return false;
	}
	else
	{
		cf.select_edit.value=select_num;
		cf.submit_flag.value="reservation_editnum";
		cf.action="/apply.cgi?/reservation_edit.htm timestamp="+ts;
		//return true
		location.href="reservation_edit.htm";
		return false;
	}	
}

function data_select(num)
{
	var cf=document.forms[0];
	if( show_name_array[num] == "<unknown>" || show_name_array[num] == "&lt;unknown&gt;" )
		cf.dv_name.value="";
	else
		cf.dv_name.value=show_name_array[num].replace(/&lt;/g,"<").replace(/&gt;/g,">");

	if( show_mac_array[num] == "<unknown>" ||  show_mac_array[num] =="&lt;unknown&gt;" )
		cf.rsv_mac.value="";
	else
		cf.rsv_mac.value=show_mac_array[num];

	if( show_ip_array[num] != "----" )
	{
		var ip_array=show_ip_array[num].split('.');
		cf.rsv_ip1.value=ip_array[0];
		cf.rsv_ip2.value=ip_array[1];
		cf.rsv_ip3.value=ip_array[2];
		cf.rsv_ip4.value=ip_array[3];	
	}
}
