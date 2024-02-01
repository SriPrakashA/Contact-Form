import { Link } from 'react-router-dom';
import './styles/Styles.css'

function Navbar() {
    return (<>
        <div className="navbar navbar-expand-sm header ">
            <div className="container-fluid">
                <h2>Contact Form</h2>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <i class="fa-solid fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <h3>
                        <Link to={"/"}>Home</Link>
                    </h3>
                </div>
            </div>
        </div>
    </>)
}

export default Navbar;