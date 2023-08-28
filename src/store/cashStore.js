import {create} from "zustand";
import {persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {formatDate} from "../helpers/helpers.js";
import {cashAPI} from "../api/api.js";
import {useAppStore} from "./appStore.js";

export const useCashStore = create(persist(immer((set)=>({
    count: null,
    title: "",
    start: "2022-05-10",
    stop: "2023-05-10",
    results: [],
    resume:{},
    result:[],
    fetchData: async (start,range,stop)=>{
        const {setLoader} = useAppStore.getState()
        setLoader(true)
        const json = await cashAPI.getData(start?start:'2022-05-10',range?range:'MS',stop?stop:'')
        set({...json,start:json.start,stop:json.stop,result:json.result.map((el)=>({...el,date:formatDate(el.date)}))})
        setLoader(false)
    }
})),{name:"cashStore",version:1}))