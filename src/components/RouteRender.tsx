import { Loader } from "@mantine/core";
import { Marker, GoogleMap, useJsApiLoader, DirectionsService, DirectionsRenderer} from '@react-google-maps/api/';
import { useEffect, useState } from 'react';
import { Task } from "./SelectTable";


export interface RouteRenderProps {
    origin: google.maps.LatLngLiteral,
    data: Task[],
}
const containerStyle = {
    width: '100%',
    height: '400px'
};

function dist(a : google.maps.LatLngLiteral, b : google.maps.LatLngLiteral)  {
    return Math.sqrt((a.lat-b.lat)*(a.lat-b.lat) + (a.lng-b.lng)*(a.lng-b.lng));
};

export function RouteRender (props: RouteRenderProps) {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [order, setOrder] = useState<number[]>([]);
    const googleMapsApiKey = "AIzaSyB0uZhGo6ZmsS8572uspWVOSVq3G3XAcKE";
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: googleMapsApiKey,
        libraries: ['places'],
    });
    const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);

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
        order.forEach((i: number, index: number) => {
            let cur = visited[i] ? props.data[i].start_loc : props.data[i].end_loc;
            waypoints.push({location: cur});
            visited[i] = true;
        });
        await directionsService.route({
            origin: props.origin, 
            destination: props.origin, 
            waypoints: waypoints,
            travelMode: google.maps.TravelMode.WALKING,
        }).then((results) => setDirectionsResponse(results));
    };

    
    useEffect(()=>{
        if(isLoaded){
            setOrder(optOrder());
            calculateRoute().then(() => console.log(directionsResponse));
            
        }
    }, [isLoaded]);

    const getMarkers = () => {
        let markers : any[] = [{name: "H", position: props.origin}];

        let visited = new Array(props.data.length).fill(false);
        order.forEach((i: number, index: number) => {
            let cur = visited[i] ? props.data[i].end_loc : props.data[i].start_loc;
            let name = (visited[i] ? "B" : "A") + String(i+1);
            markers.push({name: name, position: cur});
            visited[i] = true;
        });
        return <>
            {markers.map((i : any, index : number) => (<Marker key = {index} label = {i.name} position={i.position} />))}
        </>
    };
    if(directionsResponse && isLoaded){
        return(
            <GoogleMap
                center = {props.origin}
                zoom = {1}
                mapContainerStyle = {containerStyle}
                onLoad = {map => setMap(map)}
            >
                <DirectionsRenderer options={{markerOptions: {icon: "asdf"}}} directions={directionsResponse}/>
                {getMarkers()}
            </GoogleMap>
        )
    }else{
        return <Loader />
    }
};