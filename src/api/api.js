import axios from "axios";

const baseURL='http://shelter.bmsys.net:58600/api/dashboard/cash/'
const instance = axios.create(
    {
        baseURL
    }
)

export const cashAPI = {
    getData:(start,range,stop)=>instance.get(`?start=${start}${stop?`&stop=${stop}`:''}&range=${range}`).then(res=>res.data)
}
// http://shelter.bmsys.net:58600/api/dashboard/cash/?start=2023-08-24&stop=2023-08-25&range=D
