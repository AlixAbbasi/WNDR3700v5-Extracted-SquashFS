var invalid_ip="Invalid IP address. Please enter it again.";
var routes_length_10="No more space to add static routes.";
var routes_name_dup="Duplicate route name.";
var routes_condition_dup="Duplicate route condition.";
var routes_name_null="Route name cannot be blank.";
var routes_diff_wan_gateway="The gateway should be on the same subnet as the WAN interface or the LAN interface.";
var routes_metric_error="Invalid metric number.";

function countmask(num)
{
	var i = 0;
	var count=0;
	var numArr = [128, 64, 32, 16, 8, 4, 2, 1];
	for ( i = 0; i < numArr.length; i++ )
		if ( (num & numArr[i]) != 0 )
			count++;
	return count;
}

function check_routers_add(cf)
{
	if( array_num == 32 )
	{
		alert("No more space to add static routes.");
		return false;
	}
	else
		location.href="STR_routes_add.htm";
}
function check_router_add(cf,flag)
{
	var name = cf.route_name.value;
	if(flag == 'add' && array_num == 32 )
	{
		alert("No more space to add static routes.");
		return false;
	}
	if(name == "" )
	{
		alert("Route name cannot be blank.");
		return false;
	}
        for(i=0;i<name.length;i++)/* to fix bug 24889,change the value of i start with 0, but not 1.*/
        {
		if(isValidChar_space(name.charCodeAt(i))==false)
		{
			alert("Character is not allowed in Route Name");
			return false;
		}
	}
	cf.route_name.value = remove_space(cf.route_name.value); 
	
	cf.SRouteDestAddr.value=cf.SRouteDestAddr1.value+'.'+cf.SRouteDestAddr2.value+'.'+cf.SRouteDestAddr3.value+'.'+cf.SRouteDestAddr4.value;
	var ipaddr_array=cf.SRouteDestAddr.value.split('.');
	if(checkIP(ipaddr_array[0],ipaddr_array[1],ipaddr_array[2],ipaddr_array[3],254)==false)
	{
		alert("Invalid IP address. Please enter it again.");
		return false;
	}
	if(cf.SRouteDestAddr1.value=="127")
	{
		alert("Invalid IP address. Please enter it again.");
		return false;
	}
	if(parseInt(ipaddr_array[0])>=224)
	{
		alert("Invalid IP address. Please enter it again.");
		return false;
	}
	cf.SRouteSubnetMask.value=cf.SRouteSubnetMask1.value+'.'+cf.SRouteSubnetMask2.value+'.'+cf.SRouteSubnetMask3.value+'.'+cf.SRouteSubnetMask4.value;
	if(checksubnet(cf.SRouteSubnetMask.value)==false)
	{
		alert("Invalid subnet mask. Please enter it again.\n");
		return false;
	}
	cf.SRouteSubnetMask.value = address_parseInt(cf.SRouteSubnetMask.value);
	if(isSameSubNet(cf.SRouteDestAddr.value, cf.SRouteSubnetMask.value, lan_ip, cf.SRouteSubnetMask.value) == true || isSameSubNet(cf.SRouteDestAddr.value, lan_mask, lan_ip, lan_mask) == true ){
		alert("Invalid IP address. Please enter it again.");
		return false;
	}
	if (gui_region == "Russian"){
		if( wan_ip != "0.0.0.0" && ( isSameSubNet(cf.SRouteDestAddr.value, cf.SRouteSubnetMask.value, wan_ip, cf.SRouteSubnetMask.value) == true || isSameSubNet(cf.SRouteDestAddr.value, wan_mask, wan_ip, wan_mask) == true ) && isSameSubNet(cf.SRouteDestAddr.value, cf.SRouteSubnetMask.value, wan_ip, wan_mask) == true ){
			alert("The IP address conflicts with the WAN IP subnet. Please enter a different IP address.");
			return false;
		}
	}
	else {

		if( wan_ip != "0.0.0.0" && ( isSameSubNet(cf.SRouteDestAddr.value, cf.SRouteSubnetMask.value, wan_ip, cf.SRouteSubnetMask.value) == true || isSameSubNet(cf.SRouteDestAddr.value, wan_mask, wan_ip, wan_mask) == true )){
			alert("The IP address conflicts with the WAN IP subnet. Please enter a different IP address.");
			return false;
		}
	}
	
	cf.SRouteGatewayAddr.value=cf.SRouteGatewayAddr1.value+'.'+cf.SRouteGatewayAddr2.value+'.'+cf.SRouteGatewayAddr3.value+'.'+cf.SRouteGatewayAddr4.value;
	if(checkgateway(cf.SRouteGatewayAddr.value)==false)
	{
		alert("Invalid gateway IP address. Please enter it again.");
		return false;
	}
	cf.SRouteGatewayAddr.value = address_parseInt(cf.SRouteGatewayAddr.value);
	if(isSameIp(cf.SRouteGatewayAddr.value, wan_ip) == true || isSameIp(cf.SRouteGatewayAddr.value, lan_ip) == true)
	{
		alert("Invalid gateway IP address. Please enter it again.");
		return false;
	}
	if(wan_ip == "0.0.0.0" && (isSameSubNet(cf.SRouteGatewayAddr.value,lan_mask,lan_ip,lan_mask) == false || isGateway(lan_ip, lan_mask, cf.SRouteGatewayAddr.value) == false))
	{
		alert("The gateway should be on the same subnet as the WAN interface or the LAN interface.");
		return false;
	}
	else if ( (wan_proto == "pptp") || (wan_proto == "l2tp" && gui_region == "Russian") || (wan_proto == "pppoe" && russian_pppoe_flag == 1 && gui_region == "Russian"))
	{
		if( (isSameSubNet(cf.SRouteGatewayAddr.value,wan_mask,wan_ip,wan_mask) == false )  && (isSameSubNet(cf.SRouteGatewayAddr.value,pptp_eth1_wanmask,pptp_eth1_wanip,pptp_eth1_wanmask) == false || isGateway(pptp_eth1_wanip,pptp_eth1_wanmask,cf.SRouteGatewayAddr.value) == false) && (isSameSubNet(cf.SRouteGatewayAddr.value,lan_mask,lan_ip,lan_mask) == false || isGateway(lan_ip, lan_mask, cf.SRouteGatewayAddr.value) == false))
		{
			alert("The gateway should be on the same subnet as the WAN interface or the LAN interface.");
			return false;
		}		
	}
	else if ( wan_proto == "pppoe" )
	{
		if( (isSameSubNet(cf.SRouteGatewayAddr.value,wan_mask,wan_ip,wan_mask) == false ) && (isSameSubNet(cf.SRouteGatewayAddr.value,lan_mask,lan_ip,lan_mask) == false || isGateway(lan_ip, lan_mask, cf.SRouteGatewayAddr.value) == false))
		{
			alert("The gateway should be on the same subnet as the WAN interface or the LAN interface.");
			return false;
		}
	}
	else if((isSameSubNet(cf.SRouteGatewayAddr.value,wan_mask,wan_ip,wan_mask) == false || isGateway(wan_ip,wan_mask,cf.SRouteGatewayAddr.value) == false) && (isSameSubNet(cf.SRouteGatewayAddr.value,lan_mask,lan_ip,lan_mask) == false || isGateway(lan_ip, lan_mask, cf.SRouteGatewayAddr.value) == false))	
	{
		alert("The gateway should be on the same subnet as the WAN interface or the LAN interface.");
		return false;
	}
	var ipArray = cf.SRouteDestAddr.value.split(".");
	var subnetArray = cf.SRouteSubnetMask.value.split(".");
	var addr = new Array();
	var count = 0;
	for (i=0;i<4;i++)
	{
		addr[i] = ipArray[i] & subnetArray[i];
		count += countmask(subnetArray[i]);
	}
	cf.count.value = count;
	var route_dest = addr[0]+'.'+addr[1]+'.'+addr[2]+'.'+addr[3];
	document.forms[0].route_dest.value=route_dest;
	if(isNaN(parseInt(cf.route_metric.value,10))==true || parseInt(cf.route_metric.value)<2|| parseInt(cf.route_metric.value)>15)
	{
		alert("Invalid metric number.");
		return false;
	}
	for(i=1;i<=array_num;i++)
	{
		var str = eval ( 'routerArray' + i );
		var each_info=str.split(' ');
		each_info[0] = each_info[0].replace(/&nbsp/g, " ");	
	
		if(flag == 'edit')
		{	
			if( cf.route_name.value == each_info[0]&& select_editnum != i)
			{
				alert("Duplicate route name.");
				return false;
			}
			if( route_dest == each_info[3] && select_editnum != i)
			{
				alert("Duplicate route condition.");
				return false;
			}
		}
		else
		{
			if( cf.route_name.value == each_info[0])
			{
				alert("Duplicate route name.");
				return false;
			}
			if( route_dest == each_info[3] )
			{
				alert("Duplicate route condition.");
				return false;
			}
		}
	}

	if (cf.SRouteActive.checked==false)
		cf.route_ac.value = 0;
	else
		cf.route_ac.value = 1;
	if (cf.SRoutePrivate.checked==false)
		cf.route_pr.value = 0;
	else
		cf.route_pr.value = 1;

	cf.route_name.value = cf.route_name.value.replace(/\s/g, "&nbsp");

	return true;
}
function check_router_editnum()
{
	if (array_num == 0)
	{
		alert("Please select an item to edit.");
		return false;
	}
	var count_select=0;
	var select_num;
	if(array_num == 1)
	{
		if(document.forms[0].select.checked == true)
		{
			count_select++;
			select_num=1;
		}
	}
	else for(i=0;i<array_num;i++)
		if(document.forms[0].select[i].checked == true)
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
		document.forms[0].select_edit.value=select_num;
		document.forms[0].submit_flag.value="st_router_editnum";
		//document.forms[0].action="/apply.cgi?/STR_routes_edit.htm timestamp="+ts;
		//return true;
		location.href = "STR_routes_edit.htm"; 
	}
	return false;
}

function check_router_del()
{
	if ( array_num == 0 )
	{
		alert("Please select an item to delete.");
		location.href="STR_routes.htm";
		return false;
	}
	var count_select=0;
	var del_num;
	if( array_num == 1)
	{
		if(document.forms[0].select.checked == true)
			del_num=1;
		else
		{
			alert("Please select an item to delete.");
			location.href="STR_routes.htm";
			return false;
		}
	}
	else
	{
		for(i=0;i<array_num;i++)
			if(document.forms[0].select[i].checked == true)
			{
				count_select++;
				del_num=i+1;
			}
		if(count_select==0)
		{
			alert("Please select an item to delete.");
			location.href="STR_routes.htm";
			return false;
		}
	}
	document.forms[0].select_del.value=del_num;
	return true;
}
