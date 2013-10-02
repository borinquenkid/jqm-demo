This project tests a sample JQueryMobile web-app using Selenium WebDriver js bindings against three mobile browsers, Android Browser, Chrome Browser on Android and Safari.
---
#### Comment for change


##ANDROID AVD SETUP
1. Download and install SDK (sets $ANDROID_SDK_HOME)(Set $ANDROID_SDK_HOME/platform-tools in PATH)
2. Download and install Intel x86 hax (for Mac)
3. Create x86 avd
4. Download Android Webdriver APK (https://code.google.com/p/selenium/downloads/list)
5. Start emulator and verify you are allowing installation of application not coming from Android Market. Go to Settings -> Applications, and check "Unknown Sources".
    `emulator -avd <avd> -partition-size 512`
6. Get device id
   `adb devices`
7. export SERIAL_ID=<device id>
8. Install Android WebDriver
   `adb -s $SERIAL_ID -e install -r  android-server.apk`
9. Start the application in debug mode, which has more verbose logs by doing:
   ` adb -s $SERIAL_ID shell am start -a android.intent.action.MAIN -n org.openqa.selenium.android.app/.MainActivity -e debug true`
10. Setup the port forwarding in order to forward traffic from the host machine to the emulator.
   `adb -s $SERIAL_ID forward tcp:8080 tcp:8080`

##CHROMIUM AVD SETUP
1. Download GoogleAPI from http://goo.im/gapps for avd and extract
2. Checkout from github AndroidAVDRepo https://github.com/j5at/AndroidAVDRepo.git
2. edit .profile
`export AVD_HOME=<path to checkout of AndroidAVDRepo>
export AVD_NAME=Nexus-4i
export API_LEVEL=17
export GAPPS_PACKAGE_PATH=<PATH_TO_GOOGLE_API_DOWNLOAD>/gapps-jb-20130812-signed

3. Copy default image to avd directory
`cp $ANDROID_SDK_HOME/system-images/android-$API_LEVEL/x86/system.img $AVD_HOME/avd/$AVD_NAME.avd/system.img`

4. Create read/write system image
`$ANDROID_SDK_HOME/tools/emulator -avd $AVD_NAME -qemu -nand system,size=0x1f400000,file=$AVD_HOME/avd/$AVD_NAME.avd/system.img`

5. Add Google Play to read/write system image
`cd $GAPPS_PACKAGE_PATH/system/app;$ANDROID_SDK_HOME/platform-tools/adb remount && for file in GoogleLoginService.apk GoogleServicesFramework.apk Phonesky.apk; do $ANDROID_SDK_HOME/platform-tools/adb push $file /system/app; done`

6. Install Chrome from GooglePlay inside of emulator
7. Install ChromeDriver 
`https://code.google.com/p/chromedriver/downloads/list`
8. `chromedriver --url-base=/wd/hub`

##IOS SIMULATOR SEUP
1. Install XCode and IphoneSimulator 6.0 or greater
2. Download ios-driver https://s3-eu-west-1.amazonaws.com/ios-driver/ios-server-0.6.0.jar
3. sudo chmod 666 /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator*.sdk/Applications/MobileSafari.app/Info.plist
4. java -jar ios-server-0.6.0.jar

##PROJECT SETUP
1. Install Node
2. `npm install`
3. `grunt connect` to serve page
4. `mocha test/jqm-demo-x` one script at a time, since running multiple remote drivers can bog down you machine


