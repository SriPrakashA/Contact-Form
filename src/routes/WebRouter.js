import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ContactList from '../components/ContactList';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AddContact from '../components/AddContact';

function WebRouter() {
    return(<>
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path='/' element={<ContactList />} />
            <Route path='/addcontact' element={<AddContact />} />
        </Routes>
        <Footer />
    </BrowserRouter>
    </>)
}

export default WebRouter;