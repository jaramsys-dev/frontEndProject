//window.localStorage.removeItem("userDB");
//used to init user database
function loadPage()
{
    console.log("Start - loadPage()");
    let userdb = [{userName : "admin",password : "admin"}];
    
    let db = window.localStorage;
    console.log(db.getItem("userDB"));
    if(db.getItem("userDB")===null)
    {
        db.setItem("userDB",JSON.stringify(userdb))
    }
    console.log(db.getItem("userDB"));
}

//used to login user check
function login(event)
{
    event.preventDefault();
    console.log("Start - login()");
    
    let userDB = JSON.parse(window.localStorage.getItem("userDB"));
    console.log("userDB:");
    console.log(userDB);

    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    if(formProps.userName=="")
    {
        console.log("enter user name");
        document.getElementById("uNameDisc").style="display:bloack";
        
    }else if(formProps.password==""){
        console.log("enter password");
        document.getElementById("passwordDisc").style="display:bloack";
    }else{
    
    let userData = userDB.filter(data => data.userName===formProps.userName);
    if(userData.length>0)
    {
        console.log("user name found");
        if(userData[0].password === formProps.password){
            console.log("user Login Success");
            alert("Welcome "+formProps.userName+"\nLogin Success");
        }
        else{
            console.log("Incorrect Password");
        }
    }
    else{
        console.log("user name not found");
    }
    }
}

//used to show password
function showPassword()
{
    if(document.getElementById("showPass").checked)
        document.getElementById("password").type = "text";
    else
        document.getElementById("password").type = "password";
}

//used to hide password disclaimer msg
function passwordChanged()
{
    document.getElementById("passwordDisc").style="display:none";
}

//used to hide user name disclaimer msg
function uNameChanged()
{
    document.getElementById("uNameDisc").style="display:none";
}

//used to redirect to new user registration page
function openRegPage(){
    console.log("Start - openRegPage()");
    window.location.href = "registration.html";
}

//used to save new user
function saveNewUser(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    
    if(formProps.userName==="")
    {
        console.log("enter user name");
        document.getElementById("userNameDisc").style="display:bloack";
        document.getElementById("usermsg").textContent="Enter User Name";
    }
    else if(formProps.password==="")
    {
        console.log("enter password");
        document.getElementById("passwordDisc").style="display:bloack";
        document.getElementById("passmsg").textContent="Enter Password";
    }
    else if(formProps.rPassword==="")
    {
        console.log("enter repeat password");
        document.getElementById("rPassDisc").style="display:bloack";
        document.getElementById("rPmsg").textContent="Enter Repeat Password";
    }
    else if(formProps.password!=formProps.rPassword)
    {
        console.log("password mismatch");
        document.getElementById("rPassDisc").style="display:bloack";
        document.getElementById("rPmsg").textContent="Password Mismatch";
    }
    else{

        let userDB = JSON.parse(window.localStorage.getItem("userDB"));
        let userData = userDB.filter(data => data.userName===formProps.userName);
        console.log(userData);
        if(userData.length==1)
        {
            console.log("user name already exists");
            document.getElementById("userNameDisc").style="display:bloack";
            document.getElementById("usermsg").textContent="User Name Already Exists";            
        }
        else
        {
            let nUser = {userName : formProps.userName,password : formProps.password};
            userDB.push(nUser);
            window.localStorage.setItem("userDB",JSON.stringify(userDB));
            console.log("new user created successfully");
            console.log(userDB);
            alert("New User Created Successfully");
            window.location.href = "login.html";

        }
        
    }
}

function regUserNameChanged()
{
    document.getElementById("userNameDisc").style="display:none";
} 

function regPasswordChanged()
{
    document.getElementById("passwordDisc").style="display:none";
}

function regRPasswordChanged()
{
    document.getElementById("rPassDisc").style="display:none";    
}

