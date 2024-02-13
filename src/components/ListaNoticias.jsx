import Noticia from "./Noticia";

const ListaNoticias = ({ noticias }) => {
  return (
    <article className="d-flex flex-wrap justify-content-between">
      {noticias.map((noticia) => (
        <Noticia key={noticia.article_id} noticia={noticia} />
      ))}
    </article>
  );
};

export default ListaNoticias;
