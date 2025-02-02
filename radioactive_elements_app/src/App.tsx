import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./Routes";
import {FC} from 'react'
import MainPage from "./pages/main/Main";
import ElementsPage from "./pages/Elements/Elements";
import ElementPage from "./pages/Element/Element";
import NavigationBar from "./components/NavigationBar/NavigationBar"
import "./App.css"

const App: FC = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path={ROUTES.MAIN} index element={<MainPage />} />
        <Route path={ROUTES.ELEMENTS} index element={<ElementsPage />} />
        <Route path={`${ROUTES.ELEMENTS}/:elementId`} element={<ElementPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
