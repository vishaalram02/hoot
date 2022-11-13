import { MantineProvider, Text, Button, Stack, AppShell, Header } from "@mantine/core";
import { theme } from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { useState } from "react";
import { Dashboard } from "./pages/Dashboard";
import { useUser } from "./hooks/user";

export default function App() {
  const name = useUser(store => store.userName);
  const [data, setData] = useState([
    {name: "Andrew Huang", desc: "food", start: "simmon", end: "nv", start_task: "be good", end_task: "random", claimedby: "bleh", id: "2", status : "unclaimed"},
    {name: "Daniel Hong", desc: "snak", start: "nv", end: "new", start_task: "be good", end_task: "random", claimedby: "bleh", id: "3", status : "claimed"},
    {name: "Andrew Huang", desc: "asdf", start: "bofdsafds", end: "asdfpa", start_task: "be good", end_task: "random", claimedby: "bleh", id: "4", status : "unclaimed"},
  ]);
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
    <Router>
      <Routes>
        <Route path="home" element={<Home/>} />
        <Route path="dashboard" element={<Dashboard data = {data} setData = {setData}/>} />
      </Routes>
    </Router>
    </MantineProvider>
  );
}
