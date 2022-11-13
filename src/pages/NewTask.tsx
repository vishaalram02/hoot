import { AppShell, Button, Group, Header, createStyles, TextInput } from "@mantine/core";
import App from "../App";
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { useUser } from '../hooks/user';
import { Task } from "../components/SelectTable";
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
    const name = useUser(store => store.userName);
    const { classes } = useStyles();
    const [submittedValues, setSubmittedValues] = useState('');
    const form = useForm({
        initialValues: {
            desc: '',
            start: '',
            end: '',
            start_task: '',
            end_task: '',
        },
    });
    useEffect(() => {
        console.log(name);
    }, [name]);
    const handleClick = (values: { desc: any; start: any; end: any; start_task: any; end_task: any; }) => {
        addTask({name: name, desc: values.desc, start: values.start, end: values.end, id: randomId(), status: "unclaimed", start_task: values.start_task, end_task: values.end_task, claimedby: ""});
        form.reset();
    };
    return (
        <form onSubmit={form.onSubmit((values) => handleClick(values))}>
        <TextInput
            label = "Summary (5 words or less)"
            placeholder = "submit math pset"
            classNames = {classes}
            {...form.getInputProps('desc')}
        />
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