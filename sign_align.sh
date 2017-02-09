#!/bin/bash

#unsignedApk=$1
#outApk=$2

#construye
ionic build --release

#firma
jarsigner -tsa https://timestamp.geotrust.com/tsa -verbose -sigalg SHA1withRSA -digestalg SHA1\
 -keystore ~/Dropbox/Certificado\ Android/IslasCruz.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk ic
 
#jarsigner -verify -verbose -certs platforms/android/ant-build/CromaliaNegocios-release-unsigned.apk

#alinea
rm gaceta-signed.apk
$ANDROID_HOME/build-tools/23.0.1/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk gaceta-signed.apk

