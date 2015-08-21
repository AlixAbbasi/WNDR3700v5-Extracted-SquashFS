function change_volumn_time()
{
	var cf=document.forms[0];
	if(cf.tm_type[0].checked == true)
	{
		cf.conntime_monthly_limit.disabled = true;
		cf.traff_dir.disabled = false;
		cf.volume_monthly_limit.disabled = false;
		if(basic_type == 1)
			cf.round_up_volume.disabled = true;
		else
			cf.round_up_volume.disabled = false;
	}
	else
	{
		cf.conntime_monthly_limit.disabled = false;
		cf.traff_dir.disabled = true;
		cf.volume_monthly_limit.disabled = true;
		cf.round_up_volume.disabled = true;	
	}
}

function set_gray()
{
	var cf=document.forms[0];
	var dflag;
	dflag=(!(cf.checkTraffic.checked));
	setDisabled ( dflag, cf.tm_type[0], cf.tm_type[1], cf.traff_dir, cf.volume_monthly_limit, cf.round_up_volume, cf.conntime_monthly_limit, cf.hour, cf.minute,  cf.day,  cf.waterMark, cf.checkLed, cf.checkBlock, cf.ampm,cf.restartCounter, cf.refresh, cf.trafficStatus);	//cf.restartCounter, cf.refresh, cf.trafficStatus,
	if( basic_type == 1)
		setDisabled ( true, cf.round_up_volume, cf.tm_type[1], cf.conntime_monthly_limit);

	if(cf.checkTraffic.checked == true)
	{
	document.getElementById("restart").className  = "long_common_bt";
	document.getElementById("refresh").className  = "common_bt";
	document.getElementById("status").className  = "common_bt";	
	change_volumn_time();
	}
	else
	{
	document.getElementById("restart").className  = "long_common_gray_bt";
	document.getElementById("refresh").className  = "common_gray_bt";
	document.getElementById("status").className  = "common_gray_bt";
	}

}

function check_traffic_apply(cf)
{
	var cf=document.forms[0];
	if(cf.checkTraffic.checked == true)
		cf.endis_traffic.value=1;
	else
		cf.endis_traffic.value=0;
	if(cf.checkTraffic.checked == true)
	{

		if(cf.tm_type[0].checked)
		{
			if(cf.volume_monthly_limit.value=='')
			{
				alert("Invalid numeric value for Monthly Limit.\n");
				return false;
			}
			if(!_isNumeric(cf.volume_monthly_limit.value))
        		{
                		alert("Invalid numeric value for Monthly Limit.\n");
                		return false;
        		}
			if(parseInt(cf.volume_monthly_limit.value)>999999)
			{
				alert("Invalid numeric value for Monthly Limit.\n");
                                return false;				
			}
			if(cf.round_up_volume.value=='')
			{
				alert("Invalid round up data volume.");
				return false;
			}
			if(!_isNumeric(cf.round_up_volume.value))
                        {
                                alert("Invalid round up data volume.");
                                return false;
                        }
			if(cf.waterMark.value=='')
			{
				alert("Invalid numeric value for Watermark at traffic control.\n");
				return false;
			}
			if(!_isNumeric(cf.waterMark.value))
                        {
                                alert("Invalid numeric value for Watermark at traffic control.\n");
                                return false;
                        }
			if(parseInt(cf.waterMark.value) > parseInt(cf.volume_monthly_limit.value))
			{
				alert("Watermark value should be less than Monthly Limit.\n");
				return false;
			}
			if( basic_type == 1 && cf.round_up_volume.value != "0" )/* to fix bug 23024 */
			{
				cf.round_up_volume.value = "0";
			}
			if(parseInt(cf.round_up_volume.value) > parseInt(cf.volume_monthly_limit.value))
			{
				alert("Round up data volume for each connection by should be smaller than the Monthly limit");
				return false;
			}
			cf.hidden_round_up.value=cf.round_up_volume.value;
		}
		else
		{
			if(cf.conntime_monthly_limit.value=='')
			{
				alert("Invalid numeric value for Monthly Limit.\n");
				return false;
			}
			if(!(cf.conntime_monthly_limit.value <= 744))
			{
				alert("The monthly limit field should less than 744 hours (24*31).");
				return false;
			}
			var str1 = cf.conntime_monthly_limit.value;
			var arry = str1.split('.');
			if (arry.length>1)
			{
				alert("Monthly limit must be an integer!");
				return false;
			}
			if(cf.waterMark.value=='')
                        {
                                alert("Invalid numeric value for Watermark at traffic control.\n");
                                return false;
                        }
                        if(!_isNumeric(cf.waterMark.value))
                        {
                                alert("Invalid numeric value for Watermark at traffic control.\n");
                                return false;
                        }
			if(parseInt(cf.waterMark.value) > parseInt(cf.conntime_monthly_limit.value)*60)
			{
				alert("Watermark value should be less than Monthly Limit.\n");
				return false;
			}
		}
		if ((cf.hour.value < 0) || (cf.hour.value > 11) ||
			(cf.minute.value < 0) || (cf.minute.value > 59) )
			{
				alert("Invalid time input.");
				return false;
			}
		if ((!_isNumeric(cf.hour.value)) ||
				(!_isNumeric(cf.minute.value)))
			{
				alert("Invalid time input.");
				return false;
			}

		if ((cf.hour.value == '') || (cf.minute.value == ''))
			{
				alert("Invalid time input.");
				return false;
			}
		var hour=cf.hour.value;
		var minute=cf.minute.value
		if(hour.length<2)
			hour="0"+hour;
		if(minute.length<2)
			minute="0"+minute;
		if(cf.ampm.selectedIndex==1)
		{
			hour=parseInt(hour,10)+12;
			hour=hour.toString();
		}	
		cf.restart_counter_time.value=hour+':'+minute;
		if(cf.checkLed.checked == true)
			cf.traffic_led.value=1;
		else
			cf.traffic_led.value=0;
		if(cf.checkBlock.checked == true)
			cf.traffic_block_all.value=1;
		else
			cf.traffic_block_all.value=0;
	}
	
	return true;
}

function click_restart()
{
	var cf=document.forms[0];
	if(cf.checkTraffic.checked == true)
	{
	    if(!confirm("Restart Counter?"))
			return false;
		cf.submit_flag.value="traffic_reset";
		cf.submit();
	}

}

function click_refresh_2()
{
	var cf=document.forms[0];
	if (cf.checkTraffic.checked == true)
	{
		location.href='traffic.htm';
	}
}

function click_status()
{
	var cf=document.forms[0];
	if (cf.checkTraffic.checked == true)
	{
		window.open('show_traffic.htm','show_traffic','width=600,height=400,top=200,left=200,status=yes');
	}
}

function reset_time()
{
	cf=document.forms[0];
	if( cf.timeset.value == "")
	{
		cf.timeset.value = "10";
		return true;
	}
	var timeset=cf.timeset.value;

        for(i=0;i<timeset.length;i++)
        {
                c=timeset.charAt(i);
                if("0123456789".indexOf(c,0)<0)
                {
			alert("The valid range of Poll Interval is between 5 and 86400 seconds. ");
                        return false;
                }
        }

	timeset=parseInt(timeset);
	if(!(	timeset >=5 && timeset<=  86400))
	{
		alert("The valid range of Poll Interval is between 5 and 86400 seconds. ");
		return false;
	}

	return true;
}

function click_refresh()
{
	cf=document.forms[0];
	cf.submit_flag.value="refresh_traffic"
	cf.action="/cgi-bin/no_commit.cgi?/cgi-bin/traffic.htm"
	cf.submit();
}

