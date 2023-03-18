function Login () {
    const { useState } = React;
    const [login, setLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const ctx = React.useContext(UserContext);
    let activeUser = ctx.user;
    
   
// the UI will have 2 states:
// login interface
// already logged interfacer, where you could log off.
// console.log('active user:' + ctx.user) ;


    function handleLogin (){
        let toValidate = ctx.user;
        // validate user
        toValidate.forEach((user) => {
            console.log(user.email + ' vs ' + email);
            if(user.email === email && user.password === password) {
                console.log('active user:' + user.name);
                ctx.activeUser = user.name; 
                                           
                setLogin(false);
            }
            else { 
            console.log('invalid')    
            setStatus('invalid username or password');
            setTimeout(()=> setStatus(''), 3000);
            }
        })
        
    }

      function handleLogout(){
        ctx.activeUser = 'any';
        setLogin(true);
    }

    return(
        <Card
            bgcolor="warning"
            txtcolor="black"
            header="Login"
            status={status}  
            body={login ? (
            <>
                Email <br />
                <input type="input" className="form-control" id="email"
                    placeholder="Enter email" value={email} 
                    onChange={(e) => setEmail(e.currentTarget.value)} /><br />
                Password<br />
                <input type="input" className="form-control" id="password"
                    placeholder="Enter password" value={password} 
                    onChange={(e) => setPassword(e.currentTarget.value)} /><br />
                <button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button>
            </>
            ) : (
            <>
                    <h5>logged as <br/>
                        {email}
                    </h5>
                    <button type="submit" className="btn btn-primary" onClick={handleLogout}>Log Out</button>
            </>
            )}
                    
        />
    );
}    
// Check password, if match, enable login
// verify if email exist, lo let user to login
// if loggin is ok, then set user to update financial information.