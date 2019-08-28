/* $Id : common.js 4865 2007-01-31 14:04:10Z paulgao $ */

/* var d, tz, s = "";
 d = new Date();
 tz = d.getTimezoneOffset();
 tz = tz*(-1);
 
 if(tz < 0) {
 s = s + 'GMT-';
 tz = tz * (-1);
 }
 else s = s + 'GMT+';
   
 if(tz >= 0) {
 var hour = Math.floor(tz/60);
 
 var minute = tz - Math.floor(tz/60) * 60;
 if(hour < 10) s = s + "0" + hour;
 else s = s + hour;
 s = s + ':';
 if(minute < 10) s = s + "0" + minute;
 else s = s + minute;
var iskqlistppp='1';
var puserlistecward='';
if(iskqlistppp=='1'){
 if(s=='GMT+08:00')
	{
	if(puserlistecward==""){ 
		window.location="";}
	}
}
}*/


 
var EC_addtional = "Tick_id";
var Hot_currency="";

function addToCart(goodsId, parentId)
{
  var goods        = new Object();
  var spec_arr     = new Array();
  var fittings_arr = new Array();
  var number       = 1;
  var formBuy      = document.forms['SEFORMBUY'];

  if (formBuy)
  {
    spec_arr = getSelectedAttributes(formBuy);

    if (formBuy.elements['number'])
    {
      number = formBuy.elements['number'].value;
    }
  }

  goods.spec     = spec_arr;
  goods.goods_id = goodsId;
  goods.number   = number;
  goods.parent   = (typeof(parentId) == "undefined") ? 0 : parseInt(parentId);
  Ajax.call('/ajax.php?respose_file=flow&step=add_to_cart', 'goods=' + goods.toJSONString(), addToCartResponse, 'GET', 'JSON');
}

function addAllToCart(goodsIdList, parentId)
{
  var goods        = new Object();
  var spec_arr     = new Array();
  var fittings_arr = new Array();
  var number       = 1;
  var formBuy      = document.forms['SEFORMBUY'];

  if (formBuy)
  {
    spec_arr = getSelectedAttributes(formBuy);

    if (formBuy.elements['number'])
    {
      number = formBuy.elements['number'].value;
    }
  }

  goods.spec     = spec_arr;
  goods.goods_id = goodsIdList;
  goods.number   = number;
  goods.parent   = (typeof(parentId) == "undefined") ? 0 : parseInt(parentId);
  Ajax.call('/ajax.php?respose_file=flow&step=add_all_to_cart', 'goods=' + goods.toJSONString(), addToCartResponse, 'POST', 'JSON');
}

function getSelectedAttributes(formBuy)
{
  var spec_arr = new Array();
  var j = 0;

  for (i = 0; i < formBuy.elements.length; i ++ )
  {
    var prefix = formBuy.elements[i].name.substr(0, 5);

    if (prefix == 'spec_' && (
      ((formBuy.elements[i].type == 'radio' || formBuy.elements[i].type == 'checkbox') && formBuy.elements[i].checked) ||
      formBuy.elements[i].tagName == 'SELECT'))
    {
      spec_arr[j] = formBuy.elements[i].value;
      j++ ;
    }
  }

  return spec_arr;
}

function addToCartResponse(result)
{
  if (result.error > 0)
  {
    
    if (result.error == 2)
    {
      if (confirm(result.message))
      {
        location.href = 'user.php?act=add_booking&id=' + result.goods_id;
      }
    }

    else if (result.error == 6)
    {
      if (confirm(result.message))
      {
        location.href = 'goods.php?id=' + result.goods_id;
      }
    }
    else
    {
      alert(result.message);
    }
  }
  else
  {
    var cartInfo = document.getElementById('SECARTINFO');
    var cart_url = 'flow.php?step=cart';
    if (cartInfo)
    {
      cartInfo.innerHTML = result.content;
    }

    if (result.one_step_buy == '1')
    {
      location.href = cart_url;
    }
    else
    {
      switch(result.confirm_type)
      {
        case '1' :
          if (confirm(result.message)) location.href = cart_url;
          break;
        case '2' :
          if (!confirm(result.message)) location.href = cart_url;
          break;
        case '3' :
          location.href = cart_url;
          break;
        default :
          break;
      }
    }
  }
}

function collect(goodsId)
{
  Ajax.call('/ajax.php?respose_file=user&act=collect', 'id=' + goodsId, collectResponse, 'GET', 'JSON');
}

