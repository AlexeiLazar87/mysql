// -- 1. +Вибрати усіх клієнтів, чиє ім'я має менше ніж 6 символів.
// SELECT * FROM client WHERE LENGTH(firstName) < 6;
//
// -- 2. +Вибрати львівські відділення банку.+
// SELECT * FROM department WHERE DepartmentCity = 'Lviv';
//
// -- 3. +Вибрати клієнтів з вищою освітою та посортувати по прізвищу.
//     SELECT * FROM client WHERE Education = 'high' ORDER BY LastName;
//
// -- 4. +Виконати сортування у зворотньому порядку над таблицею Заявка і вивести 5 останніх елементів.
//     SELECT * FROM client ORDER BY LastName DESC LIMIT 5 OFFSET 0;
//
// -- 5. +Вивести усіх клієнтів, чиє прізвище закінчується на OV чи OVA.
//     SELECT * FROM client WHERE LastName LIKE '%ov' OR LastName LIKE '%ova';
//
// -- 6. +Вивести клієнтів банку, які обслуговуються київськими відділеннями.
//     SELECT * FROM client WHERE Department_idDepartment IN (1,4);
//
// -- 7. +Вивести імена клієнтів та їхні номера телефону, погрупувавши їх за іменами.
//     SELECT firstName, passport FROM client ORDER BY FirstName;
//
// -- 8. +Вивести дані про клієнтів, які мають кредит більше ніж на 5000 тисяч гривень.
//     SELECT * FROM client WHERE idClient IN (SELECT Client_idClient FROM application WHERE CreditState = 'Not returned' AND Sum > 5000);
//
// -- 9. +Порахувати кількість клієнтів усіх відділень та лише львівських відділень.
//     SELECT SUM(CountOfWorkers) FROM department;
// SELECT SUM(CountOfWorkers) FROM department WHERE DepartmentCity = 'Lviv';
//
// -- 10. Знайти кредити, які мають найбільшу суму для кожного клієнта окремо.
//     SELECT Client_idClient, MAX(Sum) FROM application
// JOIN client ON application.Client_idClient = client.idClient GROUP BY Client_idClient;
//
// -- 11. Визначити кількість заявок на крдеит для кожного клієнта.
//     SELECT Client_idClient, COUNT(Sum) FROM application
// JOIN client ON application.Client_idClient = client.idClient GROUP BY Client_idClient;
//
// -- 12. Визначити найбільший та найменший кредити.
//     SELECT MAX(Sum) FROM application;
// SELECT MIN(Sum) FROM application;
//
// -- 13. Порахувати кількість кредитів для клієнтів,які мають вищу освіту.
//     SELECT COUNT(SUM) FROM application WHERE Client_idClient IN (SELECT idClient FROM client WHERE Education = 'high')
//
// -- 14. Вивести дані про клієнта, в якого середня сума кредитів найвища.
//     SELECT AVG(Sum), Client_idClient FROM application
// JOIN client ON application.Client_idClient = client.idClient
// GROUP BY Client_idClient
// ORDER BY AVG(Sum) DESC
// LIMIT 1;
//
// -- 15. Вивести відділення, яке видало в кредити найбільше грошей
// SELECT idDepartment, DepartmentCity, SUM(Sum) FROM department
// JOIN client ON department.idDepartment = client.Department_idDepartment
// JOIN application ON client.idClient = application.Client_idClient
// GROUP BY department.idDepartment ORDER BY MAX(Sum) DESC
// LIMIT 1;
//
// -- 16. Вивести відділення, яке видало найбільший кредит.
//     SELECT idDepartment, DepartmentCity, MAX(Sum) FROM department
// JOIN client ON department.idDepartment = client.Department_idDepartment
// JOIN application ON client.idClient = application.Client_idClient
// GROUP BY department.idDepartment ORDER BY MAX(Sum) DESC
// LIMIT 1;
//
// -- 17. Усім клієнтам, які мають вищу освіту, встановити усі їхні кредити у розмірі 6000 грн.
//     UPDATE application
//     JOIN client ON application.Client_idClient = client.idClient
// SET Sum = 6000
// WHERE client.Education = 'high';
//
// -- 18. Усіх клієнтів київських відділень пересилити до Києва.                          <---НЕ РАБОТАЕТ
// UPDATE client
// JOIN department ON client.Department_idDepartment = department.idDepartment
// SET City = 'Kyiv'
// WHERE client.Department_idDepartment = '1' OR client.Department_idDepartment = '4';
//
// -- 19. Видалити усі кредити, які є повернені.                                           <---НЕ РАБОТАЕТ
// DELETE FROM application WHERE CreditState = 'Returned';
//
// -- 20. Видалити кредити клієнтів, в яких друга літера прізвища є голосною.
//
// -- Знайти львівські відділення, які видали кредитів на загальну суму більше ніж 5000
// SELECT idDepartment, DepartmentCity, Sum FROM application
// JOIN client ON application.Client_idClient = client.idClient
// JOIN department ON client.Department_idDepartment = department.idDepartment
// WHERE department.DepartmentCity = 'Lviv' AND Sum > 5000

// -- Знайти клієнтів, які повністю погасили кредити на суму більше ніж 5000
// SELECT FirstName, LastName, CreditState, Sum FROM application
// JOIN client ON client.idClient = application.Client_idClient
// WHERE application.CreditState = 'Returned' AND Sum > 5000;
//
// -- Знайти максимальний неповернений кредит.*/
// SELECT CreditState, MAX(Sum) FROM application
// WHERE application.CreditState = 'Not returned' ORDER BY application.Sum DESC LIMIT 1;
//
// -- Знайти клієнта, сума кредиту якого найменша*/
// SELECT FirstName, LastName, MIN(Sum) FROM client
// JOIN application ON application.Client_idClient = client.idClient
// WHERE application.Sum ORDER BY Sum LIMIT 1;
//
// -- Знайти кредити, сума яких більша за середнє значення усіх кредитів*/
// SELECT * FROM application
// WHERE Sum > (SELECT avg(Sum) FROM application);