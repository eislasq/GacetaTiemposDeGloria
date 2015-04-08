#!/bin/bash

#unsignedApk=$1
#outApk=$2

#construye
cordova build --release

#firma
jarsigner -tsa https://timestamp.geotrust.com/tsa -verbose -sigalg SHA1withRSA -digestalg SHA1\
 -keystore ~/Dropbox/Certificado\ Android/IslasCruz.keystore platforms/android/ant-build/CordovaApp-release-unsigned.apk ic
 
#jarsigner -verify -verbose -certs platforms/android/ant-build/CromaliaNegocios-release-unsigned.apk

#alinea
rm gaceta-signed.apk
$ANDROID_HOME/build-tools/19.1.0/zipalign -v 4 platforms/android/ant-build/CordovaApp-release-unsigned.apk gaceta-signed.apk

