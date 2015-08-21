/*
 *	var index = cf.WRegion.selectedIndex;
	index=parseInt(index)+1;
 *	this is for one more region, select.
*/
//bug 23854:The dialogue of DFS channel is not implemented
function check_dfs()
{
	var cf = document.forms[0]; 
	var each_info = dfs_info.split(':');
	var channel_info;

	var channel = cf.w_channel_an;
        var ch_index = channel.selectedIndex;
        var ch_name = channel.options[ch_index].text;
	var ch_value = channel.options[ch_index].value;

	for ( i=0; i<each_info.length; i++ )
	{
		channel_info = each_info[i].split(' '); //channel; channel_flag; channe_priflag; left_time
		var sec = channel_info[3]%60;		//change left time format
		var min = parseInt(channel_info[3]/60);
		if( ch_value == channel_info[0] )
		{
			alert("This DFS channel is not allowed to use because the Radar was detected before. You can change another channel or wait " + min + "min(s) " + sec + "second(s) to use this channel.");
			return false;
		}
	}	

	//if the channel is allowed to use, show warning message
	//var AChannel_name = new Array("0", "36", "40", "44", "48", "52(DFS)", "56(DFS)", "60(DFS)", "64(DFS)", "100(DFS)", "104(DFS)", "108(DFS)", "112(DFS)", "116(DFS)", "120(DFS)", "124(DFS)", "128(DFS)", "132(DFS)", "136(DFS)", "140(DFS)", "149", "153", "157", "161", "165");
	//bug 23934:modify the channel selection in HT40 mode,eg:show "36+40" instead of "36",so use the value of channel to judge the warning message
	var AChannel_name = new Array("0", "36", "40", "44", "48", "52", "56", "60", "64", "100", "104", "108", "112", "116", "120", "124", "128", "132", "136", "140", "149", "153", "157", "161", "165");

	if(dfs_channel2_router_flag == 1)
	{
		for( i=5; i<=19; i++ )
		{
			if( AChannel_name[i] == ch_value)
			{
				return confirm("You select a DFS channel, the channel will be changed automatically if any Radar is detected.");
			}	
		}
	}

	return true;
}

function chgCh(from)
{   
	if (from == 2)
	{
		var cf = document.forms[0];
		setChannel();
	}
	else
	{
		setwlan_mode();
		setChannel();
	}
}

function setwlan_mode()
{
	var cf = document.forms[0];
	var index = cf.WRegion.selectedIndex;
	index=parseInt(index)+1;
	var currentMode = cf.opmode.selectedIndex;

	if (index == 7 || index == 8) {
		cf.opmode.options.length = 2;
		cf.opmode.options[0].text = wlan_mode_54;
		cf.opmode.options[1].text = wlan_mode_130;
		cf.opmode.options[0].value = "1";
		cf.opmode.options[1].value = "2";
		if (currentMode <= 1)
			cf.opmode.selectedIndex = currentMode;
		else
			cf.opmode.selectedIndex = 1;
	} else {
		cf.opmode.options.length = 3;
		cf.opmode.options[0].text = wlan_mode_54;
		cf.opmode.options[1].text = wlan_mode_130;
		cf.opmode.options[2].text = wlan_mode_300;
		cf.opmode.options[0].value = "1";
		cf.opmode.options[1].value = "2";
		cf.opmode.options[2].value = "3";
		cf.opmode.selectedIndex = currentMode;
	}
	return;
}

function setChannel()
{
	var cf = document.forms[0];
	var index = cf.WRegion.selectedIndex;
	index=parseInt(index)+1;
	var chIndex = cf.w_channel.selectedIndex;
	var currentMode = cf.opmode.selectedIndex;
	var endChannel;

/* change it like before produce 20000, just 11 and 13
 *
	if ( currentMode == 2 && (index == 4 || index == 9 || index == 11 ))
		endChannel = 7;	
	else if ( currentMode == 2 )
		endChannel = 9;
	else
*/	
  
		endChannel = FinishChannel[index];
	if (FinishChannel[index]==14 && cf.opmode.selectedIndex!=0)
		cf.w_channel.options.length = endChannel - StartChannel[index];
	else
		cf.w_channel.options.length = endChannel - StartChannel[index] + 2;

	cf.w_channel.options[0].text = "Auto";
	cf.w_channel.options[0].value = 0;

	for (var i = StartChannel[index]; i <= endChannel; i++) {
		if (i==14 && cf.opmode.selectedIndex!=0)
			continue;
		cf.w_channel.options[i - StartChannel[index] + 1].value = i;
		cf.w_channel.options[i - StartChannel[index] + 1].text = (i < 10)? "0" + i : i;
	}
	cf.w_channel.selectedIndex = ((chIndex > -1) && (chIndex < cf.w_channel.options.length)) ? chIndex : 0 ;


	

}

function chgChA(from)
{   
	var cf = document.forms[0];
	if (from == 2)
	{
		setAChannel(cf.w_channel_an);
	}
	else
	{
		setAwlan_mode();
		setAChannel(cf.w_channel_an);
	}
}

