import create from 'zustand';

type pathState = {
    done: boolean,
    setDone: () => void,
    labels: string[],
    task: number[],
    start: boolean[],
    setLabels: (i: string[]) => void,
    setTask: (i: number[]) => void,
    setStart: (i: boolean[]) => void,
    clear: () => void,
};

export const usePath = create<pathState>((set) => ({
    done: false,
    setDone: () => set({done: true}),
    labels: [],
    setLabels: (i: string[]) => set({labels: i}),
    task: [],
    setTask: (i: number[]) => set({task: i}),
    start: [],
    setStart: (i: boolean[]) => set({start: i}),
    clear: () => set({labels: [], task: [], start: [], done: false}),
}));