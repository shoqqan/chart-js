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
import {Bar, Line} from "react-chartjs-2";
import {useEffect, useState} from "react";
import {useCashStore} from "./store/cashStore.js";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {formatDate} from "./helpers/helpers.js";
import {Box, Button, ButtonGroup, createTheme, ThemeProvider} from "@mui/material";
import {BoxSkeleton} from "./components/BoxSkeleton.jsx";
import {useAppStore} from "./store/appStore.js";

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

export const App = () => {
    const fetchData = useCashStore(state => state.fetchData)
    const result = useCashStore(state => state.result)
    const start = useCashStore(state => state.start)
    const stop = useCashStore(state => state.stop)
    const loader = useAppStore(state => state.loader)
    const [startValue, setStartValue] = useState(formatDate(start))
    const [stopValue, setStopValue] = useState(formatDate(stop))
    const data = {
        labels: result.map((el) => {
            const parts = el.date.split('-')
            return `${parts[2]}-${parts[1]}-${parts[0]}`
        }),
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
    const theme = createTheme({
        breakpoints: {
            values: {
                xxs: 0, // small phone
                xs: 300, // phone
                sm: 600, // tablets
                md: 900, // small laptop
                lg: 1200, // desktop
                xl: 1536 // large screens
            }
        }
    });
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                rowGap: '2em',
                padding: '2em'
            }}>
                <Box sx={{
                    display: 'flex',
                    columnGap: '2em'
                }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                        <DatePicker
                            label="Start Date"
                            sx={{fontFamily: "Montserrat"}}
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
                </Box>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button onClick={() => {
                        fetchData(startValue, 'D', stopValue)
                    }}>Day range</Button>
                    <Button onClick={() => {
                        fetchData(startValue, 'MS', stopValue)
                    }}>Month range</Button>
                    <Button onClick={() => {
                        fetchData(startValue, 'W-MON', stopValue)
                    }}>Week range</Button>
                    <Button onClick={() => {
                        fetchData(startValue, 'H', stopValue)
                    }}>Hours range</Button>
                </ButtonGroup>
                <Box sx={{
                    width: '50%',
                    height: '50%',
                    borderRadius: '10px',
                    padding: '2em',
                    backgroundColor: '#2D2D2D',
                    boxShadow: '0 0 10px rgba(0,0,0,1)'
                }}>
                    {!loader &&
                        <Line data={data} options={options}></Line>
                    }
                    {loader &&
                        <BoxSkeleton/>
                    }

                </Box>
                <Box sx={{
                    width: '50%',
                    height: '50%',
                    borderRadius: '10px',
                    padding: '2em',
                    backgroundColor: '#2D2D2D',
                    boxShadow: '0 0 10px rgba(0,0,0,1)'
                }}>
                    {!loader &&
                        <Bar data={data} options={options}></Bar>
                    }
                    {loader &&
                        <BoxSkeleton/>
                    }
                </Box>
            </Box>
        </ThemeProvider>
    )
}

