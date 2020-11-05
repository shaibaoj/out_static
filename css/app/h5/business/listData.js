Vue.component("list-data", {
    props: ["contentList"],
    template:
      "\
      <div>\n" +
          '<div class="contentList" v-for="content in contentList">\n' +
              "<!--无图模式-->\n           " +
              ' <div class="item" v-if="content.bs_images_len == 0 && content.bs_isvideo == 0"> \n' +
                  "<a :href=\"'/gylm/business/v1/info?id=' + content.bs_id + ''\">\n" +
                      '<div class="item_title clearfix">\n' +
                          "<p>\n                            " +
                              '<span class="stick fl" v-if="content.bs_istop == 1">置顶</span>\n' +
                              ' <span style="margin-left:5px;"> {{content.bs_title}}</span>\n' +
                          " </p>\n" +
                      "</div>\n" +
                      '<p class="item_dec" style="height: 36px">\n' +
                          "{{content.bs_desc}}\n" +
                      " </p>\n\n" +
                      '<div class="item_info clearfix">\n' +
                          '<span class="fl">\n' +
                              "{{content.bs_author}}\n" +
                          "</span>\n" +
                          '<span class="fr  zan" style="margin-left: 3%">\n' +
                              "{{content.bs_clickgive>999?999+'+':content.bs_clickgive}}\n" +
                          "</span>\n" +
                          '<span class="fr  comment ">\n' +
                              "{{content.bs_readcount>999?999+'+':content.bs_readcount}}\n" +
                          " </span>\n" +
                      "</div>\n" +
                  "</a>\n" +
              "</div>\n" +
              "<!--多张图模式-->\n" +
              ' <div class="item" v-if="content.bs_images_len == 3 && content.bs_isvideo == 0">\n' +
                  "<a :href=\"'/gylm/business/v1/info?id=' + content.bs_id + ''\">\n" +
                      '<div class="item_title clearfix">\n' +
                          " <p>\n" +
                              '<span class="stick fl" v-if="content.bs_istop == 1">置顶</span>\n' +
                              '<span style="margin-left:5px;"> {{content.bs_title}}</span>\n' +
                          "</p>\n" +
                      "</div>\n" +
                      '<p class="item_dec">\n' +
                          "{{content.bs_desc}}\n" +
                      "</p>\n" +
                      '<ul class="item_img">\n' +
                          '<li v-for="images in content.bs_images">\n' +
                              '<img :src="images">\n' +
                          "</li>\n" +
                      "</ul>\n" +
                      '<div class="item_info clearfix">\n' +
                          '<span class="fl">\n' +
                              "{{content.bs_author}}\n" +
                          "</span>\n" +
                          '<span class="fr  zan" style="margin-left: 3%">\n' +
                              "{{content.bs_clickgive>999?999+'+':content.bs_clickgive}}\n" +
                          "</span>\n" +
                          '<span class="fr  comment ">\n' +
                              "{{content.bs_readcount>999?999+'+':content.bs_readcount}}\n" +
                          " </span>\n" +
                      "</div>\n" +
                  "</a>\n" +
              "</div>\n" +
              "<!--1张图模式-->\n" +
              '<div class="item2 clearfix" v-if="content.bs_images_len == 1&&content.bs_isvideo == 0">\n' +
                  " <a :href=\"'/gylm/business/v1/info?id=' + content.bs_id + ''\">\n" +
                      '<div class="item2_zuo fl">\n' +
                          '<div class="item2_title clearfix">\n' +
                              "<p>\n" +
                                  ' <span class="stick fl" v-if="content.bs_istop == 1">置顶</span>\n' +
                                  ' <span style="margin-left:5px;"> {{content.bs_title}}</span>\n' +
                              "</p>\n" +
                          "</div>\n" +
                          '<p class="item2_dec">\n' +
                              "{{content.bs_desc}}\n" +
                          "</p>\n" +
                          '<div class="item2_info clearfix">\n' +
                              '<span class="fl">\n' +
                                  "{{content.bs_author}}\n" +
                              "</span>\n" +
                              '<span class="fr  zan" style="margin-left: 3%">\n' +
                                  "{{content.bs_clickgive>999?999+'+':content.bs_clickgive}}\n" +
                              " </span>\n" +
                              ' <span class="fr  comment ">\n' +
                                  "{{content.bs_readcount>999?999+'+':content.bs_readcount}}\n" +
                              " </span>\n" +
                          "</div>\n" +
                      " </div>\n" +
                      ' <div class="item2_you fr">\n' +
                          '<ul class="item2_img">\n' +
                              "<li>\n" +
                                  '<img :src="content.bs_images">\n' +
                              "</li>\n" +
                          "</ul>\n" +
                      "</div>\n" +
                  " </a>\n" +
              "</div>\n" +
              "<!--两张图模式-->\n" +
              '<div class="item" v-if="content.bs_images_len == 2 && content.bs_isvideo == 0">\n' +
                  "<a :href=\"'/gylm/business/v1/info?id=' + content.bs_id + ''\">\n" +
                      '<div class="item_title clearfix" v-if="content.bs_istop == 1">\n' +
                          " <p>\n" +
                              '<span class="stick fl">置顶</span>\n' +
                              ' <span style="margin-left:5px;"> {{content.bs_title}}</span>\n' +
                          " </p>\n" +
                      "</div>\n" +
                      '<p class="item_dec">\n' +
                          "{{content.bs_desc}}\n" +
                      "</p>\n" +
                      '<ul class="item_img">\n' +
                          '<li v-for="images in content.bs_images">\n' +
                              '<img :src="images">\n' +
                          "</li>\n" +
                      "</ul>\n" +
                      '<div class="item_info clearfix">\n' +
                          '<span class="fl">\n' +
                              "{{content.bs_author}}\n" +
                          "</span>\n" +
                          '<span class="fr  zan" style="margin-left: 3%">\n' +
                              "{{content.bs_clickgive>999?999+'+':content.bs_clickgive}}\n" +
                          "</span>\n" +
                          '<span class="fr  comment ">\n' +
                              "{{content.bs_readcount>999?999+'+':content.bs_readcount}}\n" +
                          "</span>\n" +
                      "</div>\n" +
                  "</a>\n" +
              "</div>\n" +
              "<!--视频模式-->\n" +
              '<div class="item" v-if="content.bs_isvideo == 1">\n' +
                  "<a :href=\"'/gylm/business/v1/info?id=' + content.bs_id + ''\">\n" +
                      '<div class="wrapper">\n' +
                          '<div class="js-video">\n' +
                              '<video class="js-media" :poster="content.bs_videopic">\n' +
                                  '<source :src="content.bs_videourl" type="video/mp4" />\n' +
                                      "<p>\n" +
                                          "你的浏览器不支持 HTML5 Video。\n" +
                                      "</p>\n" +
                              "</video>\n" +
                              '<div class="zy_title">\n ' +
                                  '<span class="stick fl" v-if="content.bs_istop == 1">置顶</span>\n' +
                                  "&nbsp;<i>{{content.bs_title}}</i>\n" +
                              "</div>\n" +
                              "<a :href=\"'/gylm/business/v1/info?id=' + content.bs_id + ''\" style=\"display: block\"> <i data-playPause\n" +
                                      'class="playPause fa fa-play ui-icon">\n' +
                                          "<span>\n" +
                                      "</span>\n" +
                                      '<img src="http://img.gaoyong666.com/business/school_icon_videoplaying.png">\n  ' +
                                  "</i></a>\n    \n" +
                              '<i data-fullscreen class="fullscreen iconicfill-fullscreen" title="fullscreen">\n' +
                              "</i>\n" +
                          "</div>\n" +
                          "<!-- js-video -->\n" +
                      "</div>\n    \n" +
                      '<div class="item_info clearfix">\n' +
                          '<span class="fl">\n' +
                              "{{content.bs_author}}\n" +
                          "</span>\n" +
                          '<span class="fr  zan" style="margin-left: 3%">\n' +
                              "{{content.bs_clickgive>999?999+'+':content.bs_clickgive}}\n" +
                          "</span>\n" +
                          '<span class="fr  comment ">\n' +
                              "{{content.bs_readcount>999?999+'+':content.bs_readcount}}\n" +
                          "</span>\n" +
                      "</div>\n" +
                  "</a>\n" +
              "</div>\n" +
          "</div>\n" +
      "</div>"
  });
  