function setAwlan_mode()
{
	var cf = document.forms[0];
	var index = cf.WRegion.selectedIndex;
	index=parseInt(index)+1;
	var currentMode = cf.opmode_an.selectedIndex;

	if (index == 6 || index == 10 ) {     //Israel, Middle East
		cf.opmode_an.options.length = 2;
		cf.opmode_an.options[0].text = wlan_mode_54;
		cf.opmode_an.options[1].text = wlan_mode_130;
		cf.opmode_an.options[0].value = "1";
		cf.opmode_an.options[1].value = "2";
		if (currentMode <= 1)
			cf.opmode_an.selectedIndex = currentMode;
		else
			cf.opmode_an.selectedIndex = 1;
		cf.w_channel_an.disabled=false;
		cf.opmode_an.disabled=false;			
	}
/*	else if ( index == 6 || index == 12 ){		//Israel, Middle East, these two countries do not support 802.11a	
		cf.w_channel_an.selectedIndex=0;
		cf.opmode_an.selectedIndex=0;
		cf.w_channel_an.disabled=true;
		cf.opmode_an.disabled=true;
	}
*/
	else{
		cf.opmode_an.options.length = 3;
		cf.opmode_an.options[0].text = wlan_mode_54;
		cf.opmode_an.options[1].text = wlan_mode_130;
		cf.opmode_an.options[2].text = wlan_mode_300;
		cf.opmode_an.options[0].value = "1";
		cf.opmode_an.options[1].value = "2";
		cf.opmode_an.options[2].value = "3";
		cf.opmode_an.selectedIndex = currentMode;
		cf.w_channel_an.disabled=false;
		cf.opmode_an.disabled=false;		
	}
	return;
}
function setAChannel(channel)
{
	var cf = document.forms[0];
	var index = cf.WRegion.selectedIndex;
	index=parseInt(index)+1;
	var chIndex = channel.selectedIndex;
	var chValue = channel.options[chIndex].value;
	var currentMode = cf.opmode_an.selectedIndex;	
	var endChannel;
   if(dfs_channel_router_flag == 1){
	var AChannel = new Array(0, 36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 149, 153, 157, 161, 165);

	channel.options[0].text = "Auto";
	channel.options[0].value = 0;	 
 	
	if( index == 8 )                //Korean
	{
		endChannel = 18; //19 channel, from 36 to 136
		channel.options.length = 24;
		for( i = 1; i<= endChannel; i++ )
		{
			channel.options[i].value = AChannel[i];
			channel.options[i].text = AChannel[i];
		}
		if( currentMode == 0 || currentMode == 1 )
		{
			channel.options[19].value = channel.options[19].text = 140;
			channel.options[20].value = channel.options[20].text = 149;
			channel.options[21].value = channel.options[21].text = 153;
			channel.options[22].value = channel.options[22].text = 157;
			channel.options[23].value = channel.options[23].text = 161;
		}
		else
		{
			channel.options.length = 23;
			channel.options[19].value = channel.options[19].text = 149;
			channel.options[20].value = channel.options[20].text = 153;
			channel.options[21].value = channel.options[21].text = 157;
			channel.options[22].value = channel.options[22].text = 161;
		}
	}
	else if( index == 2 )               //Asia
	{
		channel.options.length = 5;
		channel.options[1].value = channel.options[1].text = 149;
		channel.options[2].value = channel.options[2].text = 153;
		channel.options[3].value = channel.options[3].text = 157;
		channel.options[4].value = channel.options[4].text = 161;
		if( currentMode == 0 || currentMode == 1 )		//not 300Mbps
		{
			channel.options.length = 6;
			channel.options[5].value = channel.options[5].text = 165;		
		}	
	}
	else if( index == 1 || index == 3 || index == 4 || index == 9 || index == 11 || index == 12 )
	{//Africa,Australia, Canada, Mexico, South America,United States
		endChannel = 18; //19 channel, from 36 to 136
		channel.options.length = 25;
		for( i = 1; i<= endChannel; i++ )
		{
			channel.options[i].value = AChannel[i];
			channel.options[i].text = AChannel[i];
		}		
		if( currentMode == 0 || currentMode == 1 )
		{
			channel.options[19].value = channel.options[19].text = 140;
			channel.options[20].value = channel.options[20].text = 149;
			channel.options[21].value = channel.options[21].text = 153;
			channel.options[22].value = channel.options[22].text = 157;
			channel.options[23].value = channel.options[23].text = 161;
			channel.options[24].value = channel.options[24].text = 165;
		}
		else
		{
			channel.options.length = 23;
			channel.options[19].value = channel.options[19].text = 149;
			channel.options[20].value = channel.options[20].text = 153;
			channel.options[21].value = channel.options[21].text = 157;
			channel.options[22].value = channel.options[22].text = 161;
		}
	}
	else if( index == 5 || index == 7 ) //Europe, Japan
	{
		endChannel = 18; //19 channel, from 36 to 136
		channel.options.length = 19;
		for( i = 1; i<= endChannel; i++ )
		{
			channel.options[i].value = AChannel[i];
			channel.options[i].text = AChannel[i];
		}	
		if( currentMode != 2 )
		{
			channel.options.length = 20;
			channel.options[19].value = channel.options[19].text = 140;
		}
	}
	else if( index == 6 || index == 10 ) //Israel, Middle East
	{
		endChannel = 8; // Japan 9channel, from 36 to 64
		channel.options.length = 9;
		for( i = 1; i<= endChannel; i++ )
		{
			channel.options[i].value = AChannel[i];
			channel.options[i].text = AChannel[i];
		}
	}
   }
   else{	
	//      var AChannel = new Array(0, 36, 40, 44, 48, 149, 153, 157, 161, 165);
	var AChannel = new Array(36, 40, 44, 48, 149, 153, 157, 161, 165);

	var BChannel = new Array(36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 149, 153, 157, 161, 165);

	if( index == 12 || index == 3 || index == 4 || index == 9 || index == 11 )// 10->11 11->12 12->10
	{										   //middle east move up two line
		if( currentMode != 2 )
		{
			endChannel = 9;
			channel.options.length = 9;
		}
		else
		{
			endChannel = 8;
			channel.options.length = 8;
		}
		for( i = 0; i< endChannel; i++ )
		{
			channel.options[i].value = AChannel[i];
			channel.options[i].text = AChannel[i];
		}
	}
	else if( index == 8 )
	{
		endChannel = 8;
		channel.options.length = 8;
		
		for( i = 0; i< endChannel; i++ )
		{
			channel.options[i].value = AChannel[i];
			channel.options[i].text = AChannel[i];
		}
	}
        else if( index == 2 )               //Asia :090403 changed,and prevenient format is the same with 12,3,4,9,11
        {
                channel.options.length = 4;
                channel.options[0].value = channel.options[0].text = 149;
                channel.options[1].value = channel.options[1].text = 153;
                channel.options[2].value = channel.options[2].text = 157;
                channel.options[3].value = channel.options[3].text = 161;
                if( currentMode == 0 || currentMode == 1 )              //not 300Mbps
                {
                        channel.options.length = 5;
                        channel.options[4].value = channel.options[4].text = 165;
                }
        }
	else
	{
		endChannel = 4;
		channel.options.length = 4;
		for( i = 0; i< endChannel; i++ )
		{
			channel.options[i].value = AChannel[i];
			channel.options[i].text = AChannel[i];
		}
	
	}
	if(dfs_channel2_router_flag == 1)//bug 25665:DFS channel should be supported in Canada, Europe and Austrilia
		{
			if( index == 5 )
			{
				if( currentMode != 2 )
				{
					endChannel = 19;
					channel.options.length = 19;
					for( i = 0; i< 4; i++ )
					{
						channel.options[i].value = BChannel[i];
						channel.options[i].text = BChannel[i];
					}
					for( i = 4; i< endChannel; i++ )
					{
						channel.options[i].value = BChannel[i];
						channel.options[i].text = BChannel[i]+'(DFS)';
					}
				}
				else
				{	//bug 23934:modify the channel selection in HT40 mode
					channel.options.length = 9;
					channel.options[0].value = 36;
					channel.options[0].text = '36+40';
					channel.options[1].value = 44;
					channel.options[1].text = '44+48';
					channel.options[2].value = 52;
					channel.options[2].text = '52+56(DFS)';
					channel.options[3].value = 60;
					channel.options[3].text = '60+64(DFS)';
					channel.options[4].value = 100;
					channel.options[4].text = '100+104(DFS)';
					channel.options[5].value = 108;
					channel.options[5].text = '108+112(DFS)';
					channel.options[6].value = 116;
					channel.options[6].text = '116+120(DFS)';
					channel.options[7].value = 124;
					channel.options[7].text = '124+128(DFS)';
					channel.options[8].value = 132;
					channel.options[8].text = '132+136(DFS)';
				}
				
			}
			/*else if(index == 4)
			{				
				if( currentMode != 2 )
				{
					endChannel = 12;
					channel.options.length = 20;
					for( i = 0; i< 4; i++ )
					{
						channel.options[i].value = BChannel[i];
						channel.options[i].text = BChannel[i];
					}
					for( i = 4; i< endChannel; i++ )
					{
						channel.options[i].value = BChannel[i];
						channel.options[i].text = BChannel[i]+'(DFS)';
					}
					channel.options[12].value = 116;
					channel.options[13].value = 136;
					channel.options[14].value = 140;
					channel.options[12].text = 116+'(DFS)';
					channel.options[13].text = 136+'(DFS)';
					channel.options[14].text = 140+'(DFS)';
					channel.options[15].value = channel.options[15].text = 149;
					channel.options[16].value = channel.options[16].text = 153;
					channel.options[17].value = channel.options[17].text = 157;
					channel.options[18].value = channel.options[18].text = 161;
					channel.options[19].value = channel.options[19].text = 165;
				}
				else
				{
					channel.options.length = 8;
					channel.options[0].value = 36;
					channel.options[0].text = '36+40';
					channel.options[1].value = 44;
					channel.options[1].text = '44+48';
					channel.options[2].value = 52;
					channel.options[2].text = '52+56(DFS)';
					channel.options[3].value = 60;
					channel.options[3].text = '60+64(DFS)';
					channel.options[4].value = 100;
					channel.options[4].text = '100+104(DFS)';
					channel.options[5].value = 108;
					channel.options[5].text = '108+112(DFS)';
					channel.options[6].value = 149;
					channel.options[6].text = '149+153';
					channel.options[7].value = 157;
					channel.options[7].text = '157+161';
				}
			}*/
			else if(index == 3)//bug 23853:NETGEAR correct the DFS channel list for Austrilia
			{				
				if( currentMode != 2 )
				{
					endChannel = 12;
					channel.options.length = 20;
					for( i = 0; i< 4; i++ )
					{
						channel.options[i].value = BChannel[i];
						channel.options[i].text = BChannel[i];
					}
					for( i = 4; i< endChannel; i++ )
					{
						channel.options[i].value = BChannel[i];
						channel.options[i].text = BChannel[i]+'(DFS)';
					}
					channel.options[12].value = 116;
					channel.options[13].value = 136;
					channel.options[14].value = 140;
					channel.options[12].text = 116+'(DFS)';
					channel.options[13].text = 136+'(DFS)';
					channel.options[14].text = 140+'(DFS)';
					channel.options[15].value = channel.options[15].text = 149;
					channel.options[16].value = channel.options[16].text = 153;
					channel.options[17].value = channel.options[17].text = 157;
					channel.options[18].value = channel.options[18].text = 161;
					channel.options[19].value = channel.options[19].text = 165;
				}
				else
				{
					channel.options.length = 9;
					channel.options[0].value = 36;
					channel.options[0].text = '36+40';
					channel.options[1].value = 44;
					channel.options[1].text = '44+48';
					channel.options[2].value = 52;
					channel.options[2].text = '52+56(DFS)';
					channel.options[3].value = 60;
					channel.options[3].text = '60+64(DFS)';
					channel.options[4].value = 100;
					channel.options[4].text = '100+104(DFS)';
					channel.options[5].value = 108;
					channel.options[5].text = '108+112(DFS)';
					channel.options[6].value = 132;
					channel.options[6].text = '132+136(DFS)';
					channel.options[7].value = 149;
					channel.options[7].text = '149+153';
					channel.options[8].value = 157;
					channel.options[8].text = '157+161';
				}
			}
		}
   }	
	channel.selectedIndex = ((chIndex > -1) && (chIndex < channel.options.length)) && ( chValue == channel.value )? chIndex : 0 ;	
}

