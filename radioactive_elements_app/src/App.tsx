import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { ROUTES } from "./Routes";
import {FC} from 'react'
import MainPage from "./pages/main/Main";
import ElementsPage from "./pages/Elements/Elements";
import ElementPage from "./pages/Element/Element";
import LoginPage from "./pages/Login/Login";
import RegistrationPage from "./pages/Registration/Registration";
import AccountPage from "./pages/Account/Account";
import DecayPage from "./pages/Decay/Decay";
import DecaysPage from "./pages/Decays/Decays"
import ElementsTablePage from "./pages/ElementsTable/ElementsTable";
import AddEditElementPage from "./pages/AddEditElement/AddEditElement";
import NavigationBar from "./components/NavigationBar/NavigationBar"
import ForbiddenPage from "./pages/Forbidden/Forbidden";
import NotFoundPage from "./pages/NotFound/NotFound";
import "./App.css"
import { setupInterceptors } from "./api";

const App: FC = () => {
  const navigate = useNavigate()
  setupInterceptors(navigate)

  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path={ROUTES.MAIN} index element={<MainPage />} />
        <Route path={ROUTES.ELEMENTS} index element={<ElementsPage />} />
        <Route path={`${ROUTES.ELEMENTS}/:elementId`} element={<ElementPage />} />
        <Route path={ROUTES.LOGIN} index element={<LoginPage />} />
        <Route path={ROUTES.REGISTRATION} index element={<RegistrationPage />} />
        <Route path={ROUTES.ACCOUNT} index element={<AccountPage />} />
        <Route path={ROUTES.DECAYS} index element={<DecaysPage/>}/>
        <Route path={`${ROUTES.DECAYS}/:decayId`} index element={<DecayPage />} />
        <Route path={ROUTES.ELEMENTS_TABLE} index element={<ElementsTablePage />} />
        <Route path={`${ROUTES.ADDEDITELEMENT}/:elementId?`} index element={<AddEditElementPage />} />
        <Route path={ROUTES.FORBIDDEN} index element={<ForbiddenPage />} />
        <Route path='*' index element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App
