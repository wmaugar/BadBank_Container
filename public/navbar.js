function Navbar(){
    const ctx = React.useContext(UserContext);
    
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
                        <li className="nav-item" id="create-account-nav" style={{display:"inline"}} >
                                <a className="nav-link" href="#/createAccount/">Create Account</a>
                        </li>

                        <li className="nav-item" id="login-nav" style={{display:"inline"}}>
                            <a className="nav-link" href="#/login/">Login</a>
                        </li>

                        <li className="nav-item" id="deposit-nav" style={{display:"none"}}>
                            <a className="nav-link" href="#/deposit/">Deposit</a>
                        </li>

                        <li className="nav-item" id="withdraw-nav" style={{display:"none"}}> 
                            <a className="nav-link" href="#/withdraw/">Withdraw</a>
                        </li>

                        <li className="nav-item" id="balance-nav" style={{display:"none"}}>
                            <a className="nav-link" href="#/balance/">Balance</a>
                        </li> 

                        <li className="nav-item" id="alldata-nav" style={{display:"none"}}>
                            <a className="nav-link" href="#/alldata/">AllData</a>
                        </li>
                    </ul>
                </div>
         
                </div>
                
                <div id="login-status" style = {{color: "white", padding:"15px"}}>{ctx.user}</div>      
            </nav>
            
        </div>)
};
    