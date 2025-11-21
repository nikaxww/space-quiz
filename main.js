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
            image: '',
            options: [
                { text: 'Венера', correct: 'false' },
                { text: 'Юпитер', correct: 'true' },
                { text: 'Марс', correct: 'false' },
                { text: 'Нептун', correct: 'false' }
            ]
        },
        {
            question: 'Что из списка не является галактикой?',
            image: '',
            options: [
                { text: 'Андромеда', correct: 'false' },
                { text: 'Магелланово Облако', correct: 'false' },
                { text: 'Альдебаран', correct: 'true' },
                { text: 'Млечный Путь', correct: 'false' }
            ]
        },
        {
            question: 'Что такое «Солнечный ветер»?',
            image: '',
            options: [
                { text: 'Поток супер-ионизированных частиц из солнечной короны', correct: 'true' },
                { text: 'Взрывной процесс выделения энергии в атмосфере Солнца', correct: 'false' },
                { text: 'Внешние слои атмосферы Солнца', correct: 'false' },
                { text: 'Периодическое изменение магнитного поля Солнца', correct: 'false' }
            ]
        },
        {
            question: 'Звёздами какого созвездия являются Сегин, Рукбах, Нави, Шедар и Каф?',
            image: '',
            options: [
                { text: 'Большая медведица', correct: 'false' },
                { text: 'Кассиопея', correct: 'true' },
                { text: 'Гончие псы', correct: 'false' },
                { text: 'Капелла', correct: 'false' }
            ]
        },
        {
            question: 'Что такое «Астеризм»?',
            image: '',
            options: [
                { text: 'Группа звёзд, образующая узнаваемый узор', correct: 'true' },
                { text: 'Официально признанное созвездие', correct: 'false' },
                { text: 'Взрыв звезды в конце её жизни', correct: 'false' },
                { text: 'Скопление газа и пыли в космосе', correct: 'false' }
            ]
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
        const isCorrect = selectedIdx >= 0 && q.options[selectedIdx].correct === 'true';
        userAnswers.push({ questionIndex, selectedIdx, isCorrect });
        questionIndex++;
        if (questionIndex < questions.length) {
            renderQuestion();
        } else {
            container.innerHTML = '<h2>Тест завершён.</h2><p>Спасибо за участие!</p>';
        }
    });

    container.append(nextBtn);
    app.append(container);
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