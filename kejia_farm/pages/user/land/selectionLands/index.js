var a=new getApp;Page({data:{lands:[],currentLand:{},selectedLand:[],sumPrice:0,sumNum:0,state:!1,scrollLeft:0,user_uid:0,farmSetData:[]},onLoad:function(e){var t=this,n=a.siteInfo.uniacid;a.util.request({url:"entry/wxapp/land",data:{op:"getLandData",uniacid:n},success:function(a){t.setData({lands:a.data.landData,currentLand:a.data.landData[0]})}});var d=e.user_uid,r=wx.getStorageSync("kejia_farm_uid");a.loginBindParent(d,r),void 0!=d&&0!=d&&t.setData({user_uid:d}),a.util.setNavColor(n),t.setData({farmSetData:wx.getStorageSync("kejia_farm_setData")})},onShow:function(e){var t=this.data.user_uid,n=wx.getStorageSync("kejia_farm_uid");a.loginBindParent(t,n)},changeArea:function(a){var e=this,t=a.currentTarget.dataset.id;this.data.lands.map(function(a,n){t==a.id&&(n<=1?e.setData({scrollLeft:0}):n>1&&n<=e.data.lands.length-2&&e.setData({scrollLeft:75*(n-1)}),e.setData({currentLand:a}))})},addArea:function(a){var e=this,t=a.currentTarget.dataset.id;e.data.lands.map(function(a){a.land.map(function(a){if(a.id==t)if(a.residue_area>0)if(a.selectArea=parseInt(a.selectArea)+1,a.area=parseInt(a.area)+1,a.residue_area-=1,e.data.currentLand.land.map(function(a){a.id==t&&(a.area=parseInt(a.area)+1,a.selectArea=parseInt(a.selectArea)+1,a.residue_area-=1)}),0==e.data.selectedLand.length)e.data.selectedLand.push(a);else{var n=!1;e.data.selectedLand.map(function(e,d){e.id==t&&(e.selectArea=a.selectArea,n=!0)}),n||e.data.selectedLand.push(a)}else wx.showModal({title:"温馨提示",content:"您选择的面积已超过剩余种植面积",success:function(a){a.confirm?console.log("用户点击确定"):a.cancel&&console.log("用户点击取消")}})})}),e.setData({currentLand:e.data.currentLand,lands:e.data.lands,selectedLand:e.data.selectedLand}),e.sumPrice(e)},reduceArea:function(a){var e=this,t=a.currentTarget.dataset.id;e.data.lands.map(function(a){a.land.map(function(a){a.id==t&&(a.selectArea-=1,a.area-=1,a.residue_area=parseInt(a.residue_area)+1,e.data.currentLand.land.map(function(a){a.id==t&&(a.selectArea-=1,a.area-=1,a.residue_area=parseInt(a.residue_area)+1)}),e.data.selectedLand.map(function(a,n){a.id==t&&(a.selectArea-=1,0==a.selectArea&&e.data.selectedLand.splice(n,1))}))})}),e.setData({currentLand:e.data.currentLand,lands:e.data.lands,selectedLand:e.data.selectedLand}),e.sumPrice(e)},sumPrice:function(a){var e=0,t=0;a.data.selectedLand.map(function(a){e+=a.minPrice*a.selectArea,t+=a.selectArea}),a.setData({sumPrice:e.toFixed(2),sumNum:t})},Settlement:function(){if(0!=wx.getStorageSync("kejia_farm_uid")){for(var a=this.data.selectedLand,e=new Array,t=0;t<a.length;t++)e.push(a[t].id);e.length>0?(wx.setStorageSync("Land",a),wx.navigateTo({url:"../../land/payFor/index?lid="+e.join("_")})):wx.showToast({title:"请选择地块！"})}else wx.navigateTo({url:"../../../login/index"})},preventTouchMove:function(){},hideModal:function(){this.setData({state:!1})},showModal:function(){this.data.selectedLand.length>0&&this.setData({state:!0}),console.log(this.data.selectedLand)},clearAll:function(){var a=this;a.data.lands.map(function(a){a.land.map(function(a){a.selectArea=0})}),a.data.currentLand.land.map(function(a){a.selectArea=0}),a.setData({currentLand:a.data.currentLand,lands:a.data.lands,selectedLand:[],state:!1}),a.sumPrice(a)},onShareAppMessage:function(){var a=wx.getStorageSync("kejia_farm_setData");return{path:"/kejia_farm/pages/HomePage/index/index?&user_uid="+wx.getStorageSync("kejia_farm_uid"),success:function(a){},title:a.share_land_title}}}); 
