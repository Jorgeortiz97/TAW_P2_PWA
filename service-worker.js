/* service-worker.js */
const filesToCache = [
    'manifest.json',

    'css/main.css',
    'images/favicon.ico',
    'images/logo.png',

    'index.html',
    'history.html',
    'search.html',
    'saved-search.html',

    'js/history.js',
    'js/index.js',
    'js/common.js',
    'js/saved-search.js',
    'js/search.js',

    'bootstrap/jquery-3.5.1.min.js',
    'bootstrap/js/bootstrap.min.js',
    'jquery-ui/js/jquery-ui-1.12.1.min.js',

    'bootstrap/css/bootstrap.min.css',
    'jquery-ui/css/jquery-ui-1.12.1.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
];


const staticCacheName = 'pages-cache';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            res = cache.addAll(filesToCache);
            console.log("Caching files " + filesToCache + " to " + staticCacheName + "  result: " + res)
            return res;
        })
    );
});


self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response)
                console.log("Resource '" + event.request.url + "' in cache");
            else
                console.error("Resource '" + event.request.url + "' not in cache " + staticCacheName);
            return response || fetch(event.request);
        })
    )
});




self.addEventListener ('activate', function(event) {
    event.waitUntil (
        caches.keys().then (function (filesToCache) {
            return Promise.all (
                filesToCache.filter (() => {
                    return true;
                }).map ((cacheName) => {
                    console.log("Removing cache " + cacheName)
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

