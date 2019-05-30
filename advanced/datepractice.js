let firstDate = (new Date('May 23 2018')).getTime()
let nextDate = (new Date('December 23 2018')).getTime()

if (firstDate < nextDate) {
  console.log(new Date(firstDate).toString())
} else if (firstDate > nextDate) console.log(new Date(nextDate).toString())

let birthday = moment()
birthday.date(23)
birthday.month('september')
birthday.year(1994)
console.log(birthday.format('MMM D, YYYY'))
console.log(birthday.fromNow())

let x = 1
console.log(Number.isInteger(false))

