function Navbar(){
    const { useState } = React;
    const [show, setShow] = useState(false); 
    const ctx = React.useContext(UserContext);
    const user = ctx.user;

        function handle(){
                setShow(!show);
                console.log(show);
        }
            
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li  className="nav-item">
                            <a className="nav-link" aria-current="page" href="#/">BadBank</a>
                        </li>

                        {show ? <li className="nav-item">
                            <a className="nav-link" href="#/createAccount/">Create Account</a>
                        </li> : <></>}

                        <li className="nav-item">
                            <a className="nav-link" href="#/login/">Login</a>
                        </li>

                        {show ? <li className="nav-item">
                            <a className="nav-link" href="#/deposit/">Deposit</a>
                        </li>: <></>}

                        {show ? <li className="nav-item">
                            <a className="nav-link" href="#/withdraw/">Withdraw</a>
                        </li>: <></>}

                        {show ? <li className="nav-item">
                            <a className="nav-link" href="#/balance/">Balance</a>
                        </li> : <></>}

                        {show ? <li className="nav-item">
                            <a className="nav-link" href="#/alldata/">AllData</a>
                        </li> : <></>}
                    </ul>
                </div>
         
            </div>
            
                     <div className="nav-item" style={{color: "white", padding: "15px"}} > 
                            {show ? 
                            <>
                            <> Logged as: {user} </> <br/> <button onClick={handle}> log out</button> </>
                                  : 
                            <button onClick={handle}>Please login</button>} 
                    </div>    
            </nav>
            
        </div>
    )
};
