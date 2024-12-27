import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

type Props = {
    startDate: string;
    setSelected: React.Dispatch<React.SetStateAction<Date>>;
    setMonth: React.Dispatch<React.SetStateAction<Date>>;
}

function Header({ startDate, setSelected, setMonth }: Props) {
    const year = dayjs(startDate).year()
    const month = dayjs(startDate).month() + 1
    const dispatch = useDispatch()

    const getDate = (d: number) => {
        return dayjs(startDate).add(d, 'day').date()
    }

    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const prev = () => {
        console.log("prev")
        const prev = dayjs(startDate).add(-7, 'day')
        const prevDate = prev.format("YYYY/MM/DD");
        console.log(prevDate)
        dispatch({
            type: "SETSTARTDATE",
            payload: {
                startDate: prevDate
            },
        })
        setSelected(prev.toDate())
        setMonth(prev.toDate())
    }
    const next = () => {
        console.log("next")
        const next = dayjs(startDate).add(7, 'day');
        const nextDate = next.format("YYYY/MM/DD");
        console.log(nextDate)
        dispatch({
            type: "SETSTARTDATE",
            payload: {
                startDate: nextDate
            },
        })
        setSelected(next.toDate())
        setMonth(next.toDate())
    }

    return(
        <>
        <div className="container text-center">
            <div className="date"><span onClick={prev}>◀</span> {year}년 {month}월 <span onClick={next}>▶</span></div>
        </div>

        <div className="container text-center">
            <div className="row">
                <div className="col">
                </div>
                {days.map((d, i) => {
                    return (
                    <div className="col">
                        <div className="day">{d}</div>
                        <div className="date">{getDate(i)}</div>
                    </div>
                )})}
            </div>
        </div>
        </>

    )
}

export default Header;