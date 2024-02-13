import { Card, Button } from "react-bootstrap";

const Noticia = ({ noticia }) => {
  const maxLength = 150;

  const truncarDescripcion = (texto) => {
    if (!texto || typeof texto !== "string") {
      return "";
    }

    return texto.length > maxLength
      ? texto.substring(0, maxLength) + "..."
      : texto;
  };
  return (
    <div>
      <Card className="m-3 cardNoticia">
        <Card.Img
          variant="top"
          src={noticia.image_url}
          alt="imagen de la noticia"
          className="img-fluid"
        />
        <Card.Body>
          <Card.Title>{noticia.title}</Card.Title>
          <Card.Text>{truncarDescripcion(noticia.description)}</Card.Text>
          <Button variant="primary" href={noticia.link} target="_blank">
            Leer más
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Noticia;
