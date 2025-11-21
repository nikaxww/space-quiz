function createElements() {

    const form = document.createElement('form')
    const nameInput = document.createElement('input')
    const button = document.createElement('button')

    form.classList.add('form')
    nameInput.classList.add('input')
    button.classList.add('start-button')

    nameInput.placeholder = 'Введите ваше имя'
    button.textContent = 'Начать'
    button.disabled = true

    nameInput.addEventListener('input', () => {
        const value = nameInput.value.trim();
        button.disabled = !value;
    });

    button.addEventListener('click', (e) => {
        e.preventDefault();
        const userName = nameInput.value.trim();
        if (userName) {
            startTest(userName);
        }
    });

    form.append(nameInput)
    form.append(button)

    return {
        form,
        nameInput,
        button
    }
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function createQuestons() {

    return shuffleArray([
        {
            question: 'Спутником какой планеты является Каллисто?',
            image: 'img/1qw.jpg',
            options: [
                { text: 'Венера', correct: false },
                { text: 'Юпитер', correct: true },
                { text: 'Марс', correct: false },
                { text: 'Нептун', correct: false }
            ],
            explanation: 'Каллисто — второй по величине спутник Юпитера и третий в Солнечной системе. Он входит в группу галилеевых спутников, открытых Галилео Галилеем в 1610 году.'
        },
        {
            question: 'Что из списка не является галактикой?',
            image: 'img/2qw.jpg',
            options: [
                { text: 'Андромеда', correct: false },
                { text: 'Магелланово Облако', correct: false },
                { text: 'Альдебаран', correct: true },
                { text: 'Млечный Путь', correct: false }
            ],
            explanation: 'Альдебаран — это звезда (α Тельца), самая яркая в созвездии Тельца. Остальные — галактики: Андромеда (M31), Магеллановы Облака (спутники Млечного Пути), Млечный Путь — наша галактика.'
        },
        {
            question: 'Что такое «Солнечный ветер»?',
            image: 'img/3qw.jpg',
            options: [
                { text: 'Поток супер-ионизированных частиц из солнечной короны', correct: true },
                { text: 'Взрывной процесс выделения энергии в атмосфере Солнца', correct: false },
                { text: 'Внешние слои атмосферы Солнца', correct: false },
                { text: 'Периодическое изменение магнитного поля Солнца', correct: false }
            ],
            explanation: 'Солнечный ветер — это поток заряженных частиц (в основном протонов и электронов), постоянно истекающий из солнечной короны со скоростью 300–1200 км/с. Он формирует гелиосферу и вызывает полярные сияния на Земле.'
        },
        {
            question: 'Звёздами какого созвездия являются Сегин, Рукбах, Нави, Шедар и Каф?',
            image: 'img/4qw.jpg',
            options: [
                { text: 'Большая медведица', correct: false },
                { text: 'Кассиопея', correct: true },
                { text: 'Гончие псы', correct: false },
                { text: 'Капелла', correct: false }
            ],
             explanation: 'Эти звёзды образуют знаменитую «букву W» (или «M») — характерную форму созвездия Кассиопея. Шедар (α Cas) — самая яркая, Каф (β Cas) — «рука», Нави (γ Cas) — переменная звезда.'
        },
        {
            question: 'Что такое «Астеризм»?',
            image: 'img/5qw.jpg',
            options: [
                { text: 'Группа звёзд, образующая узнаваемый узор', correct: true },
                { text: 'Официально признанное созвездие', correct: false },
                { text: 'Взрыв звезды в конце её жизни', correct: false },
                { text: 'Скопление газа и пыли в космосе', correct: false }
            ],
            explanation: 'Астеризм — это заметный звёздный узор, не являющийся официальным созвездием (например, Пояс Ориона, Большая Медведица — часть созвездия, а не отдельное). Созвездия — 88 официальных областей, утверждённых МАС.'
        }])
}

let questionIndex = 0
let questions = [];
let userName = '';
let userAnswers = [];

function startTest(name) {
    userName = name;
    questions = createQuestons();
    questionIndex = 0;
    userAnswers = [];

    const app = document.getElementById('app');
    app.innerHTML = '';

    renderQuestion();
}


function renderQuestion() {

    const app = document.getElementById('app');
    app.innerHTML = '';

    const container = document.createElement('div')
    container.classList.add('test-container')

    const q = questions[questionIndex]


    const title = document.createElement('h2')
    title.textContent = ` ${questionIndex + 1}`
    container.append(title)

    const textQuestion = document.createElement('div')
    textQuestion.classList.add('text-question')
    textQuestion.textContent = q.question
    container.append(textQuestion)

    const img = document.createElement('img');
    img.classList.add('img-cont')
    img.src = q.image;
    img.alt = 'Изображение к вопросу';
    container.append(img);

    const optionsDiv = document.createElement('div');
    optionsDiv.classList.add('options')

    const radioGroupName = `q${questionIndex}`;
    q.options.forEach((opt, idx) => {
        const label = document.createElement('label');
        label.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = radioGroupName;
        radio.value = idx;

        label.append(radio, document.createTextNode(opt.text));
        optionsDiv.append(label);
    });

    container.append(optionsDiv);

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'next-btn';
    nextBtn.textContent = questionIndex < questions.length - 1 ? 'Следующий вопрос' : 'Завершить тест';
    nextBtn.disabled = true;

    const radios = optionsDiv.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            nextBtn.disabled = false;
        });
    });

    nextBtn.addEventListener('click', () => {
        const selected = optionsDiv.querySelector(`input[name="${radioGroupName}"]:checked`);
        const selectedIdx = selected ? parseInt(selected.value) : -1;
        userAnswers.push({
            question: q,
            selectedIdx,
            isCorrect: selectedIdx >= 0 && q.options[selectedIdx].correct
        });
        questionIndex++;
        if (questionIndex < questions.length) {
            renderQuestion();
        } else {
            showResults();
        }
    });

    container.append(nextBtn);
    app.append(container);
}

function showResults() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const correctCount = userAnswers.filter(a => a.isCorrect).length;
    const total = userAnswers.length;

    // Заголовок
    const resultHeader = document.createElement('div');
    resultHeader.classList.add('result-header');
    resultHeader.innerHTML = `
        <h2>🎉 Тест завершён, ${userName}!</h2>
        <p class="score">Правильных ответов: <strong>${correctCount} из ${total}</strong></p>
        <p class="percent">Результат: <strong>${Math.round((correctCount / total) * 100)}%</strong></p>
    `;
    app.append(resultHeader);

    // Детализация по каждому вопросу (в том же порядке, как проходили!)
    const details = document.createElement('div');
    details.classList.add('results-details');

    userAnswers.forEach((ans, idx) => {
        const q = ans.question;
        const correctIdx = q.options.findIndex(opt => opt.correct);
        const selectedIdx = ans.selectedIdx;

        const qBlock = document.createElement('div');
        qBlock.classList.add('question-result');
        if (ans.isCorrect) {
            qBlock.classList.add('correct');
        } else {
            qBlock.classList.add('incorrect');
        }

        qBlock.innerHTML = `
            <h3 class="question-number">Вопрос ${idx + 1}</h3>
            <p class="question-text">${q.question}</p>
            <div class="options-result">
                ${q.options.map((opt, i) => {
                    let cls = 'option-result';
                    if (i === selectedIdx && i === correctIdx) {
                        cls += ' correct-selected'; 
                    } else if (i === selectedIdx) {
                        cls += ' wrong-selected';
                    } else if (i === correctIdx) {
                        cls += ' correct-answer';
                    }
                    return `<div class="${cls}">${opt.text}</div>`;
                }).join('')}
            </div>
            <p class="explanation"><strong>Пояснение:</strong> ${q.explanation}</p>
            <hr>
        `;
        details.append(qBlock);
    });

    app.append(details);

    const restartBtn = document.createElement('button');
    restartBtn.className = 'restart-button';
    restartBtn.textContent = 'Пройти тест снова';
    restartBtn.addEventListener('click', () => {
        const { form } = createElements();
        app.innerHTML = '';
        app.append(form);
    });
    app.append(restartBtn);
} 



window.addEventListener('DOMContentLoaded', () => {
    let app = document.getElementById('app');
    if (!app) {
        app = document.createElement('div');
        app.id = 'app';
        document.body.append(app);
    }

    const { form } = createElements();
    app.append(form);
});