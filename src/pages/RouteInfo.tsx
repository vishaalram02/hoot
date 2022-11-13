import { AppShell, Button, Header, Table, Group, Text} from "@mantine/core";
import { RouteRender } from "../components/RouteRender";
import { Task } from '../components/SelectTable';
import { usePath } from '../hooks/path';

interface RouteInfoProps {
    dirData : google.maps.DirectionsResult | undefined, 
    setDirData: Function,
    data : Task[], 
}
export function RouteInfo({ dirData, data, setDirData} : RouteInfoProps){
    const [labels,task,start] = usePath((store) => [store.labels, store.task, store.start]); 
    console.log(labels);
    console.log(task);
    console.log(data);
    return (
        <div style={{width: '100%', height: '100%'}}>
            <Group position="apart" grow>
                <RouteRender preview = {false} containerStyle = {{width: '40%', height: '500px'}} setDirData = {setDirData} origin = {{lat: 42.35977,lng: -71.09491}}  data = {data}></RouteRender>
                <Table>
                    <thead>
                        <tr>
                            <th>Step</th>
                            <th>Label</th>
                            <th>Address</th>
                            <th>Task</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dirData && dirData.routes[0].legs.map((i: google.maps.DirectionsLeg, index: number) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{labels[index]}</td>
                                <td>{labels[index] == 'H' ? i.end_address : (start[index] ? data[task[index]].end : data[task[index]].start)}</td>
                                <td>{labels[index] == 'H' ? 'End' : (start[index] ? data[task[index]].end_task : data[task[index]].start_task)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Group>
          
        </div>
       
    )
}