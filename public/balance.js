function Balance (){

    const { useState } = React;
    const [status, setStatus] = useState('');
    const [balance, setBalance] = React.useState('');
    const [name, setName] = React.useState('');
    const ctx = React.useContext(UserContext);
    const email =ctx.user;
    
    React.useEffect(() => {
        //fetch all accounts from API
        const url = `/findOne/${email}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setBalance(data[0].balance);
                setName(data[0].name);
            });
    }, []);
 
    return (
        <>
        <div style={{position: "fixed", top: "0px", right: "10%", color: "white" }}>{ctx.user}</div>
        <Card
            bgcolor="danger"
            header="Balance"
            status={status}
            body={
                <>
                    Balance<br />
                    User name:  <strong>{JSON.stringify(name)}</strong><br /><br />
                    <div>Balance       {JSON.stringify(balance)}</div><br/>                   
                </>
                }
        />
        </>
    )
}