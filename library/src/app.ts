import express from "express";
import {json} from "body-parser";

import { indexBookRouter } from "./routes/index"; 
import { createBookRouter } from "./routes/new";
import { showBookRouter } from "./routes/show"; 
import { updateBookRouter } from "./routes/update";
import { deleteBookRouter } from "./routes/delete";

const app = express();

app.use(json());

//TODO: Rutas para API (index.ts, show.ts, update.ts, delete.ts)

app.use(indexBookRouter); //mostrar todos
app.use(showBookRouter); //mostrar un libro a partir del id
app.use(updateBookRouter); //modificar un libro
app.use(createBookRouter); //crear un libro
app.use(deleteBookRouter); //borrar un libro

export { app };