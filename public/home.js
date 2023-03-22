function Home (){
    return (
        <Card
            bgcolor  = "primary" 
            txtcolor = "white"
            header   = "BadBank Full Stack MERN Final Submission"
            title    = "Welcome to MIT Bank"
            text     = "As safe as the Bank of England"
            body     = {<img src="bank.png" className="img-fluid" alt="Responsive image"/>}
        /> 
    );
}

