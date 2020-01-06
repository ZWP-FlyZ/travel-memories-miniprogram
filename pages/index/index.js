// pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 显示底部视图
    showBottomView:true,

    // 地图状态
    mapSetting:{
      scale: 16, 
      longitude: 116.3970565796,
      latitude: 39.9084194828,
      markers:[],
      enableSatellite:true,

    },
  },

  //-------------------控件事件------------------------//
  onMapScaleUp: function (e){
    console.debug(this.data.mapSetting);
    const setting = this.data.mapSetting;
    let cur = setting.scale;
    let curLng = setting.longitude;
    let curLat = setting.latitude;
    this.map.getCenterLocation({success:
      function(res){
          curLng = res.longitude;
          curLat = res.latitude;
      }.bind(this)
    });
    this.map.getScale({
      success:function(newScale){
        this.setData({ mapSetting: { 
          scale: newScale.scale+1,
          longitude: curLng,
          latitude: curLat
        }});
      }.bind(this)
    }); 
  },
  onMapScaleDown: function (e) {
    console.debug(this.data.mapSetting);
    const setting = this.data.mapSetting;
    let cur = setting.scale;
    let curLng = setting.longitude;
    let curLat = setting.latitude;
    this.map.getCenterLocation({
      success:
        function (res) {
          curLng = res.longitude;
          curLat = res.latitude;
        }.bind(this)
    });
    this.map.getScale({
      success: function (newScale) {
        this.setData({
          mapSetting: {
            scale: newScale.scale - 1,
            longitude: curLng,
            latitude: curLat
          }
        });
      }.bind(this)
    }); 
  },

  // 点击定位
  onLocationClick: function(e){
    this.getLocationAndMove();
  },

  onMapRegionChange: function(e){
    
    if(e.type==='end'){
      this.map.getCenterLocation({
        
        success:function(res){

        }.bind(this)
      })
    }
  },

  getLocationAndMove: function(){
    wx.getLocation({
      type: "gcj02",
      success:function(res){
        this.map.moveToLocation(res);
        this.setData({
          mapSetting: {
            scale: 18,
            longitude: res.longitude,
            latitude: res.latitude
          }
        });

      }.bind(this)
    })
    
  },

  onMapTap:function(e){
    console.debug(e);
    this.setData({
      mapSetting: {
        longitude: e.detail.longitude,
        latitude: e.detail.latitude
      },
      showBottomView:true
    })
  },

  // 取消添加事件点
  onCancelAddEpointTap:function(e){
    this.setData({
      showBottomView: false
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.map = wx.createMapContext('myMap');
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getLocationAndMove();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }





})