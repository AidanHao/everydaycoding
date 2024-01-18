"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  song();
}
const song = () => "../../components/song.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const name = getApp().globalData.name;
    const title = common_vendor.ref("你好");
    const changeTitle = () => {
      title.value = title.value === "你好" ? "hello" : "你好";
    };
    const reverseTitle = common_vendor.computed(() => {
      return title.value.split("").reverse().join("");
    });
    const list = common_vendor.reactive({
      song: {
        img: "https://p.qqan.com/up/2020-11/16063720932682248.jpg",
        title: "美女头像",
        price: "20",
        marketPrice: "25"
      }
    });
    const goAbout = () => {
      common_vendor.index.navigateTo({
        url: "/pages/about/about"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goAbout),
        b: common_vendor.t(title.value),
        c: common_vendor.o(changeTitle),
        d: common_vendor.t(common_vendor.unref(reverseTitle)),
        e: common_vendor.t(common_vendor.unref(name)),
        f: common_vendor.p({
          data: list.song
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/www16/Desktop/培训/codespace/uniapp/base/base/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
