import { HelloUseCase } from "./hello.usecase";
import { updateRequestContext, getRequestContext } from "./context";
import express, { Request, Response } from "express";

const app = express();
const port = 3000;

const useCase = new HelloUseCase();

app.use((request, response, next) => {
  const journeyId = request.headers["x-journey-id"];
  if (journeyId) {
    updateRequestContext({ journeyId });
  }
  next();
});

const requestHandler = (
  request: Request,
  response: Response,
  next: () => void
) => {
  useCase.execute("world");
  response.json(getRequestContext());
  next();
};

app.get("/", requestHandler);

app.listen(port, (err?: Error) => {
  if (err) {
    return console.error(err);
  }
  console.log(`server is listening on ${port}`);
});
