import { AppShell, Button, Header, Table } from "@mantine/core";
import { RouteRender } from "../components/RouteRender";
import { Task } from '../components/SelectTable';

interface RouteInfoProps {
    dirData : google.maps.DirectionsResult | undefined, 
    setDirData: Function,
    data : Task[], 
}
export function RouteInfo({dirData, data, setDirData} : RouteInfoProps){
    return (
        <div style={{width: '100%', height: '100%'}}>
            <RouteRender setDirData = {setDirData} origin = {{lat: 42.35977,lng: -71.09491}}  data = {data}></RouteRender>
          
        </div>
       
    )
}