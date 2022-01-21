
// Параметры для подключения к моей базе данных
const config = {
	host: 'localhost',
	user: 'root',
	database: 'task',
	password: '123fynjy321'
}

// Получение данных таблицы из БД по запросу
async function getDataFromTable(connect, tableName) {
	return new Promise((resolve, reject) => {
		connect.query(
		`SELECT * FROM ${tableName}`, 
		(err, data) => {
			if (err) { reject(err) }
			resolve(data)
		});
	})
}

// Подключение к базе данных и получение данных из таблиц
async function getDataFromDB() {
	const mysql = require('mysql');

	// Подключаемся к базе данных	
	const connect = mysql.createConnection(config)

	// Создаём соединение
	connect.connect((err) => {
		if (err) { return console.error(err.message) 		   } 
		else 	 { console.log('success. start connection...') }
	})

	// Отправляем запрос в бд на получение данных таблицы Student
	const studentData	= await getDataFromTable(connect, 'Student') 
	//console.log(studentData)

	// Отправляем запрос в бд на получение данных таблицы LendingOfBooks
	const lendingOfBooks	= await getDataFromTable(connect, 'LendingOfBooks') 
	
	// Закрываем соединение
	connect.end((err) => {
		if (err) { return console.error(err.message) } 
		else 	 { console.log('end connection')     }
	})

	return [lendingOfBooks, studentData]
}

function monthDiff(d1, d2) {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

// node.js 
// npm install mysql
function algorithm(lendingOfBooks, studentData) {

	const students = new Map();
	Object.keys(lendingOfBooks).forEach( (key) => {
		const date_of_issue = new Date(lendingOfBooks[key].date_of_issue)
		const date_of_return = new Date(lendingOfBooks[key].date_of_return)
		const student_id = lendingOfBooks[key].student_id
		if ( (lendingOfBooks[key].date_of_return === null) || (monthDiff(date_of_issue, date_of_return) >= 1)) {
			if (students.has(student_id)) {
				v = students.get(student_id);
				v++
				students.set(student_id, v);
			} else {
				students.set(student_id, 1);
			}
		}
	})

	let res = []
	const max_pair = [...students.entries()].reduce((a, e) => e[1] > a[1] ? e : a)
	students.delete(max_pair[0])
	res.push(max_pair)

	students.forEach((value, key) => {
		if (value === max_pair[1]) {
			res.push([key, value])
			students.delete(key)
		}
	})

	let full_answer = []
	for (let i in res) {
		const pair = res[i]
		full_answer.push([pair[0],studentData[pair[0]].first_name, studentData[pair[0]].last_name, pair[1]])
	}

	return full_answer
}

// Главная функция
async function main() {
	tablesFromDB = await getDataFromDB()
	full_answer = algorithm(tablesFromDB[0], tablesFromDB[1])
	console.log(full_answer)
}

main()