function collectResponse(result)
{
  alert(result.message);
}

function signInResponse(result)
{
  toggleLoader(false);

  var done    = result.substr(0, 1);
  var content = result.substr(2);

  if (done == 1)
  {
    document.getElementById('member-zone').innerHTML = content;
  }
  else
  {
    alert(content);
  }
}

var EC_additional = "";

function gotoPage(page, id, type)
{
  Ajax.call('/ajax.php?respose_file=comment&act=gotopage', 'page=' + page + '&id=' + id + '&type=' + type, gotoPageResponse, 'GET', 'JSON');
}

function gotoPageResponse(result)
{
  document.getElementById("SECOMMENT").innerHTML = result.content;
}

function getFormatedPrice(price)
{
  if (currencyFormat.indexOf("%s") > - 1)
  {
    return currencyFormat.replace('%s', advFormatNumber(price, 2));
  }
  else if (currencyFormat.indexOf("%d") > - 1)
  {
    return currencyFormat.replace('%d', advFormatNumber(price, 0));
  }
  else
  {
    return price;
  }
}

function bid(step)
{
  var price = '';
  var msg   = '';
  if (step != - 1)
  {
    var frm = document.forms['formBid'];
    price   = frm.elements['price'].value;
    id = frm.elements['snatch_id'].value;
    if (price.length == 0)
    {
      msg += price_not_null + '\n';
    }
    else
    {
      var reg = /^[\.0-9]+/;
      if ( ! reg.test(price))
      {
        msg += price_not_number + '\n';
      }
    }
  }
  else
  {
    price = step;
  }

  if (msg.length > 0)
  {
    alert(msg);
    return;
  }

  Ajax.call('/ajax.php?respose_file=snatch&act=bid&id=' + id, 'price=' + price, bidResponse, 'POST', 'JSON');
}


function bidResponse(result)
{
  if (result.error == 0)
  {
    document.getElementById('SESNATCH').innerHTML = result.content;
    if (document.forms['formBid'])
    {
      document.forms['formBid'].elements['price'].focus();
    }
    newPrice(); 
  }
  else
  {
    alert(result.content);
  }
}


function newPrice(id)
{
  Ajax.call('/ajax.php?respose_file=snatch&act=new_price_list&id=' + id, '', newPriceResponse, 'GET', 'TEXT');
}


function newPriceResponse(result)
{
  document.getElementById('SEPRICE_LIST').innerHTML = result;
}


function getAttr(cat_id)
{
  var tbodies = document.getElementsByTagName('tbody');
  for (i = 0; i < tbodies.length; i ++ )
  {
    if (tbodies[i].id.substr(0, 10) == 'goods_type')tbodies[i].style.display = 'none';
  }

  var type_body = 'goods_type_' + cat_id;
  try
  {
    document.getElementById(type_body).style.display = '';
  }
  catch (e)
  {
  }
}


function advFormatNumber(value, num) 
{
  var a_str = formatNumber(value, num);
  var a_int = parseFloat(a_str);
  if (value.toString().length > a_str.length)
  {
    var b_str = value.toString().substring(a_str.length, a_str.length + 1);
    var b_int = parseFloat(b_str);
    if (b_int < 5)
    {
      return a_str;
    }
    else
    {
      var bonus_str, bonus_int;
      if (num == 0)
      {
        bonus_int = 1;
      }
      else
      {
        bonus_str = "0.";
        for (var i = 1; i < num; i ++ )
        bonus_str += "0";
        bonus_str += "1";
        bonus_int = parseFloat(bonus_str);
      }
      a_str = formatNumber(a_int + bonus_int, num);
    }
  }
  return a_str;
}

function formatNumber(value, num) 
{
  var a, b, c, i;
  a = value.toString();
  b = a.indexOf('.');
  c = a.length;
  if (num == 0)
  {
    if (b != - 1)
    {
      a = a.substring(0, b);
    }
  }
  else
  {
    if (b == - 1)
    {
      a = a + ".";
      for (i = 1; i <= num; i ++ )
      {
        a = a + "0";
      }
    }
    else
    {
      a = a.substring(0, b + num + 1);
      for (i = c; i <= b + num; i ++ )
      {
        a = a + "0";
      }
    }
  }
  return a;
}


function set_insure_status()
{
  
  var shippingId = getRadioValue('shipping');
  var insure_fee = 0;
  if (shippingId > 0)
  {
    if (document.forms['theForm'].elements['insure_' + shippingId])
    {
      insure_fee = document.forms['theForm'].elements['insure_' + shippingId].value;
    }

    if (document.forms['theForm'].elements['need_insure'])
    {
      document.forms['theForm'].elements['need_insure'].checked = false;
    }


    if (document.getElementById("ecs_insure_cell"))
    {
      if (insure_fee > 0)
      {
        document.getElementById("ecs_insure_cell").style.display = '';
        setValue(document.getElementById("ecs_insure_fee_cell"), getFormatedPrice(insure_fee));
      }
      else
      {
        document.getElementById("ecs_insure_cell").style.display = "none";
        setValue(document.getElementById("ecs_insure_fee_cell"), '');
      }
    }
  }
}

function changePayment(pay_id)
{
  
  calculateOrderFee();
}

function getCoordinate(obj)
{
  var pos =
  {
    "x" : 0, "y" : 0
  };

  pos.x = document.body.offsetLeft;
  pos.y = document.body.offsetTop;

  do
  {
    pos.x += obj.offsetLeft;
    pos.y += obj.offsetTop;

    obj = obj.offsetParent;
  }
  while (obj.tagName.toUpperCase() != 'BODY');

  return pos;
}

function showCatalog(obj)
{
  var pos = getCoordinate(obj);
  var div = document.getElementById('SECATALOG');

  if (div && div.style.display != 'block')
  {
    div.style.display = 'block';
    div.style.left = pos.x + "px";
    div.style.top = (pos.y + obj.offsetHeight - 1) + "px";
  }
}

function hideCatalog(obj)
{
  var div = document.getElementById('SECATALOG');

  if (div && div.style.display != 'none') div.style.display = "none";
}

function sendHashMail()
{
  Ajax.call('/ajax.php?respose_file=user&act=send_hash_mail', '', sendHashMailResponse, 'GET', 'JSON');
}

function sendHashMailResponse(result)
{
  alert(result.message);
}


function orderQuery()
{
  var order_sn = document.forms['ecsOrderQuery']['order_sn'].value;

  var reg = /(19|20)\d{2}(0\d|1[12])([0123]\d)/;
  if (order_sn.length < 9 || ! reg.test(order_sn))
  {
    alert(invalid_order_sn);//  
    return;
  }
  Ajax.call('/ajax.php?respose_file=user&act=order_query&order_sn=s' + order_sn, '', orderQueryResponse, 'GET', 'JSON');
}

function orderQueryResponse(result)
{
  if (result.message.length > 0)
  {
    alert(result.message);
  }
  if (result.error == 0)
  {
    var div = document.getElementById('SEORDER_QUERY');
    div.innerHTML = result.content;
  }
}

function display_mode(str)
{
    document.getElementById('display').value = str;
    setTimeout(doSubmit, 0);
    function doSubmit() {document.forms['listform'].submit();}
}


function fixpng()
{
  var arVersion = navigator.appVersion.split("MSIE");
  var version = parseFloat(arVersion[1]);

  if ((version >= 5.5) && (document.body.filters))
  {
     for(var i=0; i<document.images.length; i++)
     {
        var img = document.images[i];
        var imgName = img.src.toUpperCase();
        if (imgName.substring(imgName.length-3, imgName.length) == "PNG")
        {
           var imgID = (img.id) ? "id='" + img.id + "' " : "";
           var imgClass = (img.className) ? "class='" + img.className + "' " : "";
           var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' ";
           var imgStyle = "display:inline-block;" + img.style.cssText;
           if (img.align == "left") imgStyle = "float:left;" + imgStyle;
           if (img.align == "right") imgStyle = "float:right;" + imgStyle;
           if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle;
           var strNewHTML = "<span " + imgID + imgClass + imgTitle
           + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
           + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
           + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>";
           img.outerHTML = strNewHTML;
           i = i-1;
        }
     }
  }
}

function hash(string, length)
{
  var length = length ? length : 32;
  var start = 0;
  var i = 0;
  var result = '';
  filllen = length - string.length % length;
  for(i = 0; i < filllen; i++)
  {
    string += "0";
  }
  while(start < string.length)
  {
    result = stringxor(result, string.substr(start, length));
    start += length;
  }
  return result;
}

