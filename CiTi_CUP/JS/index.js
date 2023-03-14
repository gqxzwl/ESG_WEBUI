const container = document.getElementsByClassName('container_index')[0];
const signIn = document.getElementById('sign-in');
const signUp = document.getElementById('sign-up');
const register = document.getElementById('register');
const enter = document.getElementById('enter');

signUp.onclick = function() {
    container.classList.add('active');
}
signIn.onclick = function() {
    container.classList.remove('active');
}


register.onclick = function(){
    usr = document.getElementById('username').value;
    passwd = document.getElementById('password').value;
    email = document.getElementById('email').value;
    var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
    httpRequest.open('POST', 'http://127.0.0.1:9000/register', true); //第二步：打开连接/***发送json格式文件必须设置请求头 ；如下 - */
    httpRequest.setRequestHeader("Content-type","application/json");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
    var obj = { user: usr, password: passwd,email: email};
    httpRequest.send(JSON.stringify(obj));//发送请求 将json写入send中

    httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
                var result = httpRequest.responseText;//获取到服务端返回的数据
                console.log(result);
                if(result=='True'){
                    document.getElementById("registered").innerHTML = "您已成功注册账号";
                }
                else{
                    alert("邮箱或用户名已存在，请勿重复注册！");
                }
                
        }
    };
}


enter.onclick = function() {
    email = document.getElementById('enterEmail').value;
    passwd = document.getElementById('enterPassword').value;
    var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
    httpRequest.open('POST', 'http://127.0.0.1:9000/enter', true); //第二步：打开连接/***发送json格式文件必须设置请求头 ；如下 - */
    httpRequest.setRequestHeader("Content-type","application/json");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
    var obj = {password: passwd, email: email};
    httpRequest.send(JSON.stringify(obj));//发送请求 将json写入send中

    httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
            var result = httpRequest.responseText;//获取到服务端返回的数据
            if(result=='True'){
                document.getElementById("entered").innerHTML = "登录成功";
                window.location.href='http://127.0.0.1:9000/scoreboard';
            }
            else{
                document.getElementById("enterPassword").value = '';
                alert("登录失败，请检测账号密码是否正确！");
            }
        }
    };
}


sendEmail.onclick = function(){
    email = document.getElementById("forgetEmail").value;
    console.log(email);
    var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
    httpRequest.open('POST', 'http://127.0.0.1:9000/sendEmail', true); //第二步：打开连接/***发送json格式文件必须设置请求头 ；如下 - */
    httpRequest.setRequestHeader("Content-type","application/json");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
    var obj = {email: email};
    httpRequest.send(JSON.stringify(obj));//发送请求 将json写入send中

    httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
            var result = httpRequest.responseText;//获取到服务端返回的数据
            if(result=='False'){
                alert("发送失败，该邮箱不存在，请重新注册账号！");
            }
            else{
                document.getElementById("changePasswd").innerHTML = "发送成功";
            }
        }
    };
}



resetPassswd.onclick = function(){
    email = document.getElementById("forgetEmail").value;
    captcha = document.getElementById("captcha").value;
    newPasswd = document.getElementById("newPasswd").value;
    confirmNewPasswd = document.getElementById("confirmNewPasswd").value;

    if(newPasswd==confirmNewPasswd){
        var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
        httpRequest.open('POST', 'http://127.0.0.1:9000/resetPassswd', true); //第二步：打开连接/***发送json格式文件必须设置请求头 ；如下 - */
        httpRequest.setRequestHeader("Content-type","application/json");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
        var obj = {email: email, captcha:captcha, newPasswd:newPasswd};
        httpRequest.send(JSON.stringify(obj));//发送请求 将json写入send中
    
        httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
                var result = httpRequest.responseText;//获取到服务端返回的数据
                if(result=='True'){
                    document.getElementById("changePasswd").innerHTML = "更改密码成功";
                }
                else{
                    alert("验证码错误！")
                }
            }
        };
    }
    else{
        alert("两次输入的密码不一致！")
    }



}