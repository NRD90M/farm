function t(t,a,e){return a in t?Object.defineProperty(t,a,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[a]=e,t}var a,e=require("../../../../../wxParse/wxParse.js"),o=new getApp;Page({data:(a={imgs:[],info:{},state:!1,Position:[]},t(a,"state",!1),t(a,"count",1),t(a,"goodsData",[]),t(a,"specItem",[]),t(a,"goods_id",""),t(a,"specVal",""),t(a,"sku_name_str",""),t(a,"aboutData",[]),t(a,"user_uid",0),t(a,"farmSetData",[]),t(a,"bottom",0),a),onLoad:function(t){var a=this,s=t.goods_id,i=o.siteInfo.uniacid,n=wx.getStorageSync("kejia_farm_uid"),d=t.user_uid;void 0!=d&&0!=d&&(o.loginBindParent(d,n),a.setData({user_uid:d})),o.util.request({url:"entry/wxapp/group",data:{op:"getGroupDetail",uniacid:i,goods_id:s},success:function(t){a.setData({goodsData:t.data.goodsData,specItem:t.data.specItem,goods_id:s,aboutData:t.data.aboutData}),""!=t.data.goodsData.goods_desc&&e.wxParse("article","html",t.data.goodsData.goods_desc,a,5)}});var u=0;o.globalData.sysData.model.indexOf("iPhone X")>-1&&(u=68),o.util.setNavColor(i),a.setData({farmSetData:wx.getStorageSync("kejia_farm_setData"),bottom:u})},onShow:function(t){var a=this,e=(o.siteInfo.uniacid,a.data.user_uid),s=wx.getStorageSync("kejia_farm_uid");void 0!=e&&0!=e&&(o.loginBindParent(e,s),a.setData({user_uid:e}))},showMode:function(){this.setData({state:!0})},hideModal:function(){this.setData({state:!1})},chooseTime:function(t){for(var a=this,e=t.currentTarget.dataset.specid,s=t.currentTarget.dataset.valid,i=a.data.specItem,n=new Array,d=0;d<i.length;d++){i[d].id==e&&(i[d].is_select=1);for(var u=0;u<i[d].specVal.length;u++)i[d].id==e&&(i[d].specVal[u].is_select=0),i[d].specVal[u].id==s&&(i[d].specVal[u].is_select=1),1==i[d].specVal[u].is_select&&n.push(i[d].specVal[u].id)}var r=o.siteInfo.uniacid,c=n.join("_"),l=a.data.goods_id;o.util.request({url:"entry/wxapp/group",data:{op:"getGroupSpec",spec_id:c,uniacid:r,goods_id:l},success:function(t){if(1==t.data.code)a.setData({specVal:t.data.specVal});else if(2==t.data.code){for(var o=0;o<i.length;o++){i[o].id==e&&(i[o].is_select=1);for(var d=0;d<i[o].specVal.length;d++){i[o].specVal[d].id==s&&(i[o].specVal[d].is_select=0,i[o].specVal[d].is_count=0);for(var u=0;u<n.length;u++)n[u]==s&&n.splice(u,1)}}wx.showToast({title:"库存不足"}),a.setData({specVal:[]})}a.setData({specItem:i,sku_name_str:t.data.sku_name_str,count:1})}})},buyNow:function(t){var a=this,e=wx.getStorageSync("kejia_farm_uid");if(0!=e&&void 0!=e){var o=a.data.goodsData,s=a.data.count;1==o.is_open_sku?a.setData({state:!0}):o.count>=1&&s>o.count?wx.navigateTo({url:"../confrimOrder/index?goods_id="+o.id+"&count="+s}):wx.showToast({title:"库存不足"})}else wx.navigateTo({url:"../../../login/index"})},reduceNum:function(){1!=this.data.count&&this.setData({count:this.data.count-1})},addNum:function(){var t=this,a=t.data.specVal,e=t.data.count,o=t.data.goodsData;if(1==o.is_open_sku){if(""==a||0==a.length)return wx.showToast({title:"请选择规格"}),!1;parseInt(e)+1>a.count?wx.showToast({title:"库存不足"}):this.setData({count:this.data.count+1})}else parseInt(e)+1>o.count?wx.showToast({title:"库存不足"}):this.setData({count:this.data.count+1})},chooseNum:function(t){var a=this,e=a.data.specVal,o=t.detail.value,s=a.data.goodsData;if(1==s.is_open_sku){if(""==e||0==e.length)return wx.showToast({title:"请选择规格"}),!1;parseInt(o)>e.count?(wx.showToast({title:"库存不足"}),this.setData({count:1})):this.setData({count:o})}else parseInt(o)>s.count?(wx.showToast({title:"库存不足"}),this.setData({count:1})):this.setData({count:o})},goHome:function(t){wx.reLaunch({url:"/pages/HomePage/index/index?is_tarbar=true"})},doCall:function(t){var a=t.currentTarget.dataset.phone;wx.makePhoneCall({phoneNumber:a})},sureGoods:function(t){var a=this,e=a.data.goods_id,o=a.data.goodsData,s=(a.data.specItem,a.data.count),i=a.data.specVal,n=wx.getStorageSync("kejia_farm_uid");if(0!=n&&void 0!=n)if(1==o.is_open_sku){if(0==i.length||""==i)return wx.showToast({title:"请选择规格"}),!1;i.count>=1&&i.count>=s?wx.navigateTo({url:"../confrimOrder/index?goods_id="+e+"&spec_id="+i.id+"&count="+s}):wx.showToast({title:"库存不足"})}else i.count>=1&&i.count>=s?wx.navigateTo({url:"../confrimOrder/index?goods_id="+e+"&count="+s}):wx.showToast({title:"库存不足"});else wx.navigateTo({url:"../../../login/index"})},onShareAppMessage:function(){var t=this,a=wx.getStorageSync("kejia_farm_uid");return{path:"/kejia_farm/pages/shop/Group/proDetails/index?goods_id="+t.data.goodsData.id+"&user_uid="+a,success:function(t){},title:t.data.goodsData.goods_name,imageUrl:t.data.goodsData.cover}}}); 