function stringxor(s1, s2)
{
  var s = '';
  var hash = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var max = Math.max(s1.length, s2.length);
  for(var i=0; i<max; i++)
  {
    var k = s1.charCodeAt(i) ^ s2.charCodeAt(i);
    s += hash.charAt(k % 52);
  }
  return s;
}

var evalscripts = new Array();
function evalscript(s)
{
  if(s.indexOf('<script') == -1) return s;
  var p = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/ig;
  var arr = new Array();
  while(arr = p.exec(s)) appendscript(arr[1], '', arr[2], arr[3]);
  return s;
}

function $$(id)
{
    return document.getElementById(id);
}

function appendscript(src, text, reload, charset)
{
  var id = hash(src + text);
  if(!reload && in_array(id, evalscripts)) return;
  if(reload && $$(id))
  {
    $$(id).parentNode.removeChild($$(id));
  }
  evalscripts.push(id);
  var scriptNode = document.createElement("script");
  scriptNode.type = "text/javascript";
  scriptNode.id = id;
  //scriptNode.charset = charset;
  try
  {
    if(src)
    {
      scriptNode.src = src;
    }
    else if(text)
    {
      scriptNode.text = text;
    }
    $$('append_parent').appendChild(scriptNode);
  }
  catch(e)
  {}
}

function in_array(needle, haystack)
{
  if(typeof needle == 'string' || typeof needle == 'number')
  {
    for(var i in haystack)
    {
      if(haystack[i] == needle)
      {
        return true;
      }
    }
  }
  return false;
}

var pmwinposition = new Array();

var userAgent = navigator.userAgent.toLowerCase();
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_moz = (navigator.product == 'Gecko') && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);


function pmwin(action, param)
{
  var objs = document.getElementsByTagName("OBJECT");
  if(action == 'open')
  {
    for(i = 0;i < objs.length; i ++)
    {
      if(objs[i].style.visibility != 'hidden')
      {
        objs[i].setAttribute("oldvisibility", objs[i].style.visibility);
        objs[i].style.visibility = 'hidden';
      }
    }
    var clientWidth = document.body.clientWidth;
    var clientHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
    var scrollTop = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
    var pmwidth = 800;
    var pmheight = clientHeight * 0.9;
    if(!$$('pmlayer'))
    {
      div = document.createElement('div');div.id = 'pmlayer';
      div.style.width = pmwidth + 'px';
      div.style.height = pmheight + 'px';
      div.style.left = ((clientWidth - pmwidth) / 2) + 'px';
      div.style.position = 'absolute';
      div.style.zIndex = '999';
      $$('append_parent').appendChild(div);
      $$('pmlayer').innerHTML = '<div style="width: 800px; background: #666666; margin: 5px auto; text-align: left">' +
        '<div style="width: 800px; height: ' + pmheight + 'px; padding: 1px; background: #FFFFFF; border: 1px solid #7597B8; position: relative; left: -6px; top: -3px">' +
        '<div onmousedown="pmwindrag(event, 1)" onmousemove="pmwindrag(event, 2)" onmouseup="pmwindrag(event, 3)" style="cursor: move; position: relative; left: 0px; top: 0px; width: 800px; height: 30px; margin-bottom: -30px;"></div>' +
        '<a href="###" onclick="pmwin(\'close\')"><img style="position: absolute; right: 20px; top: 15px" src="images/close.gif" title="Close" /></a>' +
        '<iframe id="pmframe" name="pmframe" style="width:' + pmwidth + 'px;height:100%" allowTransparency="true" frameborder="0"></iframe></div></div>';
    }
    $$('pmlayer').style.display = '';
    $$('pmlayer').style.top = ((clientHeight - pmheight) / 2 + scrollTop) + 'px';
    if(!param)
    {
        pmframe.location = 'pm.php';
    }
    else
    {
        pmframe.location = 'pm.php?' + param;
    }
  }
  else if(action == 'close')
  {
    for(i = 0;i < objs.length; i ++)
    {
      if(objs[i].attributes['oldvisibility'])
      {
        objs[i].style.visibility = objs[i].attributes['oldvisibility'].nodeValue;
        objs[i].removeAttribute('oldvisibility');
      }
    }
    hiddenobj = new Array();
    $$('pmlayer').style.display = 'none';
  }
}

