import { MantineProvider, Text, Button, Stack, AppShell, Header } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from "react-router-dom";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { useState } from "react";
import { useUser } from "./hooks/user";

export default function App() {
  const name = useUser(store => store.userName);
  const [data, setData] = useState([
    {name: "Andrew Huang", desc: "food", start: "Simmons Hall", end: "New Vassar", start_task: "be good", end_task: "random", start_loc: {lat: 42.3573, lng: -71.1009}, end_loc: {lat: 42.3590, lng: -71.0976}, claimedby: "bleh", id: "2", status : "unclaimed"},
    {name: "Daniel Hong", desc: "snak", start: "New Vassar", end: "New House", start_task: "be good", end_task: "random", start_loc: {lat: 42.3590, lng: -71.0976}, end_loc: {lat: 42.3551, lng: -71.1006}, claimedby: "bleh", id: "3", status : "claimed"},
    {name: "Andrew Huang", desc: "asdf", start: "Hayden Library", end: "Maseeh Hall", start_task: "be good", end_task: "random", start_loc: {lat: 42.3589, lng: -71.0895}, end_loc: {lat: 42.3578, lng: -71.0935}, claimedby: "bleh", id: "4", status : "unclaimed"},
  ]);
  return (
    <MantineProvider theme = {{colorScheme: "light"}} withGlobalStyles withNormalizeCSS>
    <Router>
      <Routes>
        <Route path="home" element={<Home/>} />
        <Route path="dashboard" element={<Dashboard links = {[{link: "tasks", label: "Tasks", links: []}, {link: "newtask", label: "Create Task", links: []}, {link: "route", label: "Route", links: []}, {link: "mytasks", label: "My Tasks", links: []}, {link: "username", label: name, links: [{link: "home", label: "Logout"}]}]} data = {data} setData = {setData}/>} />
      </Routes>;
    </Router>
    </MantineProvider>
  );
}
