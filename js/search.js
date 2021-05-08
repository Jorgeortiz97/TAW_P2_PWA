var start;
var query;

function search() {

    let title = document.getElementById("title").value,
        summary = document.getElementById("summary").value,
        before = document.getElementById("before").value,
        after = document.getElementById("after").value,
        featured = document.getElementById("featured").checked;

    query = "";
    if (title)
        query += "&title_contains=" + title;
    if (summary)
        query += "&summary_contains=" + summary;
    if (before)
        query += "&publishedAt_lt=" + before;
    if (after)
        query += "&publishedAt_gt=" + after;
    if (featured)
        query += "&featured=true";
    loadArticles({ query: query, showToast: true });
    start = "false";
}

function saveSearch() {

    if (start == "true") {
        $('.alert').show();
        setTimeout(function() {
            $(".alert").hide();
        }, 2000);
    } else {
        $("#modal-name").modal("show");
        document.getElementById("required-name").style.display = "none";
    }

}

function saveSearchName(e) {
    e.preventDefault();
    var name = document.getElementById("input-name").value;

    if (name == "") {
        document.getElementById("required-name").style.display = "block";
    } else {
        localSave(name, query);
        document.getElementById("input-name").value = null;
        $("#modal-name").modal('hide');
    }
}

function localSave(name, query) {

    let fecha = new Date();
    let index = selectIndex();

    /* Save data using local storage */
    localStorage.setItem("url#" + index.toString(), url + "#@" + name + "#@" + fecha.getDate() + "#@" + fecha.getMonth() + 1 + "#@" + fecha.getFullYear());
}

function selectIndex() {

    var lowest_idx = 0;
    let keys = Object.keys(localStorage);

    for (i = 0; i < keys.length; i++) {
        let idx = parseInt(keys[i].split("#")[1]);
        if (idx >= lowest_idx)
            lowest_idx = idx + 1;
    }
    return lowest_idx;
}

window.onload = function() {
    $(".datepicker").datepicker({
        dateFormat: 'yy-mm-dd',
    });
    document.getElementById("searchBtn").onclick = search;
    document.getElementById("saveSearchBtn").onclick = saveSearch;
    document.getElementById("saveSearchNameBtn").onclick = saveSearchName;
    start = "true";
};