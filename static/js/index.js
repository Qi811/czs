document.addEventListener('plusready', function() {
	//console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。")
	//判断数组中是否包含某字符串
	Array.prototype.contains = function(needle) {
		for (i in this) {
			if (this[i].indexOf(needle) > 0) return i;
		}
		return -1;
	};

	var device_type = navigator.userAgent; //获取userAgent信息
	var md = new MobileDetect(device_type); //初始化mobile-detect
	var os = md.os(); //获取系统
	var model = "";
	if (os == "iOS") {
		//ios系统的处理
		os = +md.version("iPhone");
		// console.log(os)
		model = md.mobile();
	} else if (os == "AndroidOS") {
		//Android系统的处理
		os = md.os() + md.version("Android");
		var sss = device_type.split(";");
		var i = sss.contains("Build/");
		if (i > -1) {
			model = sss[i].substring(0, sss[i].indexOf("Build/"));
		}
	}
	
	// console.log(model + "||" + os, "打印系统版本和手机型号");
	var ptype = 0;
	var sv = 0;
	var aos = os.slice(9) - 0;
	var ostype = os.slice(0, 9);
	var osid = "";
	var aosid = "";

	localStorage.setItem("aos", aos);
	localStorage.setItem("ptype", 2);
		// 判断版本
		var aa = function getDeviceInfo() {
			if (aos < 10) {
				plus.device.getInfo({
					success: function(e) {
						var aa =JSON.stringify(e);
						aosid = 0;
						sv = 0;
						var bb = aa.indexOf(",");
						osid = aa.slice(9,bb);
						// alert("IMEI: "+plus.device.imei);
						localStorage.setItem("aosid", aosid);
						localStorage.setItem("osid", osid);
						localStorage.setItem("sv", sv);
					},
					fail: function(e) {
						alert('错误: ' + JSON.stringify(e));
					}
				});
			} else if (aos >= 10) {
				plus.device.getOAID({
					success: function(e) {
						var bb = JSON.stringify(e);
						osid = 0;
						sv = 29;
						var cc = bb.indexOf(":");
						var dd=bb.slice(cc+1);
						var ee = dd.indexOf("}");
						var li = dd.slice(0,ee);
						var lib = li.slice(1);
						var lic = lib.indexOf('"');
						aosid = lib.slice(0,lic);
						localStorage.setItem("aosid", aosid);
						localStorage.setItem("osid", osid);
						localStorage.setItem("sv", sv);
					},
					fail: function(e) {
						alert('错误: ' + JSON.stringify(e));
					},
				});
			}
		}
	aa();
	/* console.log(localStorage.getItem("aosid"));
	console.log(localStorage.getItem("osid"));
	console.log(localStorage.getItem("sv"));
	console.log(localStorage.getItem("ptype"));
	console.log(localStorage.getItem("aos")); */
}, false);
/* var model = "PCHM10";
var os = "AndroidOS10";
var ostype = os.slice(0, 9);
var aos = os.slice(9) - 0;
var osid =
  '{"imei":"869698033120735,869698033120727","imsi":["460110751904817,460078672275663"],"uuid":"869698033120735,869698033120727"}';
var aosid = "DE32B03CE6304C15877278B27F7A696Fbe533d5da61f4fa51f8c28478aea2259"; */
