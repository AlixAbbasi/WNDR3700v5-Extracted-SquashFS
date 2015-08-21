function click_backup()
{
	document.forms[0].action="/backup.cgi";
	document.forms[0].submit();
}

function check_restore()
{
	cf=document.forms[0];
	if (cf.mtenRestoreCfg.value.length == 0)
	{
		alert("File name cannot be blank.");
		return false;
	}
	var filestr=cf.mtenRestoreCfg.value;
	var file_format=filestr.substr(filestr.lastIndexOf(".")+1);
	if (file_format!="cfg")
	{
		alert("Please assign the correct file. The file format is *."+"cfg");
		return false;
	} 

	if (confirm("Warning! \nRestoring settings from a configuration file will erase all of the current settings. \nAre you sure you want to do this?"))
	{	
		cf.action="/restore.cgi?/restore_process.htm";
		top_left_nolink();
		top.enable_action=0;
		cf.submit();
	}
	else 
		return false;
}

function click_yesfactory()
{
	cf=document.forms[0];
	cf.action="/apply.cgi?/pls_wait_factory_reboot.html timestamp="+ts;
	top_left_nolink();
	top.enable_action=0;
	cf.submit();
}
