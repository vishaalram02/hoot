import { MantineProvider, Text, Button, Stack, AppShell, Header } from "@mantine/core";
import { theme } from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Tasks } from "./pages/Tasks";
import { NewTask } from "./pages/NewTask";
import { RouteInfo } from "./pages/RouteInfo";

export default function App() {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Stack align="center" mt={50}>
        <AppShell>

        </AppShell>
      </Stack>
    <Router>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="dashboard" element={<Tasks />} />
        <Route path="newtask" element={<NewTask />} />
        <Route path="route" element={<RouteInfo />} />
      </Routes>
    </Router>
    </MantineProvider>
  );
}
