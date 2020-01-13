var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");

$(function() {
    $(document).ajaxSend(function(e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });
});

function PageLink(curPage, totalPages, funName) {
    var pageUrl = "";

    var pageLimit = 5;
    var startPage = parseInt((curPage - 1) / pageLimit) * pageLimit + 1;
    var endPage = startPage + pageLimit - 1;

    if (totalPages < endPage) {
        endPage = totalPages;
    }

    var nextPage = endPage + 1;
    if (curPage > 1 && pageLimit < curPage) {
        pageUrl += "<a class='first' href='javascript:" + funName + "(1);'><img src='image/first.png'/></a>";
    }
    if (curPage > pageLimit) {
        pageUrl += "<a class='prev' href='javascript:" + funName + "(" + (startPage == 1 ? 1 : startPage - 1) + ");'><img src='image/prev.png'/></a>";
    }

    for (var i = startPage; i <= endPage; i++) {
        if (i == curPage) {
            pageUrl += "<a class='page_number' href='#'><strong>" + i + "</strong></a>";
        } else {
            pageUrl += "<a class='page_number' href='javascript:" + funName + "(" + i + ");'>" + i + "</a>";
        }
    }

    if (nextPage <= totalPages) {
        pageUrl += "<a class='next' href='javascript:" + funName + "(" + (nextPage < totalPages ? nextPage : totalPages) + ");'><img src='image/next.png'/></a>";
    }
    if (curPage < totalPages && nextPage < totalPages) {
        pageUrl += "<a class='last' href='javascript:" + funName + "(" + totalPages + ");'><img src='image/last.png'/></a>";
    }

    return pageUrl;
}

function SetOpenerValue(zipCode, address) {
    window.opener.getAddressValue(zipCode, address);
    window.close();
}

function Search_Post_API(PageNo) {
    var intPageSize = 5;
    var intTotalPages = 0;

    var strUrl = window.location.protocol + "//www.juso.go.kr/addrlink/addrLinkApiJsonp.do";
    if (true /*todo: 검색어확인*/) {
        $.ajax({
            url: strUrl,
            type: "post",
            data: ({currentPage: PageNo, countPerPage: intPageSize, keyword: $('#inputSearchAddress').val(), confmKey: $('#hid_Key').val()}),
            dataType: "jsonp",
            crossDomain: true,
            success: function(xmlStr) {
                if (navigator.appName.indexOf("Microsoft") > -1) {
                    var xmlData = new ActiveXObject("Microsoft.XMLDOM");
                    xmlData.loadXML(xmlStr.returnXml);
                } else {
                    var xmlData = xmlStr.returnXml;
                }

                var errCode = $(xmlData).find("errorCode").text();
                var errDesc = $(xmlData).find("errorMessage").text();
                var PostList = "";

                if (errCode == "0") {
                    if (xmlStr != null) {
                        $(xmlData).find("juso").each(function (i) {
                            PostList += "<a href=\"javascript:SetOpenerValue('" + $(xmlData).find("zipNo").eq(i).text() + "', '" + $(xmlData).find("roadAddr").eq(i).text().replace("'", " ") + "');\">";
                            PostList += "<span class='zipCode'>" + $(xmlData).find("zipNo").eq(i).text() + "</span><br/>";
                            PostList += $(xmlData).find("roadAddr").eq(i).text() + "<br/>";
                            PostList += $(xmlData).find("jibunAddr").eq(i).text();
                            PostList += "</a>";
                            PostList += "<hr>";
                        });

                        $("#dvSearchArea").html(PostList);

                        if ($(xmlData).find("totalCount").text() != 0) {
                            intTotalPages = Math.ceil($(xmlData).find("totalCount").text() / intPageSize);
                            $('#div_paginate').html(PageLink(PageNo, intTotalPages, "Search_Post_API"));
                        }
                    }
                } else {
                    alert(errCode + ": " + errDesc);
                }
            }
        })
    }
}

$('#formSearchAddress').on('submit', function() {
    event.preventDefault();
    Search_Post_API('1');
});
