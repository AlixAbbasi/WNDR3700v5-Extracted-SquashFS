#/bin/sh
# copy from config-udhcpd.sh 

export PATH=/sbin:/bin:/usr/sbin:/usr/bin:/usr/sbin/scripts

#  arg1:  phy address.
link_down()
{
	echo down port $1 > /dev/console

	# get original register value
	get_mii=`mii_mgr -g -p $1 -r 0`
	orig=`echo $get_mii | sed 's/^.....................//'`

	# stupid hex value calculation.
	pre=`echo $orig | sed 's/...$//'`
	post=`echo $orig | sed 's/^..//'` 
	num_hex=`echo $orig | sed 's/^.//' | sed 's/..$//'`
	case $num_hex in
		"0")	rep="8"	;;
		"1")	rep="9"	;;
		"2")	rep="a"	;;
		"3")	rep="b"	;;
		"4")	rep="c"	;;
		"5")	rep="d"	;;
		"6")	rep="e"	;;
		"7")	rep="f"	;;
		# The power is already down
		*)		echo "Port$1 is down. Skip." > /dev/console ;return;;
	esac
	new=$pre$rep$post
	# power down
	mii_mgr -s -p $1 -r 0 -v $new
}

link_up()
{
	echo up port $1 > /dev/console

	# get original register value
	get_mii=`mii_mgr -g -p $1 -r 0`
	orig=`echo $get_mii | sed 's/^.....................//'`

	# stupid hex value calculation.
	pre=`echo $orig | sed 's/...$//'`
	post=`echo $orig | sed 's/^..//'` 
	num_hex=`echo $orig | sed 's/^.//' | sed 's/..$//'`
	case $num_hex in
		"8")	rep="2"	;;
		"9")	rep="3"	;;
		"a")	rep="2"	;;
		"b")	rep="3"	;;
		"c")	rep="6"	;;
		"d")	rep="7"	;;
		"e")	rep="6"	;;
		"f")	rep="7"	;;
		# The power is already up
		*)		echo "Port$1 is up. Skip." > /dev/console;return;;
	esac
	new=$pre$rep$post
	# power up
	mii_mgr -s -p $1 -r 0 -v $new
}
usage()
{
	echo $0 up/down portnum 
}


if [ "$#" != "2" ]; then
	usage;
	exit 1
fi


if [ $1 = "down" ];
then
	if [ "$2" = "0" -o "$2" = "1" -o "$2" = "2" -o "$2" = "3" ];
	then
		link_down $2
	else
		usage
	fi
else 
if [ $1 = "up" ];
then
        if [ "$2" = "0" -o "$2" = "1" -o "$2" = "2" -o "$2" = "3" ];
        then    
                link_up $2
	else
		usage
        fi
else
	usage
fi
fi







