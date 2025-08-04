function AllData() {
  const [data, setData] = React.useState("");

  React.useEffect(() => {
    //fetch all accounts from API
    fetch("/account/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(JSON.stringify(data));
      });
  }, []);

  function classes() {
    const bg = "bg-success";
    const txt = " text-black";
    return "card mb-3" + bg + txt;
  }

  return (
    <div
      className={classes()}
      style={{
        width: "70%",
        padding: "0% 15% 20% 15%",
        margin: "auto",
        display: "flex",
        textAlign: "center",
        opacity: 0.8,
      }}
    >
      <div className="card-header">All Data in store:</div>
      <div className="card-body">
        <div> {data} </div>
      </div>
    </div>
  );
}
