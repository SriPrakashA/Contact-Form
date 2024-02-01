import ContactList from "./components/ContactList";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Supplier } from "./context/Context";
import WebRouter from "./routes/WebRouter";

function App() {
  return (
    <div>
      <Supplier >
      <WebRouter />
      </Supplier>
    </div>
  );
}

export default App;
