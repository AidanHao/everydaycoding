"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "about",
  setup(__props) {
    common_vendor.onMounted(() => {
      common_vendor.index.request({
        url: "https://mock.presstime.cn/mock/65a915509358b0b690cf1395/movie/movieList",
        method: "GET",
        success: (res) => {
          console.log(res);
          common_vendor.index.setStorage({
            key: "movieName",
            data: res.data.movieList[0].nm,
            success: function() {
              console.log("success");
              common_vendor.index.showToast({
                title: "保存成功",
                duration: 2e3,
                icon: "success"
              });
            },
            fail: function() {
              console.log("faild");
            },
            complete: () => {
              console.log("完成");
            }
          });
        }
      });
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/www16/Desktop/培训/codespace/uniapp/base/base/pages/about/about.vue"]]);
wx.createPage(MiniProgramPage);
