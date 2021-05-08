function deleteLocalStorage() {

    localStorage.clear();
    location.reload();
}

function localLoad() {

    var searchs = [],
        keys = Object.keys(localStorage),
        i = keys.length,
        j = keys.length;

    while (i--) {
        searchs.push(localStorage.getItem(keys[i]));
    }
    j--;
    var searchsHtml = '<div class="table-wrapper-scroll-y my-custom-scrollbar"><div class="table-responsive">' + ' <table class="table table-bordred table-sm"><thead class="thead-light"><th>Search history</th><th></th><th></th></thead><tbody>';
    for (search of searchs) {
        var searchComponents = search.split("#@");
        searchsHtml += '<tr><td><a href="#" id="' + searchComponents[0] + '" onclick="goSearch(this.id)">' + searchComponents[1] + '</a></td>' + '<td>' + searchComponents[2] + "/" + searchComponents[3] + "/" + searchComponents[4] + '</td><td align="center"><p data-placement="top" data-toggle="tooltip" title="Delete"><i id="' + keys[j] + '" class="fa fa-trash fa-sm" onclick="deleteSearch(this.id)"></i></p></td></tr>';
        j--;
    }
    searchsHtml += '</tbody></table></div></div>';
    document.getElementById("search-files").innerHTML = searchsHtml;
}

function deleteSearch(key) {
    localStorage.removeItem(key);
    location.reload();
}

function goSearch(url) {
    window.location.href = './saved-search.html?url=' + url;
}

window.onload = function() {
    localLoad();
    document.getElementById("deleteLocalStorageBtn").onclick = deleteLocalStorage;

};