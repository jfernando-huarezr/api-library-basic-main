"use client"
import { useEffect, useState} from "react";
import axios from 'axios';
import NewBookPage from "./new";

export default function Page({ params }: {params: {slug: string}}) {

    const [currentBook, setCurrentBook] = useState<any>(null);
    //de los botones del crud, el boton de editar termina en edit. Verificamos si se ha presionado ese boton con esta variable
    const isEditMode = params.slug.endsWith('edit');
    //tambien dependiendo si se quiere saber el detalle o editar se verifica el params.slug para obtener el bookID
    const bookId = isEditMode ? params.slug.slice(0, -5) : params.slug;
  

    const fetchData = async () => {
        //Si no queremos cargar la pagina de un nuevo libro, necesitamos obtener la data del libro que queremos ver el detalle o editar
        if (bookId !== "new") {
            const responseBook = await axios.get(`/api/library/${bookId}`).then((response) => response.data);
            setCurrentBook(responseBook);
            console.log(responseBook)
        }
    }

    useEffect(() => {
          fetchData();
      }, []);

      //si es un nuevo libro, solo cargamos la pagina del formulario
      if(params.slug === "new") {
        return <NewBookPage/>
      }
      
      //si hay que editar un libro, se debe cargar la pagina del formulario (new.tsx) pero enviando la data del libro a editar
      //antes de eso tenemos que estar seguros de que ha cargado la data en currentBook, si no se queda en Loading... antes de pasar a new.tsx
      if (isEditMode) {    
        return currentBook ? <NewBookPage book = {currentBook} /> : <div>Loading...</div>;
      }

    //si no es ni editar un libro o un libro nuevo, seria la opcion de mostrar el detalle del libro
    return currentBook ? (
        <div className="container">
            <h2>Book details: </h2>
            <div className="row mt-4">
                <div className="col-12">
                    <p>BookId: {currentBook._id}</p>
                    <p>Title: {currentBook.title}</p>
                    <p>Author: {currentBook.author}</p>
                    <p>Description: {currentBook.description}</p>
                    <p>Year: {currentBook.year}</p>
                    <p>ISBN: {currentBook.ISBN}</p>
                    <p>Hardcover: {currentBook.hardcover ? "Yes" : "No"}</p>
                    <p>Autographed: {currentBook.autographed ? "Yes" : "No"}</p>
                    <p>Category: {currentBook.category}</p>
                    <p>Cost: ${currentBook.cost}</p>
                    <p>Country of origin: {currentBook.countryOrigin}</p>
                </div>
            </div>
            <button className="btn btn-primary fs-4 mt-3" onClick={ () => window.location.href='http://isil.dev'}>Return</button>
        </div>
    ) : (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h5>Loading...</h5>
                </div>
            </div>
        </div>
    );
}