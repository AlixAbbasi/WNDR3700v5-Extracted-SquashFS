#!/bin/sh

#Enlarge the system memory reclaim threshold to prevent from OOM kernel
echo 3 > /proc/sys/vm/drop_caches
free_mem=`cat /proc/meminfo|grep MemFree|sed 's/MemFree://g' |sed 's/ kB//g'`; 
min_free=`expr $free_mem / 4 `; 
echo $min_free > /proc/sys/vm/min_free_kbytes
