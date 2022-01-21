# Test-task-Trainee-Analyst-Designer---Financial-Information-Systems
Тестовое задание  стажер аналитик-проектировщик  ФИС

## 1.	Модель данных

Опишите модель данных, которая может лежать в основе данного приложения.

***Модель данных***

![Image alt](https://github.com/mamkad/Test-task-Trainee-Analyst-Designer---Financial-Information-Systems/blob/main/diagramm.PNG)

***Описание***

По умолчанию все поля таблицы не могут быть null. Если может, то будет написано.

Таблица `Lendingofbooks` - данные о выдаче книг. Данные: id студента (Student), id экземпляра книги (Exemplarofbook) (оба int), дату выдачи и дату возврата (обе date, дата возврата может быть
null, это значит, что книга ещё не возвращена).

***Ветвь Exemplarofbook***

Таблица `Exemplarofbook` - данные о текущем экземпляре книги (Book). Данные: id книги (int), дата публикации (date), издание, сколько всего книг и сколько доступно к выдаче (int).
Exemplarofbook отдельно от Book для того, чтобы отделить информацию о кол-ве, издателе и дате публикации от информации о самой книге.

Таблица `Book` - данные о самой книге. Данные: имя книги (varchar(256)), id автора, id издательства (оба int), жанр (varchar(256)).
 
Таблица `Authors` - данные об авторе. Данные: имя и фамилия (varchar(64))

Таблица `Publisher` - данные об издательстве. Данные: название издательства (varchar(64))

***Ветвь Student***

В таблице `Student` - данные о студенте. Данные: имя, фамилия (varchar(64)), возраст (int), пол, получаемая степень (varchar(64)), id факультета, текущий курс (int).

В таблице `Faculty`- данные о факультете Данные: Название факультета (varchar(64))

***sql-cкрипт для создания данных таблиц в БД:*** [ссылка](https://github.com/mamkad/Test-task-Trainee-Analyst-Designer---Financial-Information-Systems/blob/main/create_tables.sql)

## 2.	Популярный автор

Напишите SQL-запрос, который бы возвращал самого популярного автора за год.

***Sql-Запрос***

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

## 3.	Злостный читатель

Определите понятие «злостный читатель». Предложите алгоритм для поиска самого злостного читателя библиотеки, напишите функцию, возвращающую злостного читателя.
Ожидаемый результат: определение понятия “злостный читатель”, словесное описание логики алгоритма, функция поиска такого читателя на любом языке программирования (js будет плюсом). Алгоритм должен основываться на модели данных из задания 1.

***Определение злостного читателя***

Максимальный срок удержание книги неболее месяца.
Злостный читатель - человек, который больше всех раз нарушил срок сдачи книг, либо не вернул книгу вовсе. 

***Описание алгоритма***

В случае, если несколько человек просрочили сдачу книг одинаковое кол-во раз, будут выведены они все

***Функция поиска злостоного читатеял на js***

```javascript
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


