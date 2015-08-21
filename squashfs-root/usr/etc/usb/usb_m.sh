#!/bin/sh

echo ">> $0 $1 $2 $3 $4" > /dev/console

idx=0

while [ ! -f "/proc/${1}_async" ] && [ $idx -lt 20 ]; do
        echo "Wait USB $1 async ($idx)" > /dev/console
        let idx=idx+1
        /usr/sbin/sleep 1
done

if [ $idx -eq 20 ]
then
    echo "async not done in 20 seconds, exit" > /dev/console
    exit 
fi

while [ -f "/tmp/keep_usb_u" ]; do
        echo "Wait USB umount finish!!!" > /dev/console
        /usr/sbin/sleep 1
done

while [ -f "/tmp/keep_usb_m" ]; do
        echo "Wait USB $1" > /tmp/wait_usb_m_$1
        /usr/sbin/sleep 1
done

if [ -f /tmp/wait_usb_m_$1 ]; then
        rm /tmp/wait_usb_m_$1
fi

echo "keep" > /tmp/keep_usb_m

if [ ! -d /tmp/sd ]; then
mkdir /tmp/sd
fi

echo $2 > /tmp/sd/$1
echo $3 >> /tmp/sd/$1
echo $4 >> /tmp/sd/$1


/usr/sbin/mknod_sd $1

/sbin/sleep 2
/usr/sbin/rc sd mount $1

rm /tmp/keep_usb_m
/sbin/sleep 5
/usr/sbin/rc mediaserver restart
