import { AppShell, Button, Header, Loader } from "@mantine/core";
import App from "../App";
import { RouteRender, RouteRenderProps } from "../components/RouteRender";
import { useState } from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api/';

const data : RouteRenderProps = {
    origin: {lat: 42.357583230122415, lng: -71.09272288640211}, 
    start: [{lat: 42.3564211896577, lng:  -71.09683112768066}, {lat: 42.35537533489566, lng:  -71.10040863922927}, {lat: 42.35798993916594, lng: -71.10270846808196}], 
    end: [{lat: 42.36118541892558, lng:  -71.09421679239959}, {lat:  42.36234737127826, lng:  -71.0881232288662}, {lat: 42.36578952900342, lng: -71.08399533095617}],
}
const containerStyle = {
    width: '100%',
    height: '400px'
};

export function Home(){

    return (
        <RouteRender origin={data.origin} start={data.start} end={data.end}/>
    )
}