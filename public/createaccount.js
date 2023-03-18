function CreateAccount() {
    const { useState } = React;
    const [show, setShow] = useState('true');
    const [status, setStatus] = useState('');
    
    return (
        <Card
          bgcolor="primary"
          header="Create Account"
          status={status}
          body={show ? 
            <CreateForm setShow={setShow}/> : 
           <CreateMsg setShow={setShow}/>}
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
                props.setStatus('Error: ' + label);
                setTimeout(()=> props.setStatus(''), 3000);
                return false;
            }
            return true;
        }

        function handle(){
            console.log(name, email, password);
            if(!validate(name, 'name'))         return;
            if(!validate(email, 'email'))       return;
            if(!validate(password, 'password')) return;
            //ctx.users.push({name, email, password, balance: 100});
            const url = `/account/create/${name}/${email}/${password}`;
            (async () => {
                var res = await fetch(url);
                var data = await res.json();
                console.log(data);
            })(); 
            props.setShow(false);
        }
    
    // function clearForm(){
    //     setName('');
    //     setEmail('');
    //     setPassword('');
    //     props.setShow(true);
    // }

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
            <input type="input" 
                className="form-control" id="password" placeholder="Enter password" 
                value={password} 
                onChange={(e) => setPassword(e.currentTarget.value)} /><br />

            <button type="submit" 
                className="btn btn-light" 
                onClick={handle}>Create Account</button>
        </>
    )

}

     
            
                