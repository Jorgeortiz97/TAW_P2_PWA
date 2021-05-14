/* CUSTOMIZATION PARAMETERS */
const API_BASE_URL = "https://spaceflightnewsapi.net/api/v2/articles/";
const API_REQ_BY_PAGE = 6;


var currentPage = 0

function generatePaginationItem(dispName, page, query, isActive, isEnabled) {
    var html = '';

    if (isActive)
        html += '<li class="page-item active">';
    else if (isEnabled)
        html += '<li class="page-item">';
    else
        html += '<li class="page-item disabled">';

    html += '<a class="page-link mx-2" href="javascript:void(0);" onclick="loadArticles({page:' + page + ', query:\'' + query + '\'});">';
    html += dispName;
    html += '</a></li>';
    return html;
}


function loadArticles({
    page = 0,
    query = "",
    showToast = false
} = {}) {

    var xmlhttp = new XMLHttpRequest();
    url = API_BASE_URL + "?_limit=" + (API_REQ_BY_PAGE + 1) + "&_start=" + page * API_REQ_BY_PAGE + query;
    xmlhttp.open("GET", url, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var articles = JSON.parse(xmlhttp.responseText);

            /* NOTE: We have requested an additional article to check if there is a "next" page */
            let nextPage = articles.length > API_REQ_BY_PAGE;
            if (nextPage)
                articles.pop();

            /* Articles data */
            var articlesHtml = '';
            for (article of articles)
                articlesHtml += '<div class="col-lg-4 col-md-6 col-sm-12">' +
                '<h3 class="feature-title"><a href="' + article.url + '">' + article.title + '</a></h3>' +
                '<div class="img-wrapper">' +
                    '<img src="' + article.imageUrl + '" class="img-fluid" />' +
                    '<button class="btn btn-sm" onclick="share(\'' + article.url + '\');"><i class="fa fa-share"></i></button>' +
                '</div>' +
                '<p>' + article.summary + '</p>' +
                '</div>';

            document.getElementById("articles-data").innerHTML = articlesHtml;

            /* Pagination */
            var paginationHtml = '<div class="d-flex justify-content-center"><ul class="pagination">';
            if (page > 0)
                paginationHtml += generatePaginationItem("&laquo;", page - 1, query, false, (page != 0));
            paginationHtml += generatePaginationItem(page + 1, page, query, true, false);
            if (nextPage)
                paginationHtml += generatePaginationItem("&raquo", page + 1, query, false, true);
            paginationHtml += '</ul></div>';

            paginationHtml += '<div class="d-flex justify-content-center"><small>' +
                'Page ' + (page + 1) + ' (displaying ' + articles.length + ' results)' +
                '</small></div>';

            document.getElementById("pagination-data").innerHTML = paginationHtml;

            currentPage = page;

            if (showToast)
                $('.toast').toast('show');
        }
    };
    xmlhttp.send();
}


function share(url) {
    navigator.share && navigator.share({
        title: "Latest Space News",
        text: "Checkout this piece of news",
        url: url,
    });
}


(function () {
    setInterval (function () {
        /* Online notification */
        online = window.window.navigator.onLine;
        document.getElementById("wifiNotification").style.display = (online ? "none" : "block");

        /* Battery notification */
        if (navigator.getBattery) {
            navigator.getBattery().then((battery) => {
                batteryNotification = document.getElementById("batteryNotification");
                batteryNotification.style.display = "block";

                if (battery.level < 0.1)
                    batteryNotification.className = "fa fa-battery-0 text-danger";
                else if (battery.level < 0.3)
                    batteryNotification.className = "fa fa-battery-1 text-danger";
                else if (battery.level < 0.5)
                    batteryNotification.className = "fa fa-battery-2 text-warning";
                else if (battery.level < 0.7)
                    batteryNotification.className = "fa fa-battery-3 text-warning";
                else
                    batteryNotification.className = "fa fa-battery-4 text-success";
            });
        }

    }, 1 * 1000);
})();

