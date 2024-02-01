// pages/books/new.tsx
import { useForm } from "react-hook-form";
import axios from "axios";

//data del libro
type FormData = {
  _id: string;
  title: string;
  author: string;
  description: string;
  year: number;
  ISBN: string;
  hardcover: boolean;
  countryOrigin: string;
  cost: number;
  autographed: boolean;
  category:string
};


type NewBookPageProps = {
  book?: FormData;
};


export default function NewBookPage({book} : NewBookPageProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: book
  });

  const onSubmit = async (data: FormData) => {
    try {
      //si el libro tiene data, hay que crear actualizar un libro con put
      if (book) {
        await axios.put(`/api/library/${book._id}`, data);
      //si no tiene data es un libro nuevo y hay que crearlo con post
      } else {
        await axios.post("/api/library", data);
      }

      //una vez ejecutado regresamos a la pantalla principal
      window.location.href = '/';
    } catch (error) {
      console.log(error)
    }
  };

  //formulario del libro
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-4">
          <h2>{book ? "Modify Book" : "Add New Book"} </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                {...register('title', { required: true })}
              />
              {errors.title && <div className="invalid-feedback">This field is required</div>}
            </div>
            <div className="form-group mt-2">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                className={`form-control ${errors.author ? 'is-invalid' : ''}`}
                {...register('author', { required: true })}
              />
              {errors.author && <div className="invalid-feedback">This field is required</div>}
            </div>
            <div className="form-group mt-2">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                {...register('description', { required: true })}
              />
              {errors.description && <div className="invalid-feedback">This field is required</div>}
            </div>
            <div className="form-group mt-2">
              <label htmlFor="year">Year</label>
              <input
                type="number"
                id="year"
                className={`form-control ${errors.year ? 'is-invalid' : ''}`}
                {...register('year', { required: true })}
              />
              {errors.year && <div className="invalid-feedback">This field is required</div>}
            </div>
            <div className="form-group mt-2">
              <label htmlFor="ISBN">ISBN</label>
              <input
                type="text"
                id="ISBN"
                className={`form-control ${errors.ISBN ? 'is-invalid' : ''}`}
                {...register('ISBN', { required: true })}
              />
              {errors.ISBN && <div className="invalid-feedback">This field is required</div>}
            </div>
            <div className="form-group form-check mt-3">
              <input
                type="checkbox"
                id="hardcover"
                className={`form-check-input ${errors.hardcover ? 'is-invalid' : ''}`}
                {...register('hardcover')}
              />
              <label className="form-check-label" htmlFor="hardcover">Hardcover</label>
            </div>
            <div className="form-group mt-2">
              <label htmlFor="countryOrigin">Country of Origin</label>
              <input
                type="text"
                id="countryOrigin"
                className={`form-control ${errors.countryOrigin ? 'is-invalid' : ''}`}
                {...register('countryOrigin', { required: true })}
              />
              {errors.countryOrigin && <div className="invalid-feedback">This field is required</div>}
            </div>
            <div className="form-group mt-2">
              <label htmlFor="cost">Cost</label>
              <input
                type="number"
                id="cost"
                className={`form-control ${errors.cost ? 'is-invalid' : ''}`}
                {...register('cost', { required: true })}
              />
              {errors.cost && <div className="invalid-feedback">This field is required</div>}
            </div>
            <div className="form-group form-check mt-2">
              <input
                type="checkbox"
                id="autographed"
                className={`form-check-input ${errors.autographed ? 'is-invalid' : ''}`}
                {...register('autographed')}
              />
              <label className="form-check-label" htmlFor="autographed">Autographed</label>
            </div>
            <div className="form-group mt-2">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                {...register('category', { required: true })}
              />
              {errors.category && <div className="invalid-feedback">This field is required</div>}
            </div>
            <button type="submit" className="btn btn-primary mt-3 fs-4">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

