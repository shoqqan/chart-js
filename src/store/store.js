import {create} from "zustand";
import {persist} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {formatDate} from "../helpers/helpers.js";
import {cashAPI} from "../api/api.js";

export const useCashStore = create(persist(immer((set)=>({
    count: null,
    title: "",
    start: "",
    stop: "",
    results: [],
    resume:{},
    result:[],
    fetchData: async (start,range,stop)=>{
        const json = await cashAPI.getData(start?start:'2022-05-10',range?range:'MS',stop?stop:'')
        console.log(json)
        set({...json,start:json.start,stop:json.stop,result:json.result.map((el)=>({...el,date:formatDate(el.date)}))})
    }
})),{name:"cashStore",version:1}))