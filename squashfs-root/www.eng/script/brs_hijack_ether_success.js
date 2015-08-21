function initPage()
{
	if(pre_set_security == "1")
		preSecurityInit();
	else
		noPreSecurityInit();
}

function preSecurityInit()
{
	//initial the buttons text and onclick action
	initBtnsAction();
}

function noPreSecurityInit()
{
	var security_info_div = document.getElementById("info_div");
	security_info_div.style.display = "none";

	//initial the buttons text and onclick action
	initBtnsAction();
}

function initBtnsAction()
{
	//buttons left
	var btns_div1 = document.getElementById("btnsContainer_div1");
	btns_div1.onclick = function()
	{
		return mobileSettings();
	}

	//buttons middle
	var btns_div2 = document.getElementById("btnsContainer_div2");
	btns_div2.onclick = function()
	{
		return printSucessPage();
	}

	//buttons middle
	var btns_div3 = document.getElementById("btnsContainer_div3");
	/*btns_div3.onclick = function()		------	for tmp
	{
		if(isMIIISUP_region == "0")
			return toInternet();
		else if(isMIIISUP_region == "1")
			return toMiiicasa();
	}						--------for tmp
	*/
	btns_div3.onclick = function()
	{
		toAppDownload();
	}
	var btns_div4 = document.getElementById("btnsContainer_div4");
	btns_div4.onclick = function()
	{
		return toMiiicasa();
	}

	//show firmware version
        showFirmVersion("none");
}

function addTooltip(tooltip_name)
{
	tooltip_name.setAttribute("title", bh_rollover_help_text);
	tooltip_name.className = "tooltip";
}

function printSucessPage()
{
	if (window.print)
		window.print();
	else
	{
		alert(getErrorMsgByVar("bh_not_support_print"));
		return false;
	}

	return true;
}

function mobileSettings()
{
	var forms = document.getElementsByTagName("form");
	var cf = forms[0];

    showFirmVersion("none");
	cf.submit();

	return true;
}

function toInternet()
{

	var winoptions = "width=960,height=800,menubar=yes,scrollbars=yes,toolbar=yes,status=yes,location=yes,resizable=yes";
	window.open("BRS_netgear_success.html",null,winoptions);

	return true;
}

function toMiiicasa()
{

	var winoptions = "width=960,height=800,menubar=yes,scrollbars=yes,toolbar=yes,status=yes,location=yes,resizable=yes";
	//window.open("http://www.miiicasa.com/go",null,winoptions);
	window.open("BRS_miiicasa_success.html",null,winoptions);
	return true;
}
function isMac_or_Windows()
{
	var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
	var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
	if(isMac)
		return "MAC";
	if(isWin)
		return "Win";
}
function toAppDownload()
{
	var OS = isMac_or_Windows();
	if(OS == "Win")
	{
		this.location.href = "BRS_Windows_app_download.html";
	}
	else if(OS == "MAC")
	{
		this.location.href = "BRS_Mac_app_download.html";
	}
	else
		this.location.href = "setup.cgi?todo=wizard_upg_detfw";
	return true;
}
addLoadEvent(initPage);
