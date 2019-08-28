function userEdit()
{
  var frm = document.forms['formEdit'];
  var email = frm.elements['email'].value;
  var msg = '';
  var reg = null;

  if (email.length == 0)
  {
    msg += email_empty + '\n';
  }
  else
  {
    if ( ! (Utils.isEmail(email)))
    {
      msg += email_error + '\n';
    }
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

function editPassword()
{
  var frm              = document.forms['formPassword'];
  var old_password     = frm.elements['old_password'].value;
  var new_password     = frm.elements['new_password'].value;
  var confirm_password = frm.elements['comfirm_password'].value;

  var msg = '';
  var reg = null;

  if (old_password.length == 0)
  {
    msg += old_password_empty + '\n';
  }

  if (new_password.length == 0)
  {
    msg += new_password_empty + '\n';
  }

  if (confirm_password.length == 0)
  {
    msg += confirm_password_empty + '\n';
  }

  if (new_password.length > 0 && confirm_password.length > 0)
  {
    if (new_password != confirm_password)
    {
      msg += both_password_error + '\n';
    }
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

function submitMsg()
{
  var frm         = document.forms['formMsg'];
  var msg_title   = frm.elements['msg_title'].value;
  var msg_content = frm.elements['msg_content'].value;
  var msg = '';

  if (msg_title.length == 0)
  {
    msg += msg_title_empty + '\n';
  }
  if (msg_content.length == 0)
  {
    msg += msg_content_empty + '\n'
  }

  if (msg_title.length > 200)
  {
    msg += msg_title_limit + '\n';
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

function submitPwdInfo()
{
  var frm = document.forms['getPassword'];
  var user_name = frm.elements['user_name'].value;
  var email     = frm.elements['email'].value;

  var errorMsg = '';
  if (user_name.length == 0)
  {
    errorMsg += user_name_empty + '\n';
		document.getElementById('user_name_info').innerHTML = user_name_empty;
		frm.elements['user_name'].focus();
		return false;
  }

  if (email.length == 0)
  {
    errorMsg += email_address_empty + '\n';
		document.getElementById('email_info').innerHTML = email_address_empty;
		frm.elements['email'].focus();
		return false;
  }
  else
  {
    if (!(Utils.isEmail(email)))
    {
     	errorMsg += email_address_error + '\n';
		document.getElementById('email_info').innerHTML = email_address_error;
		frm.elements['email'].focus();
		return false;
    }
  }
  return true;
}

function submitPwd()
{
  var frm = document.forms['getPassword2'];
  var password = frm.elements['new_password'].value;
  var confirm_password = frm.elements['confirm_password'].value;

  var errorMsg = '';
  if (password.length == 0)
  {
    errorMsg += new_password_empty + '\n';
  }

  if (confirm_password.length == 0)
  {
    errorMsg += confirm_password_empty + '\n';
  }

  if (confirm_password != password)
  {
    errorMsg += both_password_error + '\n';
  }

  if (errorMsg.length > 0)
  {
    alert(errorMsg);
    return false;
  }
  else
  {
    return true;
  }
}

function addBooking()
{
  var frm  = document.forms['formBooking'];
  var goods_id = frm.elements['id'].value;
  var rec_id  = frm.elements['rec_id'].value;
  var number  = frm.elements['number'].value;
  var desc  = frm.elements['desc'].value;
  var linkman  = frm.elements['linkman'].value;
  var email  = frm.elements['email'].value;
  var tel  = frm.elements['tel'].value;
  var msg = "";

  if (number.length == 0)
  {
    msg += booking_amount_empty + '\n';
  }
  else
  {
    var reg = /^[0-9]+/;
    if ( ! reg.test(number))
    {
      msg += booking_amount_error + '\n';
    }
  }

  if (desc.length == 0)
  {
    msg += describe_empty + '\n';
  }

  if (linkman.length == 0)
  {
    msg += contact_username_empty + '\n';
  }

  if (email.length == 0)
  {
    msg += email_empty + '\n';
  }
  else
  {
    if ( ! (Utils.isEmail(email)))
    {
      msg += email_error + '\n';
    }
  }

  if (tel.length == 0)
  {
    msg += contact_phone_empty + '\n';
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }

  return true;
}

	function userLogin()
	{
	  var frm      = document.forms['formLogin'];
	  var username = frm.elements['username'].value;
	  var password = frm.elements['password'].value;
	  var msg = '';

	  if (username.length == 0)
	  {
		msg += username_empty + '\n';
		document.getElementById('username_info').innerHTML = username_empty;
		frm.elements['username'].focus();
		//document.getElementById('username').className = 'border_class';
		return false;
	  }
	
	  if (password.length == 0)
	  {
		msg += password_empty + '\n';
		document.getElementById('password_info').innerHTML = password_empty;
		frm.elements['password'].focus();
		return false;
	  }
	  return true;
	}

	function check_userLogin(value,type)
	{
		if (type == 1)
		{
			if (value.length > 0)
			{
				document.getElementById('username_info').innerHTML = '';
				return true;
			}
		}else if (type == 2)
		{
			if (value.length > 0)
			{
				document.getElementById('password_info').innerHTML = '';
				return true;
			}
		}
		else if (type == 3)
		{
			if (value.length > 0)
			{
				document.getElementById('user_name_info').innerHTML = '';
				return true;
			}
		}
		else if (type == 4)
		{
			if (value.length > 0)
			{
				document.getElementById('email_info').innerHTML = '';
				return true;
			}
		}
	}
	
	function chkstr(str)
	{
	  for (var i = 0; i < str.length; i++)
	  {
		if (str.charCodeAt(i) < 127 && !str.substr(i,1).match(/^\w+$/ig))
		{
		  return false;
		}
	  }
	  return true;
	}

function check_password( password )
{
	if(password=="")
	{
	   document.getElementById('password_notice').innerHTML = password_shorter;
	   return false;
	}
	else 
	{
    	if ( password.length < 6 )
    	{
        	document.getElementById('password_notice').innerHTML = password_6_length;
			return false;
    	}
    	else
    	{
      	  document.getElementById('password_notice').innerHTML = '<Font color=green>'+msg_can_rg+'</Font>';
    	}
	}
}

function check_conform_password( conform_password )
{
   var  password = document.getElementById('password1').value;
   //alert(conform_password+"||"+password);
    if (conform_password=='')
    {
        document.getElementById('conform_password_notice').innerHTML = conform_password_empty;
        return false;
    }
   if ( conform_password!=password || conform_password=='')
    {
        document.getElementById('conform_password_notice').innerHTML = confirm_password_invalid;
        return false;
    }
    else
    {
	     document.getElementById('conform_password_notice').innerHTML = '<Font color=green>'+msg_can_rg+'</Font>';
    }
}

function is_registered()
{

    var submit_disabled = false;
	var username = arguments[0];

	var unlen = arguments[0].replace(/[^\x00-\xff]/, "**").length;

	var flags = arguments[1];
  
	  if(flags == null)
	  {
		flags = true;
	  }

    if ( !chkstr( username ) )
    {
        document.getElementById('username_notice').innerHTML = msg_un_format;
        var submit_disabled = true;
    }
    if ( unlen < 3 )
    { 
        document.getElementById('username_notice').innerHTML = msg_un_length;
        var submit_disabled = true;
    }
    if ( unlen > 30 )
    {
        document.getElementById('username_notice').innerHTML = msg_un_length;
        var submit_disabled = true;
    }
    if ( submit_disabled )
    {
        document.getElementById('Submit').disabled = 'disabled';
        return false;
    }
    var res =  Ajax.call( 'user.php?act=is_registered', 'username=' + username, registed_callback , 'GET', 'TEXT', flags, true );
	
	return res=='true'?true:false;
}



function registed_callback(result)
{
  if ( result == "true" )
  {
    document.getElementById('username_notice').innerHTML = '<Font color=green>'+msg_can_rg+'</Font>';
    document.getElementById('Submit').disabled = '';
  }
  else
  {
    document.getElementById('username_notice').innerHTML = msg_un_registered;
	document.getElementById('Submit').disabled = 'disabled';
  }
}

function checkEmail()
{
  var submit_disabled = false;
  
  var email = arguments[0];
  var flags = arguments[1];
  
  if(flags == null)
  {
	flags = true;
  }
  
  if (email == '')
  {
    document.getElementById('email_notice').innerHTML = msg_email_blank;
    submit_disabled = true;
  }
  else if (!Utils.isEmail(email))
  {
    document.getElementById('email_notice').innerHTML = msg_email_format;
    submit_disabled = true;
  }
 
  if( submit_disabled )
  {
    document.getElementById('Submit').disabled = 'disabled';
    return false;
  }
  var res = Ajax.call( 'user.php?act=check_email', 'email=' + email, check_email_callback , 'GET', 'TEXT', flags, true );
  
  return res=='ok'?true:false;
}

function check_email_callback(result)
{
  if ( result == 'ok' )
  {
    document.getElementById('email_notice').innerHTML = '<Font color=green>'+msg_can_rg+'</Font>';
    document.getElementById("Submit").disabled = '';
  }
  else
  {
    document.getElementById('email_notice').innerHTML = msg_email_registered;
    document.getElementById("Submit").disabled = 'disabled';
  }
}
	function agreement_click()
	{
		var frm  = document.forms['formUser'];
		var agreement_check  = Utils.trim(frm.elements['agreement'].checked);
		if (Utils.trim(frm.elements['agreement'].checked) == false){
			document.getElementById('agreement_notice').innerHTML = agreement;	
		}else{
			document.getElementById('agreement_notice').innerHTML = '<Font color=green>'+msg_can_rg+'</Font>';;	
		}
	}

	function check_list(result,type){
		str1 = result.length;
		if (type == 1){
			if (result > 0){
				 document.getElementById('Country_list_notice').innerHTML = '<Font color=green>'+msg_can_rg+'</Font>';
			}else{
				 document.getElementById('Country_list_notice').innerHTML = Country_no_select_info;
			}
		}else if(type == 2){
			if (result > 0){
				 document.getElementById('Security_Question_notice').innerHTML = '<Font color=green>'+msg_can_rg+'</Font>';
			}else{
				 document.getElementById('Security_Question_notice').innerHTML = Security_Question_info;
			}
		
		}else if(type == 3){ 
			if (str1 > 0){
				if (str1 > 30){
					document.getElementById('FirstName_notice').innerHTML = FirstName_info;
				}else{
					document.getElementById('FirstName_notice').innerHTML = '<Font color=green>'+msg_can_rg+'</Font>';
				}
			}else{
				 document.getElementById('FirstName_notice').innerHTML = '<Font color=green>'+msg_can_rg+'</Font>';
			}
		
		}else if(type == 4){ 
			if (str1 > 0){
				if (str1 > 100){
					document.getElementById('LastName_notice').innerHTML = LastName_info;
				}else{
					document.getElementById('LastName_notice').innerHTML = '<Font color=green>'+msg_can_rg+'</Font>';
				}
			}else{
				 document.getElementById('LastName_notice').innerHTML = '<Font color=green>'+msg_can_rg+'</Font>';
			}
		
		}else if(type == 5){ 
			if (str1 > 0){
				if (str1 > 255){
					document.getElementById('StreetAddress_notice').innerHTML = StreetAddress_info;
				}else{
					document.getElementById('StreetAddress_notice').innerHTML = '<Font color=green>'+msg_can_rg+'</Font>';
				}
			}else{
				 document.getElementById('StreetAddress_notice').innerHTML = '<Font color=green>'+msg_can_rg+'</Font>';
			}

		}else if(type == 6){ 
			if (str1 > 0){
				if (str1 > 30){
					document.getElementById('ZIP_notice').innerHTML = ZIP_info;
				}else{
					document.getElementById('ZIP_notice').innerHTML = '<Font color=green>'+msg_can_rg+'</Font>';
				}
			}else{
				 document.getElementById('ZIP_notice').innerHTML = '<Font color=green>'+msg_can_rg+'</Font>';
			}

		}else if(type == 7){ 
			if (str1 > 0){
				if (str1 > 30){
					document.getElementById('Num_01_notice').innerHTML = Num_01_info;
				}else{
					document.getElementById('Num_01_notice').innerHTML = '<Font color=green>'+msg_can_rg+'</Font>';
				}
			}else{
				 document.getElementById('Num_01_notice').innerHTML = '<Font color=green>'+msg_can_rg+'</Font>';
			}

		}else if(type == 0){ 
			if (str1 > 0){
				if (document.formUser.Security_Question.value == 0){
					document.getElementById('Security_Question_notice').innerHTML = Security_Question_info;	
					document.formUser.Security_Question.focus();
				}else{
					if (str1 > 60){
						document.getElementById('Security_Answer_notice').innerHTML = Security_Answer_info;
					}else{
						document.getElementById('Security_Answer_notice').innerHTML = '<Font color=green>'+msg_can_rg+'</Font>';
					}
				}
			}else{
				 document.getElementById('Security_Answer_notice').innerHTML = Security_Answer_info;
			}
		}else{
			alert('Error');
		}
	}

	function register()
	{
		
		var frm  = document.forms['formUser'];

		var username  = Utils.trim(frm.elements['username'].value);
		
		var email  = frm.elements['email'].value;
		
		var password  = Utils.trim(frm.elements['password'].value);

		var confirm_password = Utils.trim(frm.elements['confirm_password'].value);

		var Country_list  = frm.elements['Country_list']!=null? Utils.trim(frm.elements['Country_list'].value):null;
		var Security_Question  =frm.elements['Security_Question']!=null? Utils.trim(frm.elements['Security_Question'].value):null;

		var Security_Answer  =frm.elements['Security_Answer']!=null? Utils.trim(frm.elements['Security_Answer'].value):null;
		var FirstName  = frm.elements['FirstName']!=null? Utils.trim(frm.elements['FirstName'].value):null;
		var LastName  =frm.elements['LastName']!=null? Utils.trim(frm.elements['LastName'].value):null;
		var StreetAddress  =frm.elements['StreetAddress']!=null? Utils.trim(frm.elements['StreetAddress'].value):null;
		var ZIP  = frm.elements['ZIP']!=null? Utils.trim(frm.elements['ZIP'].value):null;
		var Num_01  =frm.elements['Num_01']!=null? Utils.trim(frm.elements['Num_01'].value):null;
		var checked_agreement =frm.elements['agreement']!=null? Utils.trim(frm.elements['agreement'].checked):null;
	
		
		if (username.length == 0){
			frm.username.focus();
			document.getElementById('username_notice').innerHTML = username_empty;
			return false;
		}else if(username.match(/^\s*$|^c:\\con\\con$|[%,\'\*\"\s\t\<\>\&\\]/)){
			frm.username.focus();
			document.getElementById('username_notice').innerHTML = username_invalid;
			return false;
		}else if (username.length < 3){
			frm.username.focus();
			document.getElementById('username_notice').innerHTML = username_shorter;
			return false;
		}

		if (email.length == 0){
			frm.email.focus();
			document.getElementById('email_notice').innerHTML = email_empty;
			return false;
		}else{
			if (!(Utils.isEmail(email)))
			{
				frm.email.focus();
				document.getElementById('email_notice').innerHTML = email_invalid;
				return false;
			}
		}
		
		if (password.length == 0){
			frm.password.focus(); 
			document.getElementById('password_notice').innerHTML = password_shorter;
			return false;
		}else if(password.length < 6){
			frm.password.focus(); 
			document.getElementById('password_notice').innerHTML = password_6_length;
			return false;
		}
		
		if (confirm_password != password ){
			frm.confirm_password.focus(); 
			document.getElementById('conform_password_notice').innerHTML = confirm_password_invalid;
			return false;
		}
		
		if(Country_list!=null)
		{
			if (Country_list == 0 ){
			frm.Country_list.focus(); 
			document.getElementById('Country_list_notice').innerHTML = Country_no_select_info;
			return false;
			}
		}
		if(Security_Question!=null)
		{		if (Security_Question == 0 ){
			frm.Security_Question.focus(); 
			document.getElementById('Security_Question_notice').innerHTML = Security_Question_info;
			return false;}
		}
		if(Security_Answer!=null)
		{
			if (Security_Answer.length == 0 ){
				frm.Security_Answer.focus(); 
				document.getElementById('Security_Answer_notice').innerHTML = Security_Answer_info;
				return false;
			}
		}
		if(FirstName!=null)
		{
			if (FirstName.length > 0 ){
				if (FirstName.length > 20){ 
					frm.FirstName.focus(); 
					document.getElementById('FirstName_notice').innerHTML = FirstName_info;
					return false;
				}
			}
		}
		if(LastName!=null)
		{
			if (LastName.length > 0 ){
				if (LastName.length > 100){ 
					frm.LastName.focus(); 
					document.getElementById('LastName_notice').innerHTML = LastName_info;
					return false;
				}
			}
		}
		if(StreetAddress!=null)
		{
			if (StreetAddress.length > 0 ){
				if (StreetAddress.length > 255){ 
					frm.StreetAddress.focus(); 
					document.getElementById('StreetAddress_notice').innerHTML = StreetAddress_info;
					return false;
				}
			}
		}
		if(ZIP!=null)
		{
		if (ZIP.length > 0 ){
			if (ZIP.length > 30){ 
				frm.ZIP.focus(); 
				document.getElementById('ZIP_notice').innerHTML = ZIP_info;
				return false;
			}
		}}
		if(Num_01!=null)
		{
		if (Num_01.length > 0 ){
			if (Num_01.length > 30){ 
				frm.Num_01.focus(); 
				document.getElementById('Num_01_notice').innerHTML = Num_01_info;
				return false;
			}
		}}
		if(checked_agreement!=null)
		{
		if(checked_agreement != true){
			//msg += agreement + '\n';
			document.getElementById('agreement_notice').innerHTML = agreement;
			return false;
		}
		}
		try{
			sys_updata = true;
		}
		catch(e)
		{}
		
		var f = document.createElement("input");
		f.type = "hidden";
		f.name = "tick";
		f.value = get_tick();
		
		frm.appendChild(f);
	}
	function check_more_userinfo(){
		if (document.forms['formUser'].user_more_check.checked == true){
			document.getElementById('tr_more_userinfo').style.display = '';	
		}else{
			document.getElementById('tr_more_userinfo').style.display = 'none';	
		}
	}

function saveOrderAddress(id)
{
  var frm           = document.forms['formAddress'];
  var consignee     = frm.elements['consignee'].value;
  var email         = frm.elements['email'].value;
  var address       = frm.elements['address'].value;
  var zipcode       = frm.elements['zipcode'].value;
  var tel           = frm.elements['tel'].value;
  var mobile        = frm.elements['mobile'].value;
  var sign_building = frm.elements['sign_building'].value;
  var best_time     = frm.elements['best_time'].value;

  if (id == 0)
  {
    alert(current_ss_not_unshipped);
    return false;
  }
  var msg = '';
  if (address.length == 0)
  {
    msg += address_name_not_null + "\n";
  }
  if (consignee.length == 0)
  {
    msg += consignee_not_null + "\n";
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}


function submitSurplus()
{
  var frm            = document.forms['formSurplus'];
  var surplus_type   = frm.elements['surplus_type'].value;
  var surplus_amount = frm.elements['amount'].value;
  var process_notic  = frm.elements['user_note'].value;
  var payment_id     = 0;
  var msg = '';

  if (surplus_amount.length == 0 )
  {
    msg += surplus_amount_empty + "\n";
  }
  else
  {
    var reg = /^[\.0-9]+/;
    if ( ! reg.test(surplus_amount))
    {
      msg += surplus_amount_error + '\n';
    }
  }

  if (process_notic.length == 0)
  {
    msg += process_desc + "\n";
  }

  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }

  if (surplus_type == 0)
  {
    for (i = 0; i < frm.elements.length ; i ++)
    {
      if (frm.elements[i].name=="payment_id" && frm.elements[i].checked)
      {
        payment_id = frm.elements[i].value;
        break;
      }
    }

    if (payment_id == 0)
    {
      alert(payment_empty);
      return false;
    }
  }

  return true;
}


function addBonus()
{
  var frm      = document.forms['addBouns'];
  var bonus_sn = frm.elements['bonus_sn'].value;

  if (bonus_sn.length == 0)
  {
    alert(bonus_sn_empty);
    return false;
  }
  else
  {
    var reg = /^[0-9]{10}$/;
    if ( ! reg.test(bonus_sn))
    {
      alert(bonus_sn_error);
      return false;
    }
  }

  return true;
}

function mergeOrder()
{
  if (!confirm(confirm_merge))
  {
    return false;
  }

  var frm        = document.forms['formOrder'];
  var from_order = frm.elements['from_order'].value;
  var to_order   = frm.elements['to_order'].value;
  var msg = '';

  if (from_order == 0)
  {
    msg += from_order_empty + '\n';
  }
  if (to_order == 0)
  {
    msg += to_order_empty + '\n';
  }
  else if (to_order == from_order)
  {
    msg += order_same + '\n';
  }
  if (msg.length > 0)
  {
    alert(msg);
    return false;
  }
  else
  {
    return true;
  }
}

function returnToCart(orderId)
{
  Ajax.call('user.php?act=return_to_cart', 'order_id=' + orderId, returnToCartResponse, 'POST', 'JSON');
}

function returnToCartResponse(result)
{
  alert(result.message);
}

function checkIntensity(pwd)
{
  var Mcolor = "#FFF",Lcolor = "#FFF",Hcolor = "#FFF";
  var m=0;

  var Modes = 0;
  for (i=0; i<pwd.length; i++)
  {
    var charType = 0;
    var t = pwd.charCodeAt(i);
    if (t>=48 && t <=57)
    {
      charType = 1;
    }
    else if (t>=65 && t <=90)
    {
      charType = 2;
    }
    else if (t>=97 && t <=122)
      charType = 4;
    else
      charType = 4;
    Modes |= charType;
  }

  for (i=0;i<4;i++)
  {
    if (Modes & 1) m++;
      Modes>>>=1;
  }

  if (pwd.length<=4)
  {
    m = 1;
  }

  switch(m)
  {
    case 1 :
      Lcolor = "2px solid red";
      Mcolor = Hcolor = "2px solid #DADADA";
    break;
    case 2 :
      Mcolor = "2px solid #f90";
      Lcolor = Hcolor = "2px solid #DADADA";
    break;
    case 3 :
      Hcolor = "2px solid #3c0";
      Lcolor = Mcolor = "2px solid #DADADA";
    break;
    case 4 :
      Hcolor = "2px solid #3c0";
      Lcolor = Mcolor = "2px solid #DADADA";
    break;
    default :
      Hcolor = Mcolor = Lcolor = "";
    break;
  }
  document.getElementById("pwd_lower").style.borderBottom  = Lcolor;
  document.getElementById("pwd_middle").style.borderBottom = Mcolor;
  document.getElementById("pwd_high").style.borderBottom   = Hcolor;

}

function changeType(obj)
{
  if (obj.getAttribute("min") && document.getElementById("SEAMOUNT"))
  {
    document.getElementById("SEAMOUNT").disabled = false;
    document.getElementById("SEAMOUNT").value = obj.getAttribute("min");
    if (document.getElementById("SENOTICE") && obj.getAttribute("to") && obj.getAttribute('fee'))
    {
      var fee = parseInt(obj.getAttribute("fee"));
      var to = parseInt(obj.getAttribute("to"));
      if (fee < 0)
      {
        to = to + fee * 2;
      }
      document.getElementById("SENOTICE").innerHTML = notice_result + to;
    }
  }
}

function calResult()
{
  var amount = document.getElementById("SEAMOUNT").value;
  var notice = document.getElementById("SENOTICE");

  reg = /^\d+$/;
  if (!reg.test(amount))
  {
    notice.innerHTML = notice_not_int;
    return;
  }
  amount = parseInt(amount);
  var frm = document.forms['transform'];
  for(i=0; i < frm.elements['type'].length; i++)
  {
    if (frm.elements['type'][i].checked)
    {
      var min = parseInt(frm.elements['type'][i].getAttribute("min"));
      var to = parseInt(frm.elements['type'][i].getAttribute("to"));
      var fee = parseInt(frm.elements['type'][i].getAttribute("fee"));
      var result = 0;
      if (amount < min)
      {
        notice.innerHTML = notice_overflow + min;
        return;
      }

      if (fee > 0)
      {
        result = (amount - fee) * to / (min -fee);
      }
      else
      {
        //result = (amount + fee* min /(to+fee)) * (to + fee) / min ;
        result = amount * (to + fee) / min + fee;
      }

      notice.innerHTML = notice_result + parseInt(result + 0.5);
    }
  }
}
