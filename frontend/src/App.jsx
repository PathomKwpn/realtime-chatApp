import React from "react";
import { Button } from "@/components/ui/button";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Chat from "./pages/chat";
import Auth from "./pages/auth";
import Profile from "./pages/profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" elemet={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
