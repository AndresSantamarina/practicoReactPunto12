import { Form, Row, Container, Col, Spinner } from "react-bootstrap";
import ListaNoticias from "./ListaNoticias";
import { useState, useEffect } from "react";

const FormularioSelect = () => {
  const [noticias, setNoticias] = useState([]);
  const [mostrarSpinner, setMostrarSpinner] = useState(false);
  const [categoriaNoticia, setCategoriaNoticia] = useState("");

  useEffect(() => {
    const consultarAPI = async () => {
      try {
        setMostrarSpinner(true);
        const respuesta = await fetch(
          `https://newsdata.io/api/1/news?apikey=pub_3807498803e69990129702f9a0ac871683615&language=es&category=${categoriaNoticia}`
        );
        const datos = await respuesta.json();
        setNoticias(datos.results);
        setMostrarSpinner(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (categoriaNoticia && categoriaNoticia !== "Opciones") {
      consultarAPI();
    }
  }, [categoriaNoticia]);

  const handleChange = (e) => {
    const { value } = e.target;
    setCategoriaNoticia(value);
  };

  const mostrarComponente = mostrarSpinner ? (
    <div className="my-5">
      <Spinner animation="border" variant="danger" />
    </div>
  ) : (
    categoriaNoticia && <ListaNoticias noticias={noticias} />
  );

  return (
    <article>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Container>
            <Row>
              <Col>
                <Form.Label>Buscar por categoría:</Form.Label>
              </Col>
              <Col>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleChange}
                  value={categoriaNoticia}
                >
                  <option>Opciones</option>
                  <option value="Sports">Deportes</option>
                  <option value="Technology">Tecnología</option>
                  <option value="Politics">Política</option>
                </Form.Select>
              </Col>
            </Row>
          </Container>
        </Form.Group>
      </Form>
      {mostrarComponente}
    </article>
  );
};

export default FormularioSelect;
