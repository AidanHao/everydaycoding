"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "song",
  props: {
    data: Object
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: __props.data.img,
        b: common_vendor.t(__props.data.title),
        c: common_vendor.t(__props.data.price),
        d: common_vendor.t(__props.data.marketPrice)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/www16/Desktop/培训/codespace/uniapp/base/base/components/song.vue"]]);
wx.createComponent(Component);
