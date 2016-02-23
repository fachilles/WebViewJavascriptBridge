if (window.WebViewJavascriptBridge) {
    test();
} else {
    document.addEventListener('WebViewJavascriptBridgeReady', test, false);
}

function test() {
    ////Native调用Javascript
    bridge.registerHandler('callH5', function (data, callback) {
      alert('Native call javascript');
    })

    ////Javascript调用Native
    var callbackButton = document.getElementById('btnNative');
    callbackButton.onclick = function (e) {
        e.preventDefault()

        window.WebViewJavascriptBridge.callHandler('callNative', {'foo': 'bar'}, function (response) {
            console.log('JS got response', response)
        })
    }

    ////此段iOS
    ////通过iframe设置src触发
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(iframe);
    setTimeout(function () {document.documentElement.removeChild(iframe)}, 0);
}
