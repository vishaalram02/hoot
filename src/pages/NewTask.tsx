import { AppShell, Autocomplete, Loader, Button, Group, Header, createStyles, TextInput } from "@mantine/core";
import App from "../App";
import { ContainedInputs } from "../components/InputBox";
import { useState, useRef } from 'react';
import { Tasks } from "../pages/Tasks";
import { useForm } from '@mantine/form';
// import { GoogleMap, LoadScript, Autocomplete as Auto} from '@react-google-maps/api';
// import usePlacesAutocomplete, {getGeoCode, getLatLng} from "use-places-autocomplete";
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
// const initAutocomplete = (search: string) => {
//     <Auto 
//     />
//     return None;
// };
interface NewTaskProps {
    claimTasks: Function;
    data: { avatar: string; name: string; desc: string, start: string, end: string, id: string, status : string}[];
    addTask: Function;
}
export function NewTask({claimTasks, data, addTask}: NewTaskProps){
    const { classes } = useStyles();
    const [submittedValues, setSubmittedValues] = useState('');
    const form = useForm({
        initialValues: {
            start: '',
            end: '',
            start_task: '',
            end_task: '',
        },
    });
    // const timeoutRef = useRef<number>(-1);
    // const [value, setValue] = useState('');
    // const [loading, setLoading] = useState(false);
    // const [data, setData] = useState<string[]>([]);
    // const handleChange = (val: string) => {
    //     window.clearTimeout(timeoutRef.current);
    //     setValue(val);
    //     setData([]);
    //     if (val.trim().length === 0) {
    //       setLoading(false);
    //     } else {
    //       setLoading(true);
    //       timeoutRef.current = window.setTimeout(() => {
    //         setLoading(false);
    //         // setData(initAutocomplete(val));
    //         setData([]);
    //       }, 1000);
    //     }
    //   };
    const handleClick = (values: { start: any; end: any; start_task: any; end_task: any; }) => {
        addTask({avatar: "", name: "Andrew", desc: values.start_task+", "+values.end_task, start: values.start, end: values.end, id: "", status: "unclaimed"});
        form.reset();
    };
    return (
        <form onSubmit={form.onSubmit((values) => handleClick(values))}>
        <TextInput
            label = "Start location"
            placeholder = "Maseeh Hall"
            classNames = {classes}
            {...form.getInputProps('start')}
        />
        {/* <Autocomplete value={value} data={data} onChange={handleChange} rightSection={loading ? <Loader size={16} /> : null} label="Async Autocomplete data" placeholder="Your email"/> */}
        <TextInput
            label = "Task at start location"
            placeholder = "Pick up homework"
            classNames = {classes}
            {...form.getInputProps('start_task')}
        />
        <TextInput
            label = "End location"
            placeholder = "Next House"
            classNames = {classes}
            {...form.getInputProps('end')}
        />
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