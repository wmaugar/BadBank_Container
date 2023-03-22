function CreateAccount() {
    const { useState } = React;
    const [show, setShow] = useState('true');
    const [status, setStatus] = useState('');

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
    
    return (
        <Card
          bgcolor="primary"
          header="Create Account"
          status={status}
          body={show ? 
            <CreateForm setShow={setShow} setStatus={setStatus}/> : 
           <CreateMsg setShow={setShow} setStatus={setStatus}/>}
        />
    )
}

function CreateMsg(props){
    return(<>
        <h5>Success</h5>
            <button type="submit" 
            className="btn btn-primary" 
            onClick={() => props.setShow(true)}>Add another account</button>
    </>);    
}

function CreateForm(props){
    const { useState } = React;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
        
        function validate(field, label){
            if(!field) {
                props.setStatus('Error there is no: ' + label);
                setTimeout(()=> props.setStatus(''), 3000);
                return false;
            }
            return true;
        }
        function validateEmail (email){
            if(String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              )){ return true;
            } else {
                props.setStatus('Invalid mail address...');
                setTimeout(()=> props.setStatus(''), 3000);
                return false;                
            } 
            
        }
            
        function handle(){
            console.log(name, email, password);
            if(!validate(name, 'name'))         return;
            if(!validate(password, 'password')) return;
            if(!validateEmail(email))       return;

            const url = `/account/create/${name}/${email}/${password}`;
            (async () => {
                var res = await fetch(url);
                var data = await res.json();
                console.log(data);
            })(); 

                // signup on firebase
             
            console.log(email);
            console.log(password);
            const auth = firebase.auth();
            const promise = auth.createUserWithEmailAndPassword(email, password);
            promise.catch((e) => {
            console.log(e.message);
                   // props.setStatus(e.message);
                })
            // if login is correct, then change to success login message
            firebase.auth().signOut();             
            
            props.setShow(false);
        }
    
    return(
        <>
            Name<br />
            <input type="input" 
                className="form-control" id="name"
                placeholder="Enter name" 
                value={name} 
                onChange={(e) => setName(e.currentTarget.value)} /><br />

            Email address<br />
            <input type="input" 
                className="form-control" id="email" placeholder="Enter email" 
                value={email} 
                onChange={(e) => setEmail(e.currentTarget.value)} /><br />

            Password<br />
            <input type="password" 
                className="form-control" id="password" placeholder="Enter password" 
                value={password} 
                onChange={(e) => setPassword(e.currentTarget.value)} /><br />

            <button type="submit" 
                className="btn btn-light" 
                onClick={handle}>Create Account</button>
        </>
    )

}

     
            
                