# Test-task-Trainee-Analyst-Designer---Financial-Information-Systems
Тестовое задание  стажер аналитик-проектировщик  ФИС

## Задания
1.	Модель данных

Опишите модель данных, которая может лежать в основе данного приложения.

Модель данных

![Image alt](https://github.com/mamkad/Test-task-Trainee-Analyst-Designer---Financial-Information-Systems/blob/main/diagramm.PNG)

sql-cкрипт для создания бд: [ссылка](https://github.com/mamkad/Test-task-Trainee-Analyst-Designer---Financial-Information-Systems/blob/main/create_tables.sql)

2.	Популярный автор

Напишите SQL-запрос, который бы возвращал самого популярного автора за год.

```sql
select 
	lendingofbooks.exemplar_of_book_id, book.book_name, authors.first_name, authors.last_name 
from 
	lendingofbooks 
join 
	exemplarofbook on lendingofbooks.exemplar_of_book_id = exemplarofbook.exemplar_of_book_id
join 
	book on exemplarofbook.book_id = book.book_id
join
	authors on book.author_id = authors.author_id 
where  
	lendingofbooks.date_of_issue between '2021-01-01' and '2022-01-01'
group by 
	lendingofbooks.exemplar_of_book_id
order by 
	count(*) desc 
limit 1;
```

3.	Злостный читатель

Определите понятие «злостный читатель». Предложите алгоритм для поиска самого злостного читателя библиотеки, напишите функцию, возвращающую злостного читателя.
Ожидаемый результат: определение понятия “злостный читатель”, словесное описание логики алгоритма, функция поиска такого читателя на любом языке программирования (js будет плюсом). Алгоритм должен основываться на модели данных из задания 1.

Злостный читатель - человек, который больше всех раз просрочил сдачу книгу (
который вернул книгу лишь спустя месяц, либо вообще её невернул

```sql
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
```

Полный код программы: [ссылка](https://github.com/mamkad/Test-task-Trainee-Analyst-Designer---Financial-Information-Systems/blob/main/app.js)
***(используется node.js и библиотека mysql для подключения к БД)***
