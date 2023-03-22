function AllData (){
   const [data, setData] = React.useState('');

    React.useEffect(() => {
        //fetch all accounts from API
        fetch('/account/all')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(JSON.stringify(data));
            });
    }, []);

    return (
    <div style = {{heigth: "100%", width: '100%', padding: "10%", margin:"auto", backgroundColor: "gray", opacity: "0.8", color: "blue"}}>
        <h5>All Data in store:</h5>
        <div> {data} </div>
              
    </div>);
}

 