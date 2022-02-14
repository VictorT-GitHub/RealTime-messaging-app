import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomeAuthPage from "../pages/HomeAuthPage";
import UsersPage from "../pages/UsersPage";
import ConvsPage from "../pages/ConvsPage";
import ProfilPage from "../pages/ProfilPage";

const Router = ({ pusherData }) => {
  // -- JSX --
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<HomeAuthPage />} />

          <Route
            path="/all-users"
            exact
            element={<UsersPage pusherData={pusherData} />}
          />

          <Route
            path="/myconversations"
            exact
            element={<ConvsPage pusherData={pusherData} />}
          />

          <Route path="/myprofil" exact element={<ProfilPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
