import { AppShell, Button, Group, Header, createStyles, TextInput } from "@mantine/core";
import App from "../App";
import { useEffect, useState, useRef } from 'react';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { useUser } from '../hooks/user';
import { Task } from "../components/SelectTable";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
const useStyles = createStyles((theme) => ({
    root: {
      position: 'relative',
    },
  
    input: {
      height: 'auto',
      width: 500, 
      paddingTop: 18,
    },
  
    label: {
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: theme.fontSizes.xs,
      paddingLeft: theme.spacing.sm,
      paddingTop: theme.spacing.sm / 2,
      zIndex: 1,
    },
  }));
interface NewTaskProps {
    claimTasks: Function;
    addTask: Function;
}
export function NewTask({claimTasks, addTask}: NewTaskProps){
    const googleMapsApiKey = "AIzaSyB0uZhGo6ZmsS8572uspWVOSVq3G3XAcKE";
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: googleMapsApiKey,
        libraries: ['places'],
    });
    const [auto, setAuto] = useState<google.maps.places.Autocomplete | undefined>(undefined);
    const [buto, setButo] = useState<google.maps.places.Autocomplete | undefined>(undefined);
    
    const name = useUser(store => store.userName);
    const { classes } = useStyles();
    const [submittedValues, setSubmittedValues] = useState('');
    const inputRef = useRef<HTMLInputElement>();
    const form = useForm({
        initialValues: {
            desc: '',
            start: '',
            end: '',
            start_task: '',
            end_task: '',
        },
        validate: {
            desc: (value) => (value.length < 1 ? 'Description cannot be empty' : null),
            start: (value) => (value.length < 1 ? 'Starting location cannot be empty' : null),
            start_task: (value) => (value.length < 1 ? 'Starting task description cannot be empty' : null),
            end: (value) => (value.length < 1 ? 'Ending location cannot be empty' : null), 
            end_task: (value) => (value.length < 1 ? 'Ending task description cannot be empty' : null),  
        },
    });
    const handleClick = (values: { desc: any; start: any; end: any; start_task: any; end_task: any; }) => {
        const start_loc = {lat: 0, lng: 0};
        const end_loc = {lat: 0, lng: 0};
        if(auto?.getPlace().geometry?.location?.lat() && auto?.getPlace().geometry?.location?.lng()){
          start_loc.lat = auto?.getPlace().geometry?.location?.lat() as number;
          start_loc.lng = auto?.getPlace().geometry?.location?.lng() as number;
        }else{
          return;
        }
        if(buto?.getPlace().geometry?.location?.lat() && buto?.getPlace().geometry?.location?.lng()){
          end_loc.lat = buto?.getPlace().geometry?.location?.lat() as number;
          end_loc.lng = buto?.getPlace().geometry?.location?.lng() as number;
        }else{
          return;
        }
        addTask({name: name, desc: values.desc, start: values.start, end: values.end, id: randomId(), status: "unclaimed", start_task: values.start_task, end_task: values.end_task, claimedby: "", start_loc: start_loc, end_loc: end_loc});
        form.reset();
    };

    const autoPlace = () => {
      if(auto && auto.getPlace() && auto.getPlace().formatted_address){
        form.setFieldValue('start', auto.getPlace().formatted_address as string);
      }
    };
    const butoPlace = () => {
      if(buto && buto.getPlace() && buto.getPlace().formatted_address){
        form.setFieldValue('end', buto.getPlace().formatted_address as string);
      }
    };
    return (
        <form onSubmit={form.onSubmit((values) => handleClick(values))}>
        <TextInput
            label = "Summary (5 words or less)"
            placeholder = "submit math pset"
            classNames = {classes}
            {...form.getInputProps('desc')}
        />
        
        {isLoaded && (
        <Autocomplete onLoad={(a : any) => setAuto(a)} onPlaceChanged={autoPlace}>
        <TextInput
            label = "Start location"
            placeholder = "Maseeh Hall"
            classNames = {classes}
            {...form.getInputProps('start')}
        />
        </Autocomplete>)}
        <TextInput
            label = "Task at start location"
            placeholder = "Pick up homework"
            classNames = {classes}
            {...form.getInputProps('start_task')}
        />
        {isLoaded && (
        <Autocomplete onLoad={(a : any) => setButo(a)} onPlaceChanged={butoPlace}>
        <TextInput
            label = "End location"
            placeholder = "Next House"
            classNames = {classes}
            {...form.getInputProps('end')}
        />
        </Autocomplete>)}
        <TextInput
            label = "Task at end location"
            placeholder = "Drop off homework"
            classNames = {classes}
            {...form.getInputProps('end_task')}
        />
        <Group position="right" mt="md">
          <Button mt = "md" type="submit">Submit</Button>
        </Group>
      </form>
    );
}