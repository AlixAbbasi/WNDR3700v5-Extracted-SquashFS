function change_size()
{
	setFooterClass();
	var footer_div = document.getElementById("footer");
	var is_double = ( footer_div.className == "footer_double") ;

	if(isIE_or_Opera())
	{
		var width = document.documentElement.clientWidth - 40;
		document.getElementById("container").style.width = width > 820 ? width : "820px" ;
		document.getElementById("formframe_div").style.width = width > 820 ? width - 195 + "px" : "625px";
		footer_div.style.width = width + 5 + "px";
		
		var height = document.documentElement.clientHeight - 97;
		if( (height > 460 && !is_double) || (height > 503 && is_double) )
		{ document.getElementById("formframe_div").style.height = is_double ? height-93 + "px" : height-50 + "px"; }
		else
		{ document.getElementById("formframe_div").style.height = "410px"; }
		/*
		if( (height > 460 && !is_double) || (height > 503 && is_double) )
		{
			document.getElementById("container").style.height = height;
			document.getElementById("middle").style.height = height-5;
			document.getElementById("menu").style.height = is_double ? height-93 : height-50;
			document.getElementById("formframe_div").style.height = is_double ? height-93 : height-50;
		}
		else
		{
			document.getElementById("container").style.height = is_double ? "503px" : "460px";
			document.getElementById("middle").style.height = is_double ? "498px" : "455px";
			document.getElementById("menu").style.height = "410px";
			document.getElementById("formframe_div").style.height = "410px";
		}
		*/
	}
	document.getElementById("middle").style.minHeight = is_double ? "498px" : "455px";
	document.getElementById("formframe_div").style.bottom = is_double ? "88px" : "45px";
}

function basic_menu_class_default()
{
	var menu_div = top.document.getElementById("menu");
	var menu_btns = menu_div.getElementsByTagName("div");
	var max_len = 20;

	if(top.gui_region == "French" || top.gui_region == "Italian" || top.gui_region == "Dutch" || top.gui_region == "German" || top.gui_region == "Greek" || top.gui_region == "Polish")////special handling for FR and IT and DU GR...
		max_len = 21;

	var i;
	for(i=0; i<menu_btns.length; i++)
	{
		var words_len = menu_btns[i].getElementsByTagName("span")[0].innerHTML.length;

		if(words_len > max_len)
			menu_btns[i].className = "basic_button_big";
		else
			menu_btns[i].className = "basic_button";
	}
	/*parental not need in AP Mode*/
	if(top.enable_ap_flag== 1)
	{
		var parental_div = top.document.getElementById("parental");
		parental_div.className = parental_div.className + "_grey";
	}
	if(top.enabled_wds==1 || top.enable_ap_flag== 1)
	{
		var internet_div = top.document.getElementById("internet");
		var cloud_div = top.document.getElementById("cloud");
		internet_div.className = internet_div.className + "_grey";
		cloud_div.className = cloud_div.className + "_grey";
	}
	if(top.is3g_mode == "1")
	{
		var cloud_div = top.document.getElementById("cloud");
		cloud_div.className = cloud_div.className + "_grey";
	}

	if(top.enabled_wds == 1)
	{
		var wds_div = top.document.getElementById("guest");
		wds_div.className = wds_div.className + "_grey";
	}

}

function basic_menu_color_change( change_id )
{
	basic_menu_class_default();

	var clicked_item = top.document.getElementById(change_id);
	clicked_item.className = clicked_item.className + "_purple";
}

function click_action(id)
{
        if( enable_action )
        {
                if( id == "home")
                {
                        basic_menu_color_change('home');
                        goto_formframe('setup.cgi?todo=changeBylanguage&next_file=basic_wait.htm');
                }
                else if( id == "internet" && top.enabled_wds == 0 && top.enable_ap_flag != 1 )
                {
                    basic_menu_color_change('internet');
					goto_formframe('BAS_basic.htm&todo=cfg_init');
                }
                else if( id == "wireless" )
                {
                        basic_menu_color_change('wireless');
			if( top.endis_wl_radio == '1' || top.endis_wla_radio == '1' )
				goto_formframe('WLG_dualband_idx.htm&todo=cfg_init');
			else
				goto_formframe('WLG_dualband_adv.htm&todo=cfg_init');
                }
                else if( id == "attached" )
                {
                        basic_menu_color_change('attached');
                        //goto_formframe('setup.cgi?todo=nbtscan&next_file=DEV_devices.htm');
                        goto_formframe('DEV_wait_nbt.htm&todo=cfg_init');
                }
                else if( id == "parental" && top.enable_ap_flag != 1)
                {
                        basic_menu_color_change('parental');
			if(top.parental_ctrl_flag != 0 && top.ParentalControl == "1")
				open_window('http://netgear.opendns.com');
			else
				open_window('http://www.netgear.com/lpc');
                }
                else if( id == "readyshare" )
                {
                        basic_menu_color_change('readyshare');
                        goto_formframe('usb_basic.htm&todo=cfg_init');
                }
                else if( id == "guest" && top.enabled_wds == 0 )
                {
                        basic_menu_color_change('guest');
                        goto_formframe("WLG_dualband_guest_idx.htm&todo=cfg_init");
                }
                else if( id == "turbovideo")
                {
                        basic_menu_color_change('turbovideo');
                        goto_formframe('QOS_turbovideo.htm');
                }
                else if( id == "greendown")
                {
                        basic_menu_color_change('greendown');
                        goto_formframe('GD_download_manage.htm&todo=cfg_init');
                }
                else if( id == "cloud" && top.enabled_wds == 0 && top.enable_ap_flag != 1 && top.is3g_mode == "0")
                {
                		basic_menu_color_change('cloud');
                    goto_formframe('FW_cloud.htm&todo=cfg_init');
                }
				else if( id == "no_internet" )
				{
					basic_menu_color_change('internet');
					if(portstatus == 0)
						location.href = "WIZ_sel.htm&todo=cfg_init"
					else
					//	document.forms[0].submit();
						location.href = "WIZ_sel.htm&todo=cfg_init";
				}

        }
}

function setIconClass(id, words)
{
	var words_div = document.getElementById(id);
	var words_len = words.length;
	if( words_len >= 35 )
		words_div.className = "icon_status_smallFonts";
	else if(words_len >= 25)
		words_div.className = "icon_status_double";
	else if( gui_region == "Russian" && words_len >= 20)
		words_div.className = "icon_status_double";
}

function setIconClass_noDouble(id, words)
{
        var words_div = document.getElementById(id);
        var words_len = words.length;
        if(words_len >= 25)
                words_div.className = "icon_status_smallFonts";
        else if( gui_region == "Russian" && words_len >= 20)
                words_div.className = "icon_status_smallFonts";

}

