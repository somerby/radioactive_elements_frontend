import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./Routes";
import { FC, useEffect } from 'react'
import MainPage from "./pages/main/Main";
import ElementsPage from "./pages/Elements/Elements";
import ElementPage from "./pages/Element/Element";
import NavigationBar from "./components/NavigationBar/NavigationBar"
import "./App.css"
import { invoke } from '@tauri-apps/api/core';

const App: FC = () => {
  useEffect(() => {
      invoke('tauri', {cmd: 'create'})
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error))
  
      return () => {
        invoke('tauri', {cmd: 'close'})
        .then((response: any) => console.log(response))
        .catch((error: any) => console.log(error))
      }
  }, [])

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
