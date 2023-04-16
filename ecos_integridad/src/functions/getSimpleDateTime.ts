const getSimpleDateTime = (time: Date | undefined) => {
    if (time) {
        const day = new Date(time).getDay()
        let dayName = ''
        if (day === 0) {
            dayName = 'Lunes'
        } else if (day === 1) {
            dayName = 'Martes'
        } else if (day === 2) {
            dayName = 'Miercoles'
        } else if (day === 3) {
            dayName = 'Jueves'
        } else if (day === 4) {
            dayName = 'Viernes'
        } else if (day === 5) {
            dayName = 'Sabado'
        } else if (day === 6) {
            dayName = 'Domingo'
        }
        const date = new Date(time).getUTCDate()
        const month = new Date(time).getUTCMonth()
        let monthName
        if (month === 0) {
            monthName = '01'
        } else if (month === 1) {
            monthName = '02'
        } else if (month === 2) {
            monthName = '03'
        } else if (month === 3) {
            monthName = '04'
        } else if (month === 4) {
            monthName = '05'
        } else if (month === 5) {
            monthName = '06'
        } else if (month === 6) {
            monthName = '07'
        } else if (month === 7) {
            monthName = '08'
        } else if (month === 8) {
            monthName = '09'
        } else if (month === 9) {
            monthName = '10'
        } else if (month === 10) {
            monthName = '11'
        } else if (month === 11) {
            monthName = '12'
        }
        if (!time) {
            return 'Sin información'
        } else {
            return (dayName + ' ' + date + '/' + monthName + '/' + new Date(time).getFullYear())
        }
    } else {
        return ('')
    }
}

export default getSimpleDateTime
