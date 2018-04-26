(function () {

    function hideAds() {
        var spans = document.querySelectorAll('li[class*="ad"] > div[class*="ad"] span')
    
        for ( s of spans ) {
            if(s.parentElement.querySelector('cite') && s.innerText === 'Ad') {
                s.closest('li[class*="ad"]').remove()
            }
        }
    }
    
    function deferredHider(timeoutId) {
        hideAds()
        clearTimeout(timeoutId)
    }
    
    var MutationObserver = window.MutationObserver || window.webKitMutationObserver || window.MozMutationObserver
    var container = document.documentElement || document.body
    
    var observer = new MutationObserver(function(mutations) {
        var timeoutId = setTimeout(function() {
            deferredHider(timeoutId)
        }, 1)
    })

    var config = { attributes: false, childList: true, subtree: true }
	observer.observe(container, config)

})()