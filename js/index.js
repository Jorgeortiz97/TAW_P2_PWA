window.onload = function() {
    if ('serviceWorker' in navigator)
        navigator.serviceWorker.register('service-worker.js');

    loadArticles();
};