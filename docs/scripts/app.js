
const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("Вам многому нужно научиться", 0),
	new Result("Вы уже неплохо разбираетесь", 10),
	new Result("Ваш уровень выше среднего", 15),
	new Result("Вы в совершенстве знаете тему", 20)
];

//Массив с вопросами
const questions = 
[
	new Question("Какое приложение не является текстовым редактором?", 
	[
		new Answer("Блокнот", 0),
		new Answer("WordPad", 0),
		new Answer("Paint", 1),
		new Answer("Microsoft Word", 0)
	]),

	new Question("С помощью какого значка на рабочем столе запускается программа Word?", 
	[
		new Answer('<img src="https://i.imgur.com/r59X1Y3.png">', 1),
		new Answer('<img src="https://i.imgur.com/h3V7Y7f.png">', 0),
		new Answer('<img src="https://i.imgur.com/V0ueL8T.png">', 0),
		new Answer('<img src="https://i.imgur.com/gdMxpGC.png">', 0)
	]),

	new Question('Как называется эта строка?<br><img src="https://i.imgur.com/GQPkkTj.png">', 
	[
		new Answer("строка состояния", 0),
		new Answer("строка меню", 0),
		new Answer("строка заголовка", 1),
		new Answer("панель инструментов", 0)
	]),

	new Question('Какая вкладка является первой в окне программы Microsoft Word 2010?<br><img src="https://i.imgur.com/XN0c1x9.png">', 
	[
		new Answer("Главная", 1),
		new Answer("Файл", 0),
		new Answer("Разметка страницы", 0),
		new Answer("Вставка", 0)
	]),

	new Question('Сколько всего групп на этом фрагменте?<br><img src="https://i.imgur.com/ETLNEOW.png">', 
	[
		new Answer("1", 0),
		new Answer("2", 0),
		new Answer("3", 1),
		new Answer("Нет групп", 0)
	]),

	new Question("Чтобы создать новый документ в программе Microsoft Word 2010 надо открыть вкладку:", 
	[
		new Answer("Файл", 1),
		new Answer("Главная", 0),
		new Answer("Вставка", 0),
		new Answer("Редактирование", 0)
	]),

	new Question("Если вы хотите сохранить измененный документ вторично под тем же названием необходимо выбрать команду:", 
	[
		new Answer("Сохранить", 1),
		new Answer("Открыть как", 0),
		new Answer("Сохранить как", 0),
		new Answer("Открыть", 0)
	]),

	new Question("Если вы хотите сохранить измененный документ вторично под другим названием необходимо выбрать команду:", 
	[
		new Answer("Сохранить", 0),
		new Answer("Открыть как", 0),
		new Answer("Сохранить как", 1),
		new Answer("Открыть", 0)
	]),

	new Question("Какой клавишей можно удалить символ слева от курсора (т.е. перед ним)?", 
	[
		new Answer("Delete", 0),
		new Answer("Enter", 0),
		new Answer("<- (Backspace)", 1),
		new Answer("Shift", 0)
	]),

	new Question("Какой клавишей можно удалить символ справа от курсора (т.е. после него)?", 
	[
		new Answer("Delete", 1),
		new Answer("Enter", 0),
		new Answer("<- (Backspace)", 0),
		new Answer("Shift", 0)
	]),

	new Question("Какой клавишей происходит переход на новую строку?", 
	[
		new Answer("Delete", 0),
		new Answer("Enter", 1),
		new Answer("<- (Backspace)", 0),
		new Answer("Shift", 0)
	]),

	new Question("Какой клавишей происходит переход на заглавную букву с строчной?", 
	[
		new Answer("Delete", 0),
		new Answer("Enter", 0),
		new Answer("<- (Backspace)", 0),
		new Answer("Shift", 1)
	]),

	new Question("Комбинация каких клавиш выполняет переход с русского языка на английский?", 
	[
		new Answer("Alt+Shift", 1),
		new Answer("Enter", 0),
		new Answer("Shift+F3", 0),
		new Answer("Shift", 0)
	]),

	new Question('Рядом с названием какой группы нужно нажать на кнопку <img src="https://i.imgur.com/iHm0hAz.png">, чтобы появилось диалоговое окно,  где можно установить красную строку', 
	[
		new Answer("Абзац", 1),
		new Answer("Шрифт", 0),
		new Answer("Буфер обмена", 0),
		new Answer("Стили", 0)
	]),

	new Question('Рядом с названием какой группы нужно нажать на кнопку <img src="https://i.imgur.com/iHm0hAz.png">, чтобы появилось диалоговое окно,  где можно разреженность текста', 
	[
		new Answer("Абзац", 1),
		new Answer("Шрифт", 0),
		new Answer("Буфер обмена", 0),
		new Answer("Стили", 0)
	]),

	new Question("Какая вкладка отвечает за настройку параметров страницы?", 
	[
		new Answer("Главная", 0),
		new Answer("Вставка", 1),
		new Answer("Разметка страницы", 0),
		new Answer("Макет", 0)
	]),

	new Question("Какая кнопка не находится на вкладке «Разметка страницы»:", 
	[
		new Answer("1", 0),
		new Answer("2", 1),
		new Answer("3", 0)
	]),

	new Question("Какой ориентации листа нет?", 
	[
		new Answer("Книжная", 0),
		new Answer("Альбомная", 0),
		new Answer("Журнальная", 1)
	]),

	new Question("Какой способ запуска программы не правильный?", 
	[
		new Answer("Двойной щелчок по иконке приложения на рабочем столе.", 0),
		new Answer("Пуск → Все программы → Стандартные → Microsoft Word 2010.", 1),
		new Answer("Пуск → Все программы → Microsoft Office → Microsoft Word 2010", 0)
	]),

	new Question("С помощью какой вкладки можно вставить Таблицу?", 
	[
		new Answer("Главная", 0),
		new Answer("Вставка", 1),
		new Answer("Разметка страницы", 0),
		new Answer("Файл", 0)
	])
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Верных ответов: " + quiz.score;
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}