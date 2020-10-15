document.addEventListener('plusready',function(){
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
   			    console.log(model + "||" + os, "打印系统版本和手机型号");
   			// alert(os.slice(9));
		var aos = oc.slice(9)-0;
    var ostype = os.slice(0,9);
    var osid = null;
    var	aosid = null;
		aa = function getDeviceInfo(){
		if(aos<10){
		   	plus.device.getInfo({
		   		success:function(e){
		   			osid = JSON.stringify(e);
					// alert("IMEI: "+plus.device.imei);
		   		},
		   		fail:function(e){
		   			alert('错误: '+JSON.stringify(e));
		   		}
		   	});
			}else if(aos>=10){
				plus.device.getOAID({
					success:function(e){
					aosid=JSON.stringify(e);
					},
					fail:function(e){
						alert('错误: '+JSON.stringify(e));
					}
				});
			}
		   }
		   aa();

// console.log(localStorage.getItem(aos);
var ptype = 0;
var sv = 0;


if (ostype == "AndroidOS") {
  ptype = 2;
  // 判断版本
  if (aos < 10) {
      aosid = 0;
    osid = osid;
    sv = 0;
  } else {
    aosid = aosid;
    osid = 0;
    sv = 29;
  }
} else {
  ptype = 1;
}
localStorage.setItem("ptype",ptype);
localStorage.setItem("aos",aos);
localStorage.setItem("aosid",aosid);
localStorage.setItem("osid",osid);
localStorage.setItem("sv",sv);
localStorage.setItem("model",model);
)
   		}, false );
/* var model = "PCHM10";
var os = "AndroidOS10";
var ostype = os.slice(0, 9);
var aos = os.slice(9) - 0;
var osid =
  '{"imei":"869698033120735,869698033120727","imsi":["460110751904817,460078672275663"],"uuid":"869698033120735,869698033120727"}';
var aosid = "DE32B03CE6304C15877278B27F7A696Fbe533d5da61f4fa51f8c28478aea2259"; */


