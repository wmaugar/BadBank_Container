function Deposit (){

    const { useState } = React;
    const [status, setStatus] = useState('');
    const [deposit, setDeposit] = useState('');
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
        console.log('validate called')
        // aqui falaria la validación de que sea un número
        if(!deposit) {
            setStatus('Error: invalid deposit');
            setTimeout(()=> setStatus(''), 3000);
            return false
        }
        
        else if(deposit<0){
            setStatus('Error: invalid deposit');
            setTimeout(()=> setStatus(''), 3000);
            return false
        }
        else return true;
    }
    
    
    function handle(){
        console.log('submit pressed')
        if(!validate()) return;

        // let balance = (ctx.users[0].balance);                 
        // let newBalance = Number(balance) + Number(deposit);
        // ctx.users[0].balance = newBalance;
        // setBalance(newBalance);

        const url = `/update/${email}/${deposit}`;
        (async () => {
            var res = await fetch(url);
            var data = await res.json();
            console.log(data);
        })(); 

        setStatus('Succesful deposit');
        setTimeout(()=> setStatus(''), 1000);
        updateBalance();
       }
    
    return (
        <Card
            bgcolor="success"
            header="Deposit"
            status={status}
            body={
                <>
                    Deposit<br />
                    <div>Balance       {balance}</div><br/>
                    Deposit Amount
                    <input type="number" className="form-control" id="deposit"
                        placeholder="Deposit Amount" value={deposit} onChange={(e) => setDeposit(e.currentTarget.value)} /><br />
                    <button type="submit" className="btn btn-light" onClick={handle}>Deposit</button>
                </>
                }
        />
    )
}
