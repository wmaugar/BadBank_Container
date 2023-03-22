function Withdraw (){

    const { useState } = React;
    const [status, setStatus] = useState('');
    const [withdraw, setWithdraw] = useState('');
    const [balance, setBalance] = useState('');
    const ctx = React.useContext(UserContext);
    const email =ctx.user;
    
    React.useEffect(()=>updateBalance(), []);

    function updateBalance(){
        //fetch all accounts from API
        const url = `/findOne/${email}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setBalance(data[0].balance);                
            });
    }

    function validate(){
        console.log('validate withdraw....')
        console.log('intenta retirar: ' + withdraw)
        // aqui falaria la validación de que sea un número
        if(!withdraw) {
            setStatus('Error: invalid deposit');
            setTimeout(()=> setStatus(''), 3000);
            return false
        }        
        else if(withdraw<0){
            setStatus('Error: invalid deposit');
            setTimeout(()=> setStatus(''), 3000);
            return false
        }
        else if(withdraw>balance){
            setStatus(`Error: Dont't have enough funds`);
            setTimeout(()=> setStatus(''), 3000);
            return false
        }
        else return true;
    }
  

    
    function handleWithdraw(){
        console.log('submit pressed');
        if(!validate()) return;
        console.log('valid withdraw');
        // leer directamente el valor contenido en la variable de estado balance
        const url = `/update/${email}/${-withdraw}`;
        (async () => {
            var res = await fetch(url);
            var data = await res.json();
            console.log(data);
        })();       
        // let newBalance = Number(balance) - Number(withdraw);
        // ctx.users[0].balance = newBalance;

        setStatus('Succesful withdraw');
        setTimeout(()=> setStatus(''), 1000);
        updateBalance();
    }
    
    return (
        <>
        <div style={{position: "fixed", top: "0px", right: "10%", color: "white" }}>{ctx.user}</div>
        <Card
            bgcolor="info"
            header="Withdraw"
            status={status}
            body={
                <>
                    Withdraw<br />
                    <div>Balance       {balance}</div><br/>
                    Withdraw Amount
                    <input type="number"  className="form-control" id="withdraw"
                        placeholder="Withdraw Amount" value={withdraw} onChange={(e) => setWithdraw(e.currentTarget.value)} /><br />
                    <button type="submit" className="btn btn-light" onClick={handleWithdraw}>Withdraw</button>
                </>
                }
        />
        </>
    )
}
