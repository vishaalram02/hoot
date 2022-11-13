import create from 'zustand';

type userState = {
    userName: string,
    setUserName: (i: string) => void,
};

export const useUser = create<userState>((set) => ({
    userName: '',
    setUserName: (i: string) => set({userName: i}),
}));