function check_wlan()
{
	if( check_dfs() == false)
	{
		return false;
	}
	
	var cf=document.forms[0];
	var ssid_bgn = document.forms[0].ssid.value.replace(/\\/g,"\\\\\\\\").replace(/`/g,"\\\\\\`").replace(/"/g,"\\\"");
	//var space_flag=0;
	var haven_wpe=0;

	var wla1_ssid=document.forms[0].wla1ssid.value.replace(/\\/g,"\\\\\\\\").replace(/`/g,"\\\\\\`").replace(/"/g,"\\\"");
	var wlg1_ssid=document.forms[0].wlg1ssid.value.replace(/\\/g,"\\\\\\\\").replace(/`/g,"\\\\\\`").replace(/"/g,"\\\"");
	
	if( wps_progress_status == "2" || wps_progress_status == "3" || wps_progress_status == "start" )
	{
		alert("WPS process is in progress, please apply the changes later.");
		return false;
	}

	if(ssid_bgn == "")
	{
		alert("SSID cannot be blank.");
		return false;
	}
	
	if(ssid_bgn == wlg1_ssid)
	{
		alert("The SSID is duplicate, please change to another one.");
		return false;
	}
	
	for(i=0;i<ssid_bgn.length;i++)
	{
		if(isValidChar_space(ssid_bgn.charCodeAt(i))==false)
		{
			alert("Character is not allowed in SSID.");
			return false;
		}
	}

	/* to fix bug 25082 */
	/*for(i=0;i<ssid_bgn.length;i++)
	{
		if(ssid_bgn.charCodeAt(i)!=32)
			space_flag++;
	}
	if(space_flag==0)
	{
		alert("SSID cannot be blank.");
		return false;
	}*/
	cf.wl_ssid.value = ssid_bgn;
	
	if(cf.enable_isolation.checked == true)
		cf.wl_endis_wireless_isolation.value="1";
	else
		cf.wl_endis_wireless_isolation.value="0";
	//16400
	if(cf.ssid_bc.checked == true)
		cf.wl_enable_ssid_broadcast.value="1";
	else
		cf.wl_enable_ssid_broadcast.value="0";

	/* 	in our old web page, the cancel button value is alway the cancel mark, so the condition will never be 
		true, so just remove it.
	
	if(cf.Cancel.value=="WLG_wireless.htm")
		cf.opmode_bg.value=cf.opmode.value;
	*/
	
	/*        remove select region for new spec	
	if(cf.WRegion.selectedIndex == 0)
	{
		alert("Please select the correct region for your location.");
		return false;
	}
	*/
	
	cf.wl_WRegion.value = cf.WRegion.value;
	if ( wds_endis_fun == 1 )
	{
		if ( cf.w_channel.selectedIndex == 0 )
		{
			alert("The wireless repeating function cannot be used with Auto Channel.\nPlease change your channel settings before you enable the wireless repeating function.");
			return false;
		}
	}
	cf.wl_hidden_wlan_channel.value = cf.w_channel.value;

	if(cf.security_type[1].checked == true)
	{
		if( checkwep(cf)== false)
			return false;
		cf.wl_hidden_sec_type.value=2;
		for(i=0;i<cf.passphraseStr.value.length;i++)
		{
			if(isValidChar_space(cf.passphraseStr.value.charCodeAt(i))==false)
			{
				alert("Character is not allowed in passphrase.");
				return false;
			}
		}
	}
	else if(cf.security_type[2].checked == true)
	{
		if( checkpsk(cf.passphrase, cf.wl_sec_wpaphrase_len)== false)
			return false;
		cf.wl_hidden_sec_type.value=3;
		cf.wl_hidden_wpa_psk.value = cf.passphrase.value.replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/"/g,"\\\"");
	}
	else if(cf.security_type[3].checked == true)
	{
		if( checkpsk(cf.passphrase, cf.wl_sec_wpaphrase_len)== false)
			return false;
		cf.wl_hidden_sec_type.value=4;
		cf.wl_hidden_wpa_psk.value = cf.passphrase.value.replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/"/g,"\\\"");
	}	
	else if(cf.security_type[4].checked == true)
	{
		if( checkpsk(cf.passphrase, cf.wl_sec_wpaphrase_len)== false)
			return false;
		cf.wl_hidden_sec_type.value=5;
		cf.wl_hidden_wpa_psk.value = cf.passphrase.value.replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/"/g,"\\\"");
	}	
	else if(cf.security_type[5].checked == true)
	{
		radiusServerIP = cf.radiusIPAddr1.value+'.'+ cf.radiusIPAddr2.value + '.' + cf.radiusIPAddr3.value + '.' + cf.radiusIPAddr4.value;
		if( radiusServerIP == "" || checkipaddr(radiusServerIP) == false )
		{
			alert("Invalid IP address. Please enter it again.");
			return false;
		}
/*
		if(isSameSubNet(radiusServerIP,lanSubnet,lanIP,lanSubnet) == false && isSameSubNet(radiusServerIP,wanSubnet,wanIP,wanSubnet) == false )
        {
            alert("This IP Address should be ether in the same subnet with LAN IP Address or in the same subnet with WAN IP Address !");
			return false;
        }
*/
		if( isSameIp(lanIP, radiusServerIP) == true )
		{
			alert("Invalid IP address. Please enter it again.");
			return false;
		}
		if( isSameIp(wanIP, radiusServerIP) == true )
		{
			alert("The IP address conflicts with the WAN IP subnet. Please enter a different IP address.");
			return false;
		}	
		cf.radiusServerIP.value = radiusServerIP;
		
		radiusPort=parseInt(cf.textWpaeRadiusPort.value,10);
		if( isNaN(radiusPort) || radiusPort < 1 || radiusPort > 65535 )
		{
			alert("The RADIUS server Port must be in the range [1- 65535]!");
			return false;
		}
		cf.textWpaeRadiusPort.value=radiusPort;
		if( cf.textWpaeRadiusSecret.value == "" )
		{
			alert("Invalid password.");
			return false;
		}
		if( cf.textWpaeRadiusSecret.length > 128 )
		{
			alert("Please enter 1 to 128 characters (octets) in the RADIUS server Shared Secret field!");
			return false;
		}
		for(i=0;i<cf.textWpaeRadiusSecret.value.length;i++)
		{
		    if(isValidChar(cf.textWpaeRadiusSecret.value.charCodeAt(i))==false)
		    {
		        alert("Please enter 1 to 128 characters (octets) in the RADIUS server Shared Secret field!");
				cf.textWpaeRadiusSecret.focus();
				return false;
			}
		}
		cf.hidden_WpaeRadiusSecret.value = cf.textWpaeRadiusSecret.value.replace(/\\/g,"\\\\\\\\").replace(/`/g,"\\\\\\`").replace(/"/g,"\\\"");
		if( endis_wl_radio == 1)
		{
			cf.hidden_endis_wl_wps.value=0;
			cf.hidden_endis_wla_wps.value=0;
			haven_wpe = 1;
			if (!confirm("WPA/WPA2 Enterprise cannot work with WPS. WPS is going to become inaccessible. Do you want to continue?"))
				return false;			
		}
		cf.wl_hidden_sec_type.value=6;
        cf.textWpaeRadiusPort.value=port_range_interception(cf.textWpaeRadiusPort.value);		
	}	
	else
		cf.wl_hidden_sec_type.value=1;

	//When user selects WPA-PSK(TKIP)+150Mbps and WPA-PSK(TKIP)+300Mbps, set wl_simple_mode=1,Bug No.19591
	//or select "WPA-PSK [TKIP] + WPA2-PSK [AES]"+150Mbps and "WPA-PSK [TKIP] + WPA2-PSK [AES]"+300Mbps 
	if((cf.opmode.value=="2") || (cf.opmode.value=="3"))
	{
	    if(cf.security_type[1].checked == true || cf.security_type[2].checked == true)
		{
			//if(confirm("IMPORTANT: WPA-PSK [TKIP] ONLY operates at \"Up to 54Mbps\"(legacy G) mode, not N mode.NETGEAR recommends that you use WPA2-PSK [AES] to get full N rate support.") == false)
			//{
			//	return false;
			//}

			cf.wl_hidden_wlan_mode.value = "1"; //save for wl_simple_mode

		}
		else if(cf.security_type[3].checked == true)
		{
			if(guest_mode_flag == 1)
			{
				if(confirm("WPA-PSK [TKIP] in Guest Network ONLY operates at \"Up to 54Mbps\" (legacy G) mode, not N mode.") == false)
				{
					return false;
				}
				cf.wl_hidden_wlan_mode.value = "1"; 
			}
			else if(guest_mode_flag == 2)
			{
				if(confirm("NETGEAR recommends that you use WPA2-PSK [AES] in Guest Network to get full N rate support.") == false)
				{
					return false;	
				}		
				cf.wl_hidden_wlan_mode.value = cf.opmode.value;	
			}
			else
				cf.wl_hidden_wlan_mode.value = cf.opmode.value;	
		}
		else if(cf.security_type[4].checked == true)
		{
			if(confirm("IMPORTANT\nWPA-PSK [TKIP] may only operate at \"Up to 54Mbps\" rate, not N rate.\nNETGEAR recommends that you use WPA2-PSK [AES] to get full N rate support.") == false)
			{
				return false;	
			}
			
			cf.wl_hidden_wlan_mode.value = cf.opmode.value;
		}
		else if(cf.security_type[5].checked == true)//Bug 19803 WPA/WPA2 Enterprise, has three WPA Mode
		{
			if(cf.wpae_mode.value == 'WPAE-TKIP')
			{
				//if(confirm("IMPORTANT: WPA-PSK [TKIP] ONLY operates at \"Up to 54Mbps\"(legacy G) mode, not N mode.NETGEAR recommends that you use WPA2-PSK [AES] to get full N rate support.") == false)
					//return false;
				
				cf.wl_hidden_wlan_mode.value = "1"; //save for wl_simple_mode
			}
			else if(cf.wpae_mode.value == 'WPAE-TKIPAES')
			{
				if(confirm("IMPORTANT\nWPA-PSK [TKIP] may only operate at \"Up to 54Mbps\" rate, not N rate.\nNETGEAR recommends that you use WPA2-PSK [AES] to get full N rate support.") == false)
					return false;

				cf.wl_hidden_wlan_mode.value = cf.opmode.value;
			}
			else
			{
				if(guest_mode_flag == 1)
				{
					if(confirm("WPA-PSK [TKIP] in Guest Network ONLY operates at \"Up to 54Mbps\" (legacy G) mode, not N mode.") == false)
					{
						return false;
					}
					cf.wl_hidden_wlan_mode.value = "1"; 
				}
				else if(guest_mode_flag == 2)
				{
					if(confirm("NETGEAR recommends that you use WPA2-PSK [AES] in Guest Network to get full N rate support.") == false)
					{
						return false;	
					}		
					cf.wl_hidden_wlan_mode.value = cf.opmode.value;	
				}
				else 
					cf.wl_hidden_wlan_mode.value = cf.opmode.value;	
			}
		}
		else
		{
			if(guest_mode_flag == 1)
			{
				if(confirm("WPA-PSK [TKIP] in Guest Network ONLY operates at \"Up to 54Mbps\" (legacy G) mode, not N mode.") == false)
				{
					return false;
				}
				cf.wl_hidden_wlan_mode.value = "1";
			}
			else
				cf.wl_hidden_wlan_mode.value = cf.opmode.value;
		}
	}
	else
	{
		cf.wl_hidden_wlan_mode.value = cf.opmode.value;
	}

	var flad_op = false;
	if(parent.mode_is_300 == 1 && wl_disablecoext != 1 && (cf.opmode.value!="1") && (cf.opmode.value!="2"))
	{
	    flad_op = true;
	     alert(msg);
	}
	
	//cf.wl_mode.value = cf.opmode.value;
	var haven_alert = '0';
	if(cf.security_type[1].checked == true)
	{
        	if ( cf.authAlgm.value == 1 && endis_wl_radio == 1)
        	{
			cf.hidden_endis_wl_wps.value=0;
			cf.hidden_endis_wla_wps.value=0;
			haven_alert = '1';
                	if (!confirm("WEP security with shared key authentication does not work with WPS. WPS will be inaccessible. Do you want to continue?"))
	                	return false;
        	}
		
		if(an_router_flag == 1)	
			alert("The WEP security can only be supported on one SSID of each band"+"(2.4GHz/5GHz)");
		else if(guest_router_flag == 1)
			alert("The WEP security can only be supported on one SSID of each band");
	}		


	
	if(an_router_flag == 1)
	{		
		var ssid_an = document.forms[0].ssid_an.value.replace(/\\/g,"\\\\\\\\").replace(/`/g,"\\\\\\`").replace(/"/g,"\\\"");
		if( ssid_an == "")
		{
			alert("SSID cannot be blank.");
			return false;
		}
		if(ssid_bgn == wlg1_ssid || ssid_bgn == wla1_ssid || ssid_an == wlg1_ssid || ssid_an == wla1_ssid)
		{
			alert("The SSID is duplicate, please change to another one.");
			return false;
		}
		for(i=0;i<ssid_an.length;i++)
		{
			if(isValidChar_space(ssid_an.charCodeAt(i))==false)
			{
				alert("Character is not allowed in SSID.");
				return false;
			}
		}

		/* to fix bug 25082 */
		/*space_flag=0;
		for(i=0;i<ssid_an.length;i++)
		{
			if(ssid_an.charCodeAt(i)!=32)
				space_flag++;
		}
		if(space_flag==0)
		{
			alert("SSID cannot be blank.");
			return false;
		}*/
		
		cf.wla_ssid.value = ssid_an;

		//16400
		if(cf.ssid_bc_an.checked == true)
			cf.wla_enable_ssid_broadcast.value="1";
		else
			cf.wla_enable_ssid_broadcast.value="0";
		if(cf.enable_isolation_an.checked == true)
			cf.wla_endis_wireless_isolation.value="1";
		else
			cf.wla_endis_wireless_isolation.value="0";
		if(cf.enable_video.checked == true)
			cf.hidden_enable_video.value=1;
		else
			cf.hidden_enable_video.value=0;	
/*
		if ( wla_wds_endis_fun == 1 )
		{
			if ( cf.w_channel_an.selectedIndex == 0 )
			{
				alert("The wireless repeating function cannot be used with Auto Channel.\nPlease change your channel settings before you enable the wireless repeating function.");
				return false;
			}
		}	
*/
		cf.wla_hidden_wlan_channel.value = cf.w_channel_an.value;
			
		//for a/n
		if(cf.security_type_an[1].checked == true)
		{
			if( checkwep_a(cf)== false)
				return false;
			cf.wla_hidden_sec_type.value=2;
	                for(i=0;i<cf.passphraseStr_an.value.length;i++)
	                {
	                        if(isValidChar_space(cf.passphraseStr_an.value.charCodeAt(i))==false)
	                        {
	                                alert("Character is not allowed in passphrase.");
	                                return false;
	                        }
	                }
		}
		else if(cf.security_type_an[2].checked == true)
		{
			if( checkpsk(cf.passphrase_an, cf.wla_sec_wpaphrase_len)== false)
				return false;
			cf.wla_hidden_sec_type.value=3;
			cf.wla_hidden_wpa_psk.value = cf.passphrase_an.value.replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/"/g,"\\\"");
		}
		else if(cf.security_type_an[3].checked == true)
		{
			if( checkpsk(cf.passphrase_an, cf.wla_sec_wpaphrase_len)== false)
				return false;
			cf.wla_hidden_sec_type.value=4;
			cf.wla_hidden_wpa_psk.value = cf.passphrase_an.value.replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/"/g,"\\\"");
		}	
		else if(cf.security_type_an[4].checked == true)
		{
			if( checkpsk(cf.passphrase_an, cf.wla_sec_wpaphrase_len)== false)
				return false;
			cf.wla_hidden_sec_type.value=5;
			cf.wla_hidden_wpa_psk.value = cf.passphrase_an.value.replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/"/g,"\\\"");
		}	
		else if(cf.security_type_an[5].checked == true)
		{
			radiusServerIP = cf.radiusIPAddr1_an.value+'.'+ cf.radiusIPAddr2_an.value + '.' + cf.radiusIPAddr3_an.value + '.' + cf.radiusIPAddr4_an.value;
			if( radiusServerIP == "" || checkipaddr(radiusServerIP) == false )
			{
				alert("Invalid IP address. Please enter it again.");
				return false;
			}
/*
			if(isSameSubNet(radiusServerIP,lanSubnet,lanIP,lanSubnet) == false && isSameSubNet(radiusServerIP,wanSubnet,wanIP,wanSubnet) == false )
			{
	            		alert("Invalid IP address. Please enter it again.");
				return false;
			}
*/
			if( isSameIp(lanIP, radiusServerIP) == true )
			{
				alert("Invalid IP address. Please enter it again.");
				return false;
			}
			if( isSameIp(wanIP, radiusServerIP) == true )
			{
				alert("The IP address conflicts with the WAN IP subnet. Please enter a different IP address.");
				return false;
			}	
			cf.radiusServerIP_a.value = radiusServerIP;
			
			radiusPort=parseInt(cf.textWpaeRadiusPort_an.value,10);
			if( isNaN(radiusPort) || radiusPort < 1 || radiusPort > 65535 )
			{
				alert("The RADIUS server Port must be in the range [1- 65535]!");
				return false;
			}
			cf.textWpaeRadiusPort_an.value=radiusPort;
			if( cf.textWpaeRadiusSecret_an.value == "" )
			{
				alert("Invalid password.");
				return false;
			}
			if( cf.textWpaeRadiusSecret_an.length > 128 )
			{
				alert("Please enter 1 to 128 characters (octets) in the RADIUS server Shared Secret field!");
				return false;
			}
			for(i=0;i<cf.textWpaeRadiusSecret_an.value.length;i++)
			{
			        if(isValidChar(cf.textWpaeRadiusSecret_an.value.charCodeAt(i))==false)
			        {
			        	alert("Please enter 1 to 128 characters (octets) in the RADIUS server Shared Secret field!");
					cf.textWpaeRadiusSecret_an.focus();
					return false;
				}
			}
			cf.hidden_WpaeRadiusSecret_a.value = cf.textWpaeRadiusSecret_an.value.replace(/\\/g,"\\\\\\\\").replace(/`/g,"\\\\\\`").replace(/"/g,"\\\"");

			if(endis_wla_radio == 1)
			{
				cf.hidden_endis_wl_wps.value=0;
				cf.hidden_endis_wla_wps.value=0;
				if(haven_wpe == 0)
					if (!confirm("WPA/WPA2 Enterprise cannot work with WPS. WPS is going to become inaccessible. Do you want to continue?"))
						return false;			
			}
			cf.textWpaeRadiusPort_an.value=port_range_interception(cf.textWpaeRadiusPort_an.value);
			cf.wla_hidden_sec_type.value=6;
		}	
		else
			cf.wla_hidden_sec_type.value=1;

		//5GHz a/n : When user selects WPA-PSK(TKIP)+150Mbps and WPA-PSK(TKIP)+300Mbps, set wl_simple_mode=1,Bug No.19591
		//or select "WPA-PSK [TKIP] + WPA2-PSK [AES]"+150Mbps and "WPA-PSK [TKIP] + WPA2-PSK [AES]"+300Mbps 
		if((cf.opmode_an.value=="2") || (cf.opmode_an.value=="3"))
		{
			if(cf.security_type_an[1].checked == true)
				cf.wla_hidden_wlan_mode.value = "1"; //save for wla_simple_mode
			else if(cf.security_type_an[2].checked == true)
			{
				//if(confirm("IMPORTANT: WPA-PSK [TKIP] ONLY operates at \"Up to 54Mbps\"(legacy G) mode, not N mode.NETGEAR recommends that you use WPA2-PSK [AES] to get full N rate support.") == false)
				//{
					//return false;
				//}

				cf.wla_hidden_wlan_mode.value = "1"; //save for wla_simple_mode
			}
			else if(cf.security_type_an[3].checked == true)
			{
				if(wla_guest_mode_flag == 1)
				{
					if(confirm("WPA-PSK [TKIP] in Guest Network ONLY operates at \"Up to 54Mbps\" (legacy G) mode, not N mode.") == false)
					{
						return false;
					}
					cf.wla_hidden_wlan_mode.value = "1"; 
				}
				else if(wla_guest_mode_flag == 2)
				{
					if(confirm("NETGEAR recommends that you use WPA2-PSK [AES] in Guest Network to get full N rate support.") == false)
					{
						return false;	
					}	
					cf.wla_hidden_wlan_mode.value = cf.opmode_an.value;	
				}
				else
					cf.wla_hidden_wlan_mode.value = cf.opmode_an.value;	
			}
			else if(cf.security_type_an[4].checked == true)
			{
				if(confirm("IMPORTANT\nWPA-PSK [TKIP] may only operate at \"Up to 54Mbps\" rate, not N rate.\nNETGEAR recommends that you use WPA2-PSK [AES] to get full N rate support.") == false)
				{
					return false;	
				}
			
				cf.wla_hidden_wlan_mode.value = cf.opmode_an.value;
			}
			else if(cf.security_type_an[5].checked == true)//Bug 19803 WPA/WPA2 Enterprise, has three WPA Mode
			{
				if(cf.wpae_mode_an.value == 'WPAE-TKIP')
				{
					//if(confirm("IMPORTANT: WPA-PSK [TKIP] ONLY operates at \"Up to 54Mbps\"(legacy G) mode, not N mode.NETGEAR recommends that you use WPA2-PSK [AES] to get full N rate support.") == false)
						//return false;
					cf.wla_hidden_wlan_mode.value = "1"; //save for wl_simple_mode
				}
				else if(cf.wpae_mode_an.value == 'WPAE-TKIPAES')
				{
					if(confirm("IMPORTANT\nWPA-PSK [TKIP] may only operate at \"Up to 54Mbps\" rate, not N rate.\nNETGEAR recommends that you use WPA2-PSK [AES] to get full N rate support.") == false)
						return false;

					cf.wla_hidden_wlan_mode.value = cf.opmode_an.value;
				}
				else
				{
					if(wla_guest_mode_flag == 1)
					{
						if(confirm("WPA-PSK [TKIP] in Guest Network ONLY operates at \"Up to 54Mbps\" (legacy G) mode, not N mode.") == false)
						{
							return false;
						}
						cf.wla_hidden_wlan_mode.value = "1"; 
					}
					else if(wla_guest_mode_flag == 2)
					{
						if(confirm("NETGEAR recommends that you use WPA2-PSK [AES] in Guest Network to get full N rate support.") == false)
						{
							return false;	
						}		
						cf.wla_hidden_wlan_mode.value = cf.opmode_an.value;	
					}
					else
						cf.wla_hidden_wlan_mode.value = cf.opmode_an.value;	
				}
			}
			else
			{
				if(wla_guest_mode_flag == 1)
				{
					if(confirm("WPA-PSK [TKIP] in Guest Network ONLY operates at \"Up to 54Mbps\" (legacy G) mode, not N mode.") == false)
					{
						return false;
					}
					cf.wla_hidden_wlan_mode.value = "1";
				}
				else
					cf.wla_hidden_wlan_mode.value = cf.opmode_an.value;
			}
		}
		else
		{
			cf.wla_hidden_wlan_mode.value = cf.opmode_an.value;
		}
		
		
	if(parent.mode_is_300 == 1 && wl_disablecoext != 1 && (cf.opmode_an.value!="1") && (cf.opmode_an.value!="2"))
	{
	   if(flad_op != true)
	     alert(msg);
	
	}
	
		
		countryIndex=cf.WRegion.value;
		//if( (countryIndex == 6 || countryIndex == 12) && !confirm("Israel and Middle East do not support 802.11a, if you select this, wireless a/n will be shut dow, do you want to continue?") )
		if( (countryIndex == 5 || countryIndex == 11) && !confirm("Israel and Middle East do not support 802.11a, if you select this, wireless a/n will be shut dow, do you want to continue?") )
			return false;

		//cf.wla_hidden_wlan_mode.value = cf.opmode_an.value;
		
		if(cf.security_type_an[1].checked == true && endis_wla_radio == 1)
		{
		        if ( cf.authAlgm_an.value == 1)
	                {
				cf.hidden_endis_wl_wps.value=0;
				cf.hidden_endis_wla_wps.value=0;
				if(haven_alert == '0')
	                        	if (!confirm("WEP security with shared key authentication does not work with WPS. WPS will be inaccessible. Do you want to continue?"))
	                                	return false;
	                }
		
			if(cf.security_type[1].checked == false)
				alert("The WEP security can only be supported on one SSID of each band"+"(2.4GHz/5GHz)");
	        }
		var channel_a=cf.w_channel_an.value;
		var country=cf.wl_WRegion.value;
		//transmit power control, according to the change of country, change values of wl_txctrl and wla_txctrl.
		wlan_txctrl(cf, wl_txctrl_web, wla_txctrl_web, channel_a, country);

	}

	return true;	
}

