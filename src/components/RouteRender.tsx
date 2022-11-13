import { Loader } from "@mantine/core";
import { Marker, GoogleMap, useJsApiLoader, DirectionsService, DirectionsRenderer} from '@react-google-maps/api/';
import { useEffect, useState } from 'react';
import { Task } from "./SelectTable";
import { usePath } from "../hooks/path";

export interface RouteRenderProps {
    origin: google.maps.LatLngLiteral,
    data: Task[],
    setDirData: Function,
    containerStyle: {width: string, height: string},
    preview: boolean,
}

function dist(a : google.maps.LatLngLiteral, b : google.maps.LatLngLiteral)  {
    return Math.sqrt((a.lat-b.lat)*(a.lat-b.lat) + (a.lng-b.lng)*(a.lng-b.lng));
};

export function RouteRender (props: RouteRenderProps) {
    const [done, setDone, setLabels, setTask, setStart] = usePath((store) => [store.done, store.setDone, store.setLabels, store.setTask, store.setStart]);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [order, setOrder] = useState<number[]>([]);
    const googleMapsApiKey = "AIzaSyB0uZhGo6ZmsS8572uspWVOSVq3G3XAcKE";
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: googleMapsApiKey,
        libraries: ['places'],
    });
    const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | undefined>(undefined);

    function permute(permutation : number[]) {
        var length = permutation.length,
            result = [permutation.slice()],
            c = new Array(length).fill(0),
            i = 1, k, p;
        while (i < length) {
          if (c[i] < i) {
            k = i % 2 && c[i];
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            ++c[i];
            i = 1;
            result.push(permutation.slice());
          } else {
            c[i] = 0;
            ++i;
          }
        }
        return result;
      }

    const optOrder = () => {
        let n = props.data.length;
        let cur : number[] = [];
        for(let i=0;i<n;++i){
            cur.push(i); cur.push(i);
        }

        let best = cur;
        let mndist = -1;

        let tries = permute(cur);
        tries.forEach((p) => {
            let visited = new Array(n).fill(false);

            let d = 0;
            let prev = props.origin;
            p.forEach((i : number, index : number) => {
                let cur = visited[i] ? props.data[i].start_loc : props.data[i].end_loc;
                d += dist(prev, cur);
                prev = cur;
                visited[i] = true;
            });

            d += dist(prev, props.origin);
            if(mndist == -1 || d < mndist){
                mndist = d;
                best = p;
            }
        })
        return best;
        
    }

    async function calculateRoute(){
        const directionsService = new google.maps.DirectionsService();
        let waypoints : google.maps.DirectionsWaypoint[] = [];
        let visited = new Array(props.data.length).fill(false);
        optOrder().forEach((i: number, index: number) => {
            let cur = visited[i] ? props.data[i].start_loc : props.data[i].end_loc;
            waypoints.push({location: cur});
            visited[i] = true;
        });
        await directionsService.route({
            origin: props.origin, 
            destination: props.origin, 
            waypoints: waypoints,
            travelMode: google.maps.TravelMode.WALKING,
        }).then((results) => {
            props.setDirData(results);
            setDirectionsResponse(results);
         });
    };

    useEffect(() => {
        console.log(directionsResponse);
    }, [directionsResponse])
    useEffect(()=>{
        if(isLoaded){
            setOrder(optOrder());
            calculateRoute();
        }
    }, [isLoaded]);

    const getMarkers = () => {
        let markers : any[] = [{name: "H", position: props.origin}];
        let newLabels : string[] = [];
        let newTask : number[] = [];
        let newStart : boolean[] = [];
        let visited = new Array(props.data.length).fill(false);
        order.forEach((i: number, index: number) => {
            let cur = visited[i] ? props.data[i].end_loc : props.data[i].start_loc;
            let name = (visited[i] ? "B" : "A") + String(i+1);
            newLabels.push(name);
            newTask.push(i);
            newStart.push(visited[i]);
            markers.push({name: name, position: cur});
            visited[i] = true;
        });
        newLabels.push('H');
        if(!done){
            setLabels(newLabels);
            setTask(newTask);
            setStart(newStart);
            setDone();
        }
        return <>
            {markers.map((i : any, index : number) => (<Marker key = {index} label = {i.name} position={i.position} />))}
        </>
    };
   
    if(directionsResponse && isLoaded){
        return(
            <GoogleMap
                center = {props.origin}
                zoom = {1}
                mapContainerStyle = {props.containerStyle}
                onLoad = {map => setMap(map)}
            >   
                <DirectionsRenderer options={{markerOptions: {icon: "asdf"}}} directions={directionsResponse} />
                {getMarkers()}
            </GoogleMap>
        )
    }else{
        return <Loader />
    }
};