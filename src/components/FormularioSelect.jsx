import { Form, Row, Container, Col, Spinner } from "react-bootstrap";
import ListaNoticias from "./ListaNoticias";
import { useState, useEffect } from "react";

const FormularioSelect = () => {
  const [noticias, setNoticias] = useState([]);
  const [mostrarSpinner, setMostrarSpinner] = useState(false);
  const [categoriaNoticia, setCategoriaNoticia] = useState("");
  const [pais, setPais] = useState("");

  useEffect(() => {
    const consultarAPI = async () => {
      try {
        setMostrarSpinner(true);
        const respuesta = await fetch(
          `https://newsdata.io/api/1/news?apikey=pub_3807498803e69990129702f9a0ac871683615&language=es&category=${categoriaNoticia}&country=${pais}`
        );
        const datos = await respuesta.json();
        setNoticias(datos.results);
        setMostrarSpinner(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (
      categoriaNoticia &&
      categoriaNoticia !== "Opciones" &&
      pais &&
      pais !== "País"
    ) {
      consultarAPI();
    } else {
      setNoticias([]);
    }
  }, [categoriaNoticia, pais]);

  const handleChangeCategoria = (e) => {
    const { value } = e.target;
    setCategoriaNoticia(value);
  };

  const handleChangePais = (e) => {
    const { value } = e.target;
    setPais(value);
  };

  const mostrarComponente = mostrarSpinner ? (
    <div className="my-5">
      <Spinner animation="border" variant="danger" />
    </div>
  ) : (
    categoriaNoticia && pais && <ListaNoticias noticias={noticias} />
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
                  onChange={handleChangeCategoria}
                  value={categoriaNoticia}
                >
                  <option>Opciones</option>
                  <option value="Sports">Deportes</option>
                  <option value="Technology">Tecnología</option>
                  <option value="Politics">Política</option>
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Buscar por país:</Form.Label>
              </Col>
              <Col>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleChangePais}
                  value={pais}
                >
                  <option>País</option>
                  <option value="ar">Argentina</option>
                  <option value="mx">México</option>
                  <option value="es">España</option>
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