function check_wlan_guest(type)
{
	var cf=document.forms[0];
	var ssid = document.forms[0].gssid.value.replace(/\\/g,"\\\\\\\\").replace(/`/g,"\\\\\\`").replace(/"/g,"\\\"");
	var ssid_an = document.forms[0].ssid_an.value.replace(/\\/g,"\\\\\\\\").replace(/`/g,"\\\\\\`").replace(/"/g,"\\\"");
	//var space_flag=0;
	cf.s_gssid.value=ssid;
	cf.s_gssid_an.value=ssid_an;
	var wl_ssid=document.forms[0].wlssid.value.replace(/\\/g,"\\\\\\\\").replace(/`/g,"\\\\\\`").replace(/"/g,"\\\"");
	var wla_ssid=document.forms[0].wlassid.value.replace(/\\/g,"\\\\\\\\").replace(/`/g,"\\\\\\`").replace(/"/g,"\\\"");
	if(ssid == "")
	{
		alert("SSID cannot be blank.");
		return false;
	}
	if(ssid_an == "")
	{
		alert("SSID cannot be blank.");
		return false;
	}
        if(ssid == wl_ssid || ssid == wla_ssid)
        {
                alert("The SSID is duplicate, please change to another one.");
                return false;
        }
		if(ssid_an == wl_ssid || ssid_an == wla_ssid)
        {
                alert("The SSID is duplicate, please change to another one.");
                return false;
        }
	for(i=0;i<ssid.length;i++)
	{
		if(isValidChar_space(ssid.charCodeAt(i))==false)
		{
			alert(ssid + "Character is not allowed in SSID.");
			return false;
		}
	}
	for(i=0;i<ssid_an.length;i++)
	{
		if(isValidChar_space(ssid_an.charCodeAt(i))==false)
		{
			alert(ssid_an + "Character is not allowed in SSID.");
			return false;
		}
	}

	/* to fix bug 25082 */
	/*for(i=0;i<ssid.length;i++)
	{
		if(ssid.charCodeAt(i)!=32)
			space_flag++;
	}
	for(i=0;i<ssid_an.length;i++)
	{
		if(ssid_an.charCodeAt(i)!=32)
			space_flag++;
	}
	if(space_flag==0)
	{
		alert("SSID cannot be blank.");
		return false;

	}*/

	if(cf.enable_bssid.checked == true)
		cf.hidden_enable_guestNet.value=1;
	else
		cf.hidden_enable_guestNet.value=0;
	if(cf.enable_bssid_an.checked == true)
		cf.hidden_enable_guestNet_an.value=1;
	else
		cf.hidden_enable_guestNet_an.value=0;
		
	if(cf.enable_ssid_bc.checked == true)
		cf.hidden_enable_ssidbro.value=1;
	else
		cf.hidden_enable_ssidbro.value=0;
	if(cf.enable_ssid_bc_an.checked == true)
		cf.hidden_enable_ssidbro_an.value=1;
	else
		cf.hidden_enable_ssidbro_an.value=0;
		
	if(cf.enable_video_an.checked == true)
		cf.hidden_enable_video_an.value=1;
	else
		cf.hidden_enable_video_an.value=0;
	if(cf.enable_isolation_an.checked == true)
		cf.wla_guest_endis_wireless_isolation.value="1";
	else
		cf.wla_guest_endis_wireless_isolation.value="0";
	
	if(cf.enable_isolate.checked == true)
		cf.wlg_guest_endis_wireless_isolation.value="1";
	else
		cf.wlg_guest_endis_wireless_isolation.value="0";

	if(cf.allow_access.checked == true)
		cf.hidden_allow_guest.value=1;
	else
		cf.hidden_allow_guest.value=0;
	if(cf.allow_access_an.checked == true)
		cf.hidden_allow_guest_an.value=1;
	else
		cf.hidden_allow_guest_an.value=0;
	
	cf.wl_hidden_wlan_mode.value = wl_simple_mode;
	cf.wl_hidden_wlan_mode_an.value = wl_simple_mode_an;
	
	if(cf.security_type[1].checked == true)
	{
		cf.hidden_guest_network_mode_flag.value=0;
		cf.wl_hidden_wlan_mode.value = "1";
		if( checkwep(cf)== false)
			return false;
		cf.hidden_sec_type.value=2;
		for(i=0;i<cf.passphraseStr.value.length;i++)
		{
			if(isValidChar_space(cf.passphraseStr.value.charCodeAt(i))==false)
			{
				alert("Character is not allowed in passphrase.");
				return false;
			}
		}

		//if(parent.an_router_flag == 1)
			//alert("The WEP security can only be supported on one SSID of each band"+"(2.4GHz/5GHz)");
		//else
			alert("The WEP security can only be supported on one SSID of each band");
	}
	else if(cf.security_type[2].checked == true)
	{
		if( checkpsk(cf.passphrase, cf.sec_wpaphrase_len)== false)
			return false;

		//Bug 20177, the same as bug 19591 and 19803.
		//When user selects WPA-PSK(TKIP)+150Mbps and WPA-PSK(TKIP)+300Mbps, set wl_simple_mode=1,
		//or select "WPA-PSK [TKIP] + WPA2-PSK [AES]"+150Mbps and "WPA-PSK [TKIP] + WPA2-PSK [AES]"+300Mbps
		/*if(wl_simple_mode != "1")
		{
			if(confirm("IMPORTANT: WPA-PSK [TKIP] ONLY operates at \"Up to 54Mbps\"(legacy G) mode, not N mode.NETGEAR recommends that you use WPA2-PSK [AES] to get full N rate support.") == false)
			{
				cf.hidden_guest_network_mode_flag.value=0;
				return false;
			}
		}*/
		cf.hidden_guest_network_mode_flag.value=1;
		cf.wl_hidden_wlan_mode.value = "1";

		cf.hidden_sec_type.value=3;
		cf.hidden_wpa_psk.value = cf.passphrase.value.replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/"/g,"\\\"");
	}
	else if(cf.security_type[3].checked == true)
	{
		cf.hidden_guest_network_mode_flag.value=0;
		if( checkpsk(cf.passphrase, cf.sec_wpaphrase_len)== false)
			return false;
		cf.hidden_sec_type.value=4;
		cf.hidden_wpa_psk.value = cf.passphrase.value.replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/"/g,"\\\"");
	}	
	else if(cf.security_type[4].checked == true)
	{
		if( checkpsk(cf.passphrase, cf.sec_wpaphrase_len)== false)
			return false;
		
		if(wl_simple_mode != "1")
        {
			if(confirm("IMPORTANT\nWPA-PSK [TKIP] may only operate at \"Up to 54Mbps\" rate, not N rate.\nNETGEAR recommends that you use WPA2-PSK [AES] to get full N rate support.") == false)
			{
				cf.hidden_guest_network_mode_flag.value=0;
				return false;
			}
		}
		cf.hidden_guest_network_mode_flag.value=2;
		cf.wl_hidden_wlan_mode.value = wl_simple_mode;

		cf.hidden_sec_type.value=5;
		cf.hidden_wpa_psk.value = cf.passphrase.value.replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/"/g,"\\\"");
	}	
	else if(cf.security_type[5].checked == true)
	{
		if(cf.wpae_mode.value == "WPAE-TKIP")
		{
			/*if(wl_simple_mode != "1")
			{
				if(confirm("IMPORTANT: WPA-PSK [TKIP] ONLY operates at \"Up to 54Mbps\"(legacy G) mode, not N mode.NETGEAR recommends that you use WPA2-PSK [AES] to get full N rate support.") == false)
				{
					cf.hidden_guest_network_mode_flag.value=0;
					return false
				}
			}*/
			cf.hidden_guest_network_mode_flag.value=1;
			cf.wl_hidden_wlan_mode.value = "1";
		}
		else if(cf.wpae_mode.value == 'WPAE-TKIPAES')
		{
			if(wl_simple_mode != "1")
			{
				if(confirm("IMPORTANT\nWPA-PSK [TKIP] may only operate at \"Up to 54Mbps\" rate, not N rate.\nNETGEAR recommends that you use WPA2-PSK [AES] to get full N rate support.") == false)
				{
					cf.hidden_guest_network_mode_flag.value=0;
					return false;
				}
			}
			cf.hidden_guest_network_mode_flag.value=2;
			cf.wl_hidden_wlan_mode.value = wl_simple_mode;
			cf.textWpaeRadiusPort.value=port_range_interception(cf.textWpaeRadiusPort.value);
		}
		else
		{
			cf.hidden_guest_network_mode_flag.value=0;
			cf.wl_hidden_wlan_mode.value = wl_simple_mode;
		}
			
		radiusServerIP = cf.radiusIPAddr1.value+'.'+ cf.radiusIPAddr2.value + '.' + cf.radiusIPAddr3.value + '.' + cf.radiusIPAddr4.value;
		if( radiusServerIP == "" || checkipaddr(radiusServerIP) == false )
		{
			alert("Invalid IP address. Please enter it again.");
			return false;
		}
/*
		if(isSameSubNet(radiusServerIP,lanSubnet,lanIP,lanSubnet) == false && isSameSubNet(radiusServerIP,wanSubnet,wanIP,wanSubnet) == false)
        {
            alert("Invalid IP address. Please enter it again.");
			return false;
        }
*/		
		if( isSameIp(lanIP, radiusServerIP) == true )
		{
			alert("Invalid IP address. Please enter it again.");
			return false;
		}
		if( isSameIp(wanIP, radiusServerIP) == true )
		{
			alert("The IP address conflicts with the WAN IP subnet. Please enter a different IP address.");
			return false;
		}	
		cf.radiusServerIP.value = radiusServerIP;
		
		radiusPort=parseInt(cf.textWpaeRadiusPort.value,10);
		if( isNaN(radiusPort) || radiusPort < 1 || radiusPort > 65535 )
		{
			alert("The RADIUS server Port must be in the range [1- 65535]!");
			return false;
		}
		cf.textWpaeRadiusPort.value=radiusPort;
		if( cf.textWpaeRadiusSecret.value == "" )
		{
			alert("Invalid password.");
			return false;
		}
		if( cf.textWpaeRadiusSecret.length > 128 )
		{
			alert("Please enter 1 to 128 characters (octets) in the RADIUS server Shared Secret field!");
			return false;
		}
                for(i=0;i<cf.textWpaeRadiusSecret.value.length;i++)
		{
			if(isValidChar(cf.textWpaeRadiusSecret.value.charCodeAt(i))==false)
			{
				alert("Please enter 1 to 128 characters (octets) in the RADIUS server Shared Secret field!");
				cf.textWpaeRadiusSecret.focus();
				return false;
			}
		}
		cf.hidden_WpaeRadiusSecret.value = cf.textWpaeRadiusSecret.value.replace(/\\/g,"\\\\\\\\").replace(/`/g,"\\\\\\`").replace(/"/g,"\\\"");

/*		if (!confirm("WPA/WPA2 Enterprise cannot work with WPS. WPS is going to become inaccessible. Do you want to continue?"))
			return false;			
*/
		cf.hidden_sec_type.value=6;
	}	
	else
		cf.hidden_sec_type.value=1;
		
	if(cf.security_type_an[1].checked == true)
	{
		cf.hidden_guest_network_mode_flag_an.value=0;
		cf.wl_hidden_wlan_mode_an.value = "1";
		if( checkwep_a(cf)== false)
			return false;
		cf.hidden_sec_type_an.value=2;
		for(i=0;i<cf.passphraseStr_an.value.length;i++)
		{
			if(isValidChar_space(cf.passphraseStr_an.value.charCodeAt(i))==false)
			{
				alert("Character is not allowed in passphrase.");
				return false;
			}
		}

		//if(parent.an_router_flag == 1)
			alert("The WEP security can only be supported on one SSID of each band"+"(2.4GHz/5GHz)");
		//else
			//alert("The WEP security can only be supported on one SSID of each band");
	}
	else if(cf.security_type_an[2].checked == true)
	{
		if( checkpsk(cf.passphrase_an, cf.sec_wpaphrase_len_an)== false)
			return false;

		//Bug 20177, the same as bug 19591 and 19803.
		//When user selects WPA-PSK(TKIP)+150Mbps and WPA-PSK(TKIP)+300Mbps, set wl_simple_mode=1,
		//or select "WPA-PSK [TKIP] + WPA2-PSK [AES]"+150Mbps and "WPA-PSK [TKIP] + WPA2-PSK [AES]"+300Mbps
		/*if(wl_simple_mode != "1")
		{
			if(confirm("IMPORTANT: WPA-PSK [TKIP] ONLY operates at \"Up to 54Mbps\"(legacy G) mode, not N mode.NETGEAR recommends that you use WPA2-PSK [AES] to get full N rate support.") == false)
			{
				cf.hidden_guest_network_mode_flag.value=0;
				return false;
			}
		}*/
		cf.hidden_guest_network_mode_flag_an.value=1;
		cf.wl_hidden_wlan_mode_an.value = "1";

		cf.hidden_sec_type_an.value=3;
		cf.hidden_wpa_psk_an.value = cf.passphrase_an.value.replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/"/g,"\\\"");
	}
	else if(cf.security_type_an[3].checked == true)
	{
		cf.hidden_guest_network_mode_flag_an.value=0;
		if( checkpsk(cf.passphrase_an, cf.sec_wpaphrase_len_an)== false)
			return false;
		cf.hidden_sec_type_an.value=4;
		cf.hidden_wpa_psk_an.value = cf.passphrase_an.value.replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/"/g,"\\\"");
	}	
	else if(cf.security_type_an[4].checked == true)
	{
		if( checkpsk(cf.passphrase_an, cf.sec_wpaphrase_len_an)== false)
			return false;
		
		if(wl_simple_mode_an != "1")
        {
			if(confirm("IMPORTANT\nWPA-PSK [TKIP] may only operate at \"Up to 54Mbps\" rate, not N rate.\nNETGEAR recommends that you use WPA2-PSK [AES] to get full N rate support.") == false)
			{
				cf.hidden_guest_network_mode_flag_an.value=0;
				return false;
			}
		}
		cf.hidden_guest_network_mode_flag_an.value=2;
		cf.wl_hidden_wlan_mode_an.value = wl_simple_mode_an;

		cf.hidden_sec_type_an.value=5;
		cf.hidden_wpa_psk_an.value = cf.passphrase_an.value.replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/"/g,"\\\"");
	}	
	else if(cf.security_type_an[5].checked == true)
	{
		if(cf.wpae_mode_an.value == "WPAE-TKIP")
		{
			/*if(wl_simple_mode != "1")
			{
				if(confirm("IMPORTANT: WPA-PSK [TKIP] ONLY operates at \"Up to 54Mbps\"(legacy G) mode, not N mode.NETGEAR recommends that you use WPA2-PSK [AES] to get full N rate support.") == false)
				{
					cf.hidden_guest_network_mode_flag.value=0;
					return false
				}
			}*/
			cf.hidden_guest_network_mode_flag_an.value=1;
			cf.wl_hidden_wlan_mode_an.value = "1";
		}
		else if(cf.wpae_mode_an.value == 'WPAE-TKIPAES')
		{
			if(wl_simple_mode_an != "1")
			{
				if(confirm("IMPORTANT\nWPA-PSK [TKIP] may only operate at \"Up to 54Mbps\" rate, not N rate.\nNETGEAR recommends that you use WPA2-PSK [AES] to get full N rate support.") == false)
				{
					cf.hidden_guest_network_mode_flag_an.value=0;
					return false;
				}
			}
			cf.hidden_guest_network_mode_flag_an.value=2;
			cf.wl_hidden_wlan_mode_an.value = wl_simple_mode_an;
			cf.textWpaeRadiusPort_an.value=port_range_interception(cf.textWpaeRadiusPort_an.value);
		}
		else
		{
			cf.hidden_guest_network_mode_flag_an.value=0;
			cf.wl_hidden_wlan_mode_an.value = wl_simple_mode_an;
		}
			
		radiusServerIP = cf.radiusIPAddr1_an.value+'.'+ cf.radiusIPAddr2_an.value + '.' + cf.radiusIPAddr3_an.value + '.' + cf.radiusIPAddr4_an.value;
		if( radiusServerIP == "" || checkipaddr(radiusServerIP) == false )
		{
			alert("Invalid IP address. Please enter it again.");
			return false;
		}
/*
		if(isSameSubNet(radiusServerIP,lanSubnet,lanIP,lanSubnet) == false && isSameSubNet(radiusServerIP,wanSubnet,wanIP,wanSubnet) == false)
        {
            alert("Invalid IP address. Please enter it again.");
			return false;
        }
*/		
		if( isSameIp(lanIP, radiusServerIP) == true )
		{
			alert("Invalid IP address. Please enter it again.");
			return false;
		}
		if( isSameIp(wanIP, radiusServerIP) == true )
		{
			alert("The IP address conflicts with the WAN IP subnet. Please enter a different IP address.");
			return false;
		}	
		cf.radiusServerIP_a.value = radiusServerIP;
		
		radiusPort=parseInt(cf.textWpaeRadiusPort_an.value,10);
		if( isNaN(radiusPort) || radiusPort < 1 || radiusPort > 65535 )
		{
			alert("The RADIUS server Port must be in the range [1- 65535]!");
			return false;
		}
		cf.textWpaeRadiusPort_an.value=radiusPort;
		if( cf.textWpaeRadiusSecret_an.value == "" )
		{
			alert("Invalid password.");
			return false;
		}
		if( cf.textWpaeRadiusSecret_an.length > 128 )
		{
			alert("Please enter 1 to 128 characters (octets) in the RADIUS server Shared Secret field!");
			return false;
		}
                for(i=0;i<cf.textWpaeRadiusSecret_an.value.length;i++)
		{
			if(isValidChar(cf.textWpaeRadiusSecret_an.value.charCodeAt(i))==false)
			{
				alert("Please enter 1 to 128 characters (octets) in the RADIUS server Shared Secret field!");
				cf.textWpaeRadiusSecret_an.focus();
				return false;
			}
		}
		cf.hidden_WpaeRadiusSecret_a.value = cf.textWpaeRadiusSecret_an.value.replace(/\\/g,"\\\\\\\\").replace(/`/g,"\\\\\\`").replace(/"/g,"\\\"");

/*		if (!confirm("WPA/WPA2 Enterprise cannot work with WPS. WPS is going to become inaccessible. Do you want to continue?"))
			return false;			
*/
		cf.hidden_sec_type_an.value=6;
	}	
	else
		cf.hidden_sec_type_an.value=1;
		
/*        if(cf.security_type[1].checked == true)
        {
                if ( cf.authAlgm.value == 1 && cf.enable_guestNet.checked == true)
                {
                        if (!confirm(wep_or_wps))
                                return false;
                }
        }
*/
	return true;
}
