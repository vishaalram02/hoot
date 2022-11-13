import { AppShell, Button, Header, Table, Group, Text, Loader} from "@mantine/core";
import { RouteRender } from "../components/RouteRender";
import { Task } from '../components/SelectTable';
import { usePath } from '../hooks/path';
import { useUser } from '../hooks/user';

interface RouteInfoProps {
    dirData : google.maps.DirectionsResult | undefined, 
    setDirData: Function,
    data : Task[], 
    setPage: Function,
    setData: Function,
}
export function RouteInfo({ setData, setPage, dirData, data, setDirData} : RouteInfoProps){
    const [labels,task,start,clear] = usePath((store) => [store.labels, store.task, store.start,store.clear]); 
    const name = useUser((store) => store.userName);
    
    const handleComplete = () => {
        clear();
        setPage("tasks");
        setData(data.map((task) => {
            if(task.status == "claimed" && task.claimedby == name){
                task.status = "completed";
            }
            return task;
        }));
    };

    if(labels.length*task.length*start.length == 0){
        return (
            <Loader />
        )
    }
    return (
        <div style={{width: '100%', height: '100%'}}>
            <Group position="apart" grow>
                <RouteRender preview = {false} containerStyle = {{width: '40%', height: '500px'}} setDirData = {setDirData} origin = {{lat: 42.35977,lng: -71.09491}}  data = {data}></RouteRender>
                <div>
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
                <Button onClick={handleComplete}>Complete</Button>
                </div>
            </Group>
            
          
        </div>
       
    )
}