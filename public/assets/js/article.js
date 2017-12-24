function add_artcle_list() {
    var titleList = document.getElementsByClassName('am-article-bd')[0].getElementsByTagName('h1');
    var html = "";
    var num = [];
    for (var i = 0; i < titleList.length; i++) {
        var _txt = titleList[i].innerHTML;
        html += "<h4>" + _txt + "</h4>";
        var top = titleList[i].offsetTop;
        num.push(top);
    }
    $("#contents").html(html);
    pointlist();

    function pointlist() {
        $("#contents h4").on("click", function () {
            var index = $("#contents h4").index(this);

            $(document).scrollTop(num[index] - 120)

        })
    }
};