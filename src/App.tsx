import { MantineProvider, Text, Button, Stack, AppShell, Header } from "@mantine/core";
import { theme } from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { useState } from "react";
import { Dashboard } from "./pages/Dashboard";
import { useUser } from "./hooks/user";

export default function App() {
  const name = useUser(store => store.userName);
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
    <Router>
      <Routes>
        <Route path="home" element={<Home/>} />
        <Route path="dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
    </MantineProvider>
  );
}
