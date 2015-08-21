#Make PID need HW_ID VER PRODUCT_ID
BOARD_ID=WNDR3700v5
HW_ID=AYB
#the 2nd digit of VER must not be 0
VER=1.1.0.30
SUB_VER=1.0.1
GUI_VER=1.1.0.30
HW_TYPE=WNDR3700v5
PRODUCT_ID=A001
REGION=WW

#------------------------------------------------#
# just for Makefile to check if it is using right sdk
NEEDED_SDKPATH=sdk4210

MODULE=Netgear
COMPANY=72
# Do we have ADSL WAN? 1-Yes 0-No
ADSL=0
ANNEX=V
WIFI=1
USB=1
EXT4=1
IPMAC=1
FLASH_TYPE_USE_NOR=0
FLASH=16M
#------------------------------------------------#

MULTI_PVC=0
VPN=0
MT_CODE=0
ADSL2=0
BRIDGE=0
SNMP=0
DNSHJ=1
SIPALG=1
TMSS=0
VOIP=0
CA=1
POT=1
RIP=1
DPF=0
LLTD=1
IGMP=1
PPTPC=1
L2TP=1
BCM_WPS=1
MSSID=1
WIZARD_LOG=1
SETUPWIZARD=1
DSLDIAG=0
PORTTRIGGER=1
PORTFORWARD=1
HTTPS=1
SMTP_SSL=1
TIME_MACHINE=0
# connect track manager module, 1=yes, 0=no
CT_MGR=1
IPV6=1
IPQOS=1
FIREWALL=1
TURBO_VIDEO=1
TR069=0
TRAFFIC_METER=1
HACK_DNS=1
# Netgear Router Debugging Mode -- Spec V1.9
DEBUG_MODE=1
WIFI_ISOLATION=1
# Hide password in config file
HIDDEN_PASSWORD=1
# USB Green Download: need support USB first
GREEN_DOWNLOAD=0
#..................special feature...............#
US_ONLY=0
AUTOUPG=1
MODIFYMAC=0
OPENDNS=1
CONENAT=1
IP_ASSIGN_CHK=1
#------------------------------------------------#
DEFAULT_FILE=default.wndr3700v5
PROJECT_DEFINES_H_FILE=sc_project_defines_wndr3700v5.h
IF_NAME_H_FILE=if_name_gmac2.h
SC_KERNEL_CONFIG_FILE=jndr3710_linux_config_normal_gmac2_spi
SC_SINGLE_SKU_DIR=wndr3700v5_singlesku_02261739
#................. SetUpWizard 3.0...............#
SingleWIFI=1
#................. Block Site ...................#
ALL_TCP_CHECK=1
#................. dirty solution, it will be fixed later .................#
TEMP_SOLUTION=0
CHIP_VENDOR=MTK
#CHIP_VENDOR=RTL

#-------------------genie GUI--------------------#
GENIE_GUI=1
#-------------------Russia Multi-wan--------------------#
RUSSIA_SUPPORT=1
#----------------------DLNA-------------------------#
DLNA=1
USE_MINIDLNA=1
#----------------------BT client-------------------------#
TRANSMISSION=0
NEW_TRANSMISSION=0

DUAL_BAND=1
#.........iTunes server, depends on TIME_MACHINE.............#
ITUNES_SERVER=0
OPENSSL_USE=openssl-0.9.8zf
#..................3G Feature....................#
3G_FEATURE=0
DETECT_SIM_INFO_V1=0
FAILOVER=0
#................WIFI AP Mode...............#
WIFI_AP=1
#................IPTV...............#
ENABLE_IPTV=0
MIIICASA=0
WPA_PSK=0
NTGR_CLOUD=0
#................Dynamic model name...............#
DYNAMIC_MODEL_NAME=1
#................Follow Soap API spec 2.00...................#
SOAP_V2=1
#................Facebook WiFi...................#
FBWIFI=0
#................VLAN support....................#
VLAN_SUPPORT=0
#-----------------AUTO IP for Spec Recv 13----------------#
AUTOIP=1
OPENVPN=1
#-----------------Access Control--------------------#
ACCESSCNTL=1
#-----------------SpeedTest-------------------#
SPEEDTEST=1
#Microsoft PNP-x Support
PNPX=1
GUI_V14=1
PARAGON_NTFS=1
GUEST_MANAGEMENT=0
#---------------need support GUI_V14 first-------------------------------#
DETECT_AP=0
KWILT=0
TX_POWER_CONTROL_SHOW=1
#--------------XCLOUD: Remote Genie & Ready CLOUD-------------------------------#
XCLOUD=0
