import s from './App.module.css'
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip
} from "chart.js";
import {Bar, Line, Pie} from "react-chartjs-2";
import {useEffect, useState} from "react";
import {useCashStore} from "./store/store.js";
import {DateField, DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {formatDate} from "./helpers/helpers.js";

ChartJS.register(
    ArcElement,
    BarElement,
    Tooltip,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
)

function App() {
    const fetchData = useCashStore(state => state.fetchData)
    const result = useCashStore(state => state.result)
    const start = useCashStore(state => state.start)
    const stop = useCashStore(state => state.stop)
    const [startValue, setStartValue] = useState(formatDate(start))
    const [stopValue, setStopValue] = useState(formatDate(stop))

    const data = {
        labels: result.map(el => el.date),
        datasets: [{
            label: "Sales of the Week",
            data: result.map(el => el.sum),
            backgroundColor: '#2679FF',
            borderColor: "#2679FF",
            pointBorderColor: 'transparent',
            pointBorderWidth: 4,
            fill: true,
            tension: 0.4
        }]
    };
    const options = {
        plugins: {
            legend: true
        },
        legend: {
            labels: {
                fontColor: "#DBDBDB"
            }
        },
        scales: {
            y: {
                ticks: {
                    color: "#DBDBDB"
                }
            },
            x: {
                ticks: {
                    color: "#DBDBDB"
                }
            }
        }
    };
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className={s.app_container}>
            <div className={s.date_container}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                    <DatePicker
                        label="Start Date"
                        value={dayjs(startValue)}
                        onChange={(newValue) => {
                            fetchData(formatDate(newValue.format()), 'MS', stopValue)
                            setStartValue(formatDate(newValue.format()))
                        }}
                        format={'DD-MM-YYYY'}
                    />
                    <DatePicker
                        label="Stop Date"
                        value={dayjs(stopValue)}
                        onChange={(newValue) => {
                            console.log(startValue)
                            fetchData(startValue, 'MS', formatDate(newValue.format()))
                            setStopValue(formatDate(newValue.format()))
                        }}
                        format={'DD-MM-YYYY'}
                    />
                </LocalizationProvider>
            </div>
            <div className={s.line_container}>
                <Line data={data} options={options}></Line>
            </div>
            <div className={s.line_container}>
                <Bar data={data} options={options}></Bar>
            </div>
        </div>
    )
}

export default App
