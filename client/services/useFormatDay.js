import dayjs from "dayjs"
import calendar from 'dayjs/plugin/calendar'
import { useEffect, useState } from "react"

export const useFormatDay = (date) => {
    const [timeUpdate, setTimeUpdate] = useState("")

    const format = () => {
        dayjs.extend(calendar)
        
        const formated = dayjs(date).calendar(null, {
            sameDay: '[Today at] h:mm A', // The same day ( Today at 2:30 AM )
            nextDay: '[Tomorrow]', // The next day ( Tomorrow at 2:30 AM )
            nextWeek: 'dddd', // The next week ( Sunday at 2:30 AM )
            lastDay: '[Yesterday]', // The day before ( Yesterday at 2:30 AM )
            lastWeek: '[Last] dddd', // Last week ( Last Monday at 2:30 AM )
            sameElse: 'DD/MM/YYYY' // Everything else ( 7/10/2011 )
        })
        // console.log(formated)
        setTimeUpdate(formated)
    }

    useEffect(() => {
       format() 
    }, [])
    
    return {timeUpdate}
}