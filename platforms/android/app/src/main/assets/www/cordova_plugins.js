cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    },
    {
      "id": "cordova-plugin-inappbrowser.inappbrowser",
      "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
      "pluginId": "cordova-plugin-inappbrowser",
      "clobbers": [
        "cordova.InAppBrowser.open"
      ]
    },
    {
      "id": "cordova-plugin-ionic-keyboard.keyboard",
      "file": "plugins/cordova-plugin-ionic-keyboard/www/android/keyboard.js",
      "pluginId": "cordova-plugin-ionic-keyboard",
      "clobbers": [
        "window.Keyboard"
      ]
    },
    {
      "id": "cordova-plugin-ionic-webview.IonicWebView",
      "file": "plugins/cordova-plugin-ionic-webview/src/www/util.js",
      "pluginId": "cordova-plugin-ionic-webview",
      "clobbers": [
        "Ionic.WebView"
      ]
    },
    {
      "id": "cordova-plugin-nativeaudio.nativeaudio",
      "file": "plugins/cordova-plugin-nativeaudio/www/nativeaudio.js",
      "pluginId": "cordova-plugin-nativeaudio",
      "clobbers": [
        "window.plugins.NativeAudio"
      ]
    },
    {
      "id": "cordova-plugin-speechrecognition.SpeechRecognition",
      "file": "plugins/cordova-plugin-speechrecognition/www/speechRecognition.js",
      "pluginId": "cordova-plugin-speechrecognition",
      "merges": [
        "window.plugins.speechRecognition"
      ]
    },
    {
      "id": "cordova-plugin-splashscreen.SplashScreen",
      "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
      "pluginId": "cordova-plugin-splashscreen",
      "clobbers": [
        "navigator.splashscreen"
      ]
    },
    {
      "id": "cordova-plugin-statusbar.statusbar",
      "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
      "pluginId": "cordova-plugin-statusbar",
      "clobbers": [
        "window.StatusBar"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-device": "2.0.3",
    "cordova-plugin-inappbrowser": "4.1.0",
    "cordova-plugin-ionic-keyboard": "2.2.0",
    "cordova-plugin-ionic-webview": "4.2.1",
    "cordova-plugin-nativeaudio": "3.0.9",
    "cordova-plugin-speechrecognition": "1.1.2",
    "cordova-plugin-splashscreen": "5.0.4",
    "cordova-plugin-statusbar": "2.4.3",
    "cordova-plugin-whitelist": "1.3.4"
  };
});