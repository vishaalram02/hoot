import { AppShell, Button, Group, Header, createStyles, TextInput } from "@mantine/core";
import App from "../App";
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { useUser } from '../hooks/user';
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
    data: { avatar: string; name: string; desc: string, start: string, end: string, id: string, status : string}[];
    addTask: Function;
}
export function NewTask({claimTasks, data, addTask}: NewTaskProps){
    const name = useUser(store => store.userName);
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
    useEffect(() => {
        console.log(name);
    }, [name]);
    const handleClick = (values: { start: any; end: any; start_task: any; end_task: any; }) => {
        addTask({avatar: "", name: name, desc: values.start_task+", "+values.end_task, start: values.start, end: values.end, id: randomId(), status: "unclaimed"});
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