function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const ctx = React.useContext(UserContext);
  const [user, setUser]  = React.useState('');  
  // Aqui se referencia los elementos dentro del DOM, que serán modificados cuando se haga login 
  const createAccount = document.getElementById("create-account-nav");
  const login = document.getElementById("login-nav");
  const deposit = document.getElementById("deposit-nav");
  const withdraw = document.getElementById("withdraw-nav");
  const balance = document.getElementById("balance-nav");
  const allData = document.getElementById("alldata-nav");
 // const loginStatus = document.getElementById("login-status");
  
  var firebaseConfig = {
    apiKey: "AIzaSyBFsC8VTZ2hNcY_rng6UsW9JZEOQPM7Q68",
    authDomain: "courso-132fe.firebaseapp.com",
    databaseURL: "https://courso-132fe-default-rtdb.firebaseio.com",
    projectId: "courso-132fe",
    storageBucket: "courso-132fe.appspot.com",
    messagingSenderId: "727487263715",
    appId: "1:727487263715:web:4252fafe2c6ca027cd66d6"
  };

  !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();  
  
  function handleLoginStatus(){
    firebase.auth().onAuthStateChanged((firebaseUser) =>{
        if(firebaseUser){
            setStatus("User logged in with this email:  " + firebaseUser.email);
            console.log(firebaseUser.email);  
            //setUser(firebaseUser.email);
            ctx.user = firebaseUser.email;
            createAccount.style.display = "none";
            login.style.display = "inline";
            deposit.style.display = "inline";
            withdraw.style.display = "inline";
            balance.style.display = "inline";
            if(ctx.user==='wmgarciaporcel@gmail.com'){
            allData.style.display = "inline";}        
            setShow(false);   
        } else {
            setStatus("User is not logged in");
            console.log("User is not logged in");
            ctx.user = '';
            createAccount.style.display = "inline";
            login.style.display = "inline";
            deposit.style.display = "none";
            withdraw.style.display = "none";
            balance.style.display = "none";
            allData.style.display = "none";
            setShow(true);  
        }
    });
  }


  return (
  <>
    <div style={{position: "fixed", top: "0px", right: "10%", color: "white" }}>{ctx.user}</div>
    <Card
      bgcolor="dark"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setStatus={setStatus} handleLoginStatus={handleLoginStatus}/> :
        <LoginMsg setStatus={setStatus} handleLoginStatus={handleLoginStatus}/>}
    />
  </>
  ) 

}

function LoginMsg(props){

// logout

function handleLogOut(){
firebase.auth().signOut();
// if logout, then change to login form 
  props.handleLoginStatus();
}   

return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={handleLogOut}>
        Logout
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const emailAuth ='';
     // login
    function handleLogin(){
       
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email,password);
        promise.catch((e) => {
            console.log(e.message);
            props.setStatus(e.message);
        });       
        props.handleLoginStatus();
    }

    function handleGoogleLogin(){
      console.log('google login pressed...  ');
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
    
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        emailAuth = result.user.email;
        // IdP data available in result.additionalUserInfo.profile.
          // ...
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
     };
    
     props.handleLoginStatus(); 
    

  return (<>

    Email<br/>
    <input type="input" 
      id="email"
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      id="password"
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" 
      id="login"
      className="btn btn-light" 
      padding="10px"
      onClick={handleLogin}>Login</button> <br/><br/>

    <button type="submit" 
      id="Googlelogin"
      className="btn btn-light" 
      padding="10px"
      onClick={handleGoogleLogin}><img src="./google.png" height="20px" margin-right="20px"/>  Google login</button>
   
  </>);


}