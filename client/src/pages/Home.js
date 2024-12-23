import "./Home.css"
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";


function Home(){ 


    return (
        <div>

        <Navbar/>
            <div className="Home">
                <h1>Welcome to the wildfire detection application</h1>
            </div>
        </div>
    
    );
}

export default Home;