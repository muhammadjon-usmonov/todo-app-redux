import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { jobs } from "./reducers/jobs";
import { levels } from "./reducers/levels";
import { workers } from "./reducers/workers";

const rootReducers = combineReducers({
  jobs: jobs,
  levels: levels,
  workers: workers,
});

export const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