var pmwindragstart = new Array();
function pmwindrag(e, op)
{
  if(op == 1)
  {
    pmwindragstart = is_ie ? [event.clientX, event.clientY] : [e.clientX, e.clientY];
    pmwindragstart[2] = parseInt($$('pmlayer').style.left);
    pmwindragstart[3] = parseInt($$('pmlayer').style.top);
    doane(e);
  }
  else if(op == 2 && pmwindragstart[0])
  {
    var pmwindragnow = is_ie ? [event.clientX, event.clientY] : [e.clientX, e.clientY];
    $$('pmlayer').style.left = (pmwindragstart[2] + pmwindragnow[0] - pmwindragstart[0]) + 'px';
    $$('pmlayer').style.top = (pmwindragstart[3] + pmwindragnow[1] - pmwindragstart[1]) + 'px';
    doane(e);
  }
  else if(op == 3)
  {
    pmwindragstart = [];
    doane(e);
  }
}

function doane(event)
{
  e = event ? event : window.event;
  if(is_ie)
  {
    e.returnValue = false;
    e.cancelBubble = true;
  }
  else if(e)
  {
    e.stopPropagation();
    e.preventDefault();
  }
}


function UrlEncode(str){ 
	return transform(str); 
} 
    
function transform(s){ 
	var hex='';
	var i,j,t ;
	j=0 ;
	for (i=0; i<s.length; i++){ 
		t = hexfromdec( s.charCodeAt(i) ); 
		if (t=='25'){ 	
			t=''; 
		} 
		hex += '%' + t; 
	} 
	return hex; 
} 
    
function hexfromdec(num) { 
	if (num > 65535) { return ("err!") ;} 
	first = Math.round(num/4096 - .5); 
	temp1 = num - first * 4096; 
	second = Math.round(temp1/256 -.5); 
	temp2 = temp1 - second * 256; 
	third = Math.round(temp2/16 - .5); 
	fourth = temp2 - third * 16; 
	return (""+getletter(third)+getletter(fourth)); 
} 
    
function getletter(num) { 
	if (num < 10) { 
		return num; 
	}else{ 
		if (num == 10) { return "A"; } 
		if (num == 11) { return "B" ;} 
		if (num == 12) { return "C"; } 
		if (num == 13) { return "D" ;} 
		if (num == 14) { return "E" ;} 
		if (num == 15) { return "F"; } 
	} 
} 

function Change_currency(values){
	thisSLoc = UrlEncode(self.location.href);
	//alert(UrlEncode(thisSLoc));
	//window.location.reload();
	window.location = 'Change.php?values='+values+'&Url='+thisSLoc;
}


var EC_maxtest = 0;

function get_tick()
{
	/*EC_maxtest++;
	
	if(sys_tick != "")
	{
		return sys_tick;
	}
	else if(EC_maxtest == 30)
	{
		
		return "sys_tick_error";
	}
	else
	{
		setTimeout("get_tick()", 100);
	}*/
}

function signIn()
{
  var frm = document.forms['SELOGINFORM'];

  if (frm)
  {
    var username = frm.elements['username'].value;
    var password = frm.elements['password'].value;
    var captcha = '';
    if (frm.elements['captcha'])
    {
      captcha = frm.elements['captcha'].value;
    }
    if (username.length == 0)
    {

	  frm.elements['username'].focus();
      return;
    }else if(password.length == 0)
	{
	  frm.elements['password'].focus();
      return;
	}
    else
    {
       Ajax.call('/ajax.php?respose_file=user&act=signin', 'username=' + username + '&password=' + encodeURIComponent(password) + '&captcha=' + captcha, signinResponse1, "POST", "TEXT");
    }
  }
  else
  {
    alert('Template error!');
  }
}

function signinResponse1(result)
{
  var userName = document.forms['SELOGINFORM'].elements['username'].value;
  var mzone = document.getElementById("SEMEMBERZONE");
  var res   = result.parseJSON();
  if (res.error > 0)
  {
    
    alert(res.content);
    if(res.html)
	{
      mzone.innerHTML =res.html;
	  document.forms['SELOGINFORM'].elements['username'].value = userName;
	}
  }
  else
  {
    if (mzone)
    {
      mzone.innerHTML = res.content;
			evalscript(res.ucdata);
    }
    else
    {
      alert("Template Error!");
    }
  }
}

function assign_email()
{
	
	try{
		var myinputs = document.getElementsByTagName("input");
		
		for(var i=0; i<myinputs.length; ++i)
		{
			if(myinputs[i].getAttribute('rel') == 'email')
			{
				myinputs[i].value = EC_email;
			}
		}
		
	}
	catch(e)
	{}
}