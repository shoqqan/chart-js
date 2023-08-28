import {create} from "zustand";

export const useAppStore = create((set)=>({
    loader: false,
    setLoader:(value)=>set(()=>(
        {loader:value}
    ))
}))
