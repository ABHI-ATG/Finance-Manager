import "./css/App.css";
import { BrowserRouter } from "react-router-dom";
import FinanceManagement from "./components/FinanceManagement";
import { Provider } from "react-redux";
import store,{persistor} from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <FinanceManagement />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
