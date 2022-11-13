import { MantineProvider, Text, Button, Stack, AppShell, Header } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { useState } from "react";
import { useUser } from "./hooks/user";

export default function App() {
  const name = useUser(store => store.userName);
  const [data, setData] = useState([
    {name: "Andrew Huang", desc: "food", start: "simmon", end: "nv", start_task: "be good", end_task: "random", start_loc: {lat: 0, lng: 0}, end_loc: {lat: 0, lng: 0}, claimedby: "bleh", id: "2", status : "unclaimed"},
    {name: "Daniel Hong", desc: "snak", start: "nv", end: "new", start_task: "be good", end_task: "random", start_loc: {lat: 0, lng: 0}, end_loc: {lat: 0, lng: 0}, claimedby: "bleh", id: "3", status : "claimed"},
    {name: "Andrew Huang", desc: "asdf", start: "bofdsafds", end: "asdfpa", start_task: "be good", end_task: "random", start_loc: {lat: 0, lng: 0}, end_loc: {lat: 0, lng: 0}, claimedby: "bleh", id: "4", status : "unclaimed"},
  ]);
  return (
    <MantineProvider theme = {{colorScheme: "light"}} withGlobalStyles withNormalizeCSS>
    <Router>
      <Routes>
        <Route path="home" element={<Home/>} />
        <Route path="dashboard" element={<Dashboard links = {[{link: "tasks", label: "Tasks", links: []}, {link: "newtask", label: "Create Task", links: []}, {link: "route", label: "Route", links: []}, {link: "mytasks", label: "My Tasks", links: []}, {link: "username", label: name, links: [{link: "home", label: "Logout"}]}]} data = {data} setData = {setData}/>} />
      </Routes>
    </Router>
    </MantineProvider>
  );
}
