import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Titulo from "./components/Titulo";
import FormularioSelect from "./components/FormularioSelect";

function App() {
  return (
    <>
      <Container className="text-center mainPage">
        <Titulo />
        <FormularioSelect />
      </Container>
    </>
  );
}

export default App;