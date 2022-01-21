CREATE table Faculty (
	faculty_id   INT          NOT null,
	faculty_name VARCHAR(256) NOT NULL,
	 
	PRIMARY key (faculty_id)
);

CREATE TABLE Student (
    student_id  INT  	   NOT null,
    first_name VARCHAR(64) NOT NULL,
    last_name  VARCHAR(64) NOT NULL,
    age		   INT  	   NOT NULL,
    gender	   VARCHAR(64) NOT NULL,
    degree     VARCHAR(64) NOT null,	
    faculty_id INT,	
    course	   INT  	   NOT null,
      
	PRIMARY key (student_id),
	FOREIGN KEY (faculty_id) REFERENCES Faculty(faculty_id) 
);

CREATE TABLE Authors (
	author_id   INT         NOT null,
	first_name  VARCHAR(64) NOT NULL,
	last_name   VARCHAR(64) NOT NULL,
	
	PRIMARY key (author_id)
);

CREATE TABLE Publisher (
	publisher_id     INT         NOT null,
	publisher_name   VARCHAR(64) NOT NULL,
	  
	PRIMARY key (publisher_id)
);

CREATE TABLE Book (
	book_id            INT  		NOT null,
	book_name          VARCHAR(256) NOT NULL,
	author_id          INT,
	publisher_id       INT,
	genre	           VARCHAR(64)  NOT NULL,
	
	PRIMARY key (book_id),
	FOREIGN KEY (author_id)    REFERENCES Authors(author_id),
	FOREIGN KEY (publisher_id) REFERENCES Publisher(publisher_id) 
);

CREATE TABLE ExemplarOfBook (
	exemplar_of_book_id INT  NOT null,
	book_id             INT,
	year_of_publishing  DATE,
	publication		    INT,
	total			    INT	 NOT NULL,
	available		    INT	 NOT NULL,
	
	PRIMARY key (exemplar_of_book_id),
	FOREIGN KEY (book_id)    REFERENCES Book(book_id) 
	
);

CREATE table LendingOfBooks (
	lending_of_books    INT  NOT null,
	student_id  		INT,	   
	exemplar_of_book_id INT,
	date_of_issue       DATE NOT NULL,
	date_of_return      DATE,
	
	PRIMARY key (lending_of_books),
	FOREIGN KEY (student_id)          REFERENCES Student(student_id),
	FOREIGN KEY (exemplar_of_book_id) REFERENCES ExemplarOfBook(exemplar_of_book_id) 
);
