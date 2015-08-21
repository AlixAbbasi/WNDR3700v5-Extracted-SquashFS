#!/bin/sh
sleep 2
echo "/usr/sbin/rc l2tp restart" > /tmp/relive_l2tp
/usr/bin/killall -SIGINT cmd_agent


