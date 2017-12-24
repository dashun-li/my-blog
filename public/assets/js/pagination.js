function pagination() {
    // 判断当前页码
    var page = Number($("#pg").html()) ;
    var pagecount = $(".am-pagination>.last>a").prop('href').split("=")[1];
    var arr = $(".am-pagination>.pages>a")
    // 上一页的判断
    if (page == 1) {
        $(".am-pagination>.first").addClass('am-disabled')
    } else {
        $(".am-pagination>.first").removeClass('am-disabled')
    }
    // 下一页的判断
    if (page == pagecount) {
        $(".am-pagination>.last").addClass('am-disabled')
        $(".am-pagination>.next").addClass('am-disabled')
    } else {
        $(".am-pagination>.next").removeClass('am-disabled')
        $(".am-pagination>.last").removeClass('am-disabled')
    }
    for (var i=0;i<arr.length;i++) {
        // 判断进去首页默认选中第一页,选中其他页就去掉激活状态
        if (page == 1 ) {
            arr[0].parentNode.classList.add('am-active');
        } else {
            arr[0].parentNode.classList.remove('am-active');
        }
        // 选中哪一页就激活状态
        if (page == arr[i].innerHTML) {
            arr[i].parentNode.classList.add('am-active')
        } else {
            arr[i].parentNode.classList.remove('am-active')
        }
    }
    
}