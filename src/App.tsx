import { MantineProvider, Text, Button, Stack, AppShell, Header } from "@mantine/core";
import { theme } from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Tasks } from "./pages/Tasks";

export default function App() {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
    <Router>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="tasks" element={<Tasks />} />
      </Routes>
    </Router>
    </MantineProvider>
  );
}
