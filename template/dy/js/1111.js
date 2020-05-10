// 1111红包 华美网络版权所有bbs.138gzs.com
//if (!$.cookie('1111hongbao')) {
//    var _popHtml = '<div id="hb_pop" class="ui_popbox">' +
//                        '<a class="popbox_close" href="javascript:closehbPop();" title="关闭">x</a>' +
//                        '<a class="hb_enter" href="http://s.click.taobao.com/FQaE8mx" target="_blank"></a>' +
//                    '</div>' +
//                    '<div id="ui_layoutbg" style="display:block"></div>';
//
//    $('body').append(_popHtml);
//}

function closehbPop() {
    //    $.cookie('1111hongbao', 'true', { path: "/", expires: 3000, domain: _domain });

    $.cookie('1111hongbao', 'true');
    $('#hb_pop').remove();
    $('#ui_layoutbg').remove();
}


//document.writeln("<div id=\"hb_pop\" class=\"ui_popbox\"><a class=\"popbox_close\" href=\"javascript:closehbPop();\" title=\"关闭\">x</a><a class=\"hb_enter\" href=\"http://youpin.shaibaoj.com/redirect.php?referer=&target=http://s.click.taobao.com/t?e=m%3D2%26s%3Dzi8xglnp5nIcQipKwQzePCperVdZeJviEViQ0P1Vf2kguMN8XjClApxVYWC2LhlOunFL2OzKi7dBwZuUMxGJY82Xql1Q3rhoiQakOGkh823EQ6WDZZrrEVW00662PG2K8Cm%2FwUl4ESHcHtRpEUy6RLSgd9R%2Fv5WktY4Qt2cZ1lVeY%2By0blbhscYl7w3%2FA2kb\" target=\"_blank\"></a></div><div id=\"ui_layoutbg\" style=\"display:block\"></div>");

