window.onload = function() {
    var URLpage = window.location.search;
    var query = URLpage.split('url=')[1];
    query = query.split("&_start=")[1].substring(1).trim();
    history.pushState(null, "", "saved-search.html");
    loadArticles({ query: query });
};