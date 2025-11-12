function createElements(){

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
    if (value) {
      button.classList.add('active');
      button.disabled = false;
    } else {
      button.classList.remove('active');
      button.disabled = true;
    }
  });

//   button.addEventListener('click', (e) => {
//     e.preventDefault(); 
//   });

form.append(nameInput)
form.append(button)

 return{
    form,
    nameInput,
    button
}
}

const { form } = createElements();
document.body.append(form);

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function createQuestons() {

    const questions = [
        {
            question: 'Спутником какой планеты является Каллисто?',
            image: '',
            option: [
                { text: 'Венера', correct: 'false' },
                { text: 'Юпитер', correct: 'true' },
                { text: 'Марс', correct: 'false' },
                { text: 'Нептун', correct: 'false' }
            ]
        },
        {
            question: 'Что из списка не является галактикой?',
            image: '',
            option: [
                { text: 'Андромеда', correct: 'false' },
                { text: 'Магелланово Облако', correct: 'false' },
                { text: 'Альдебаран', correct: 'true' },
                { text: 'Млечный Путь', correct: 'false' }
            ]
        },
        {
            question: 'Что такое «Солнечный ветер»?',
            image: '',
            option: [
                { text: 'Поток супер-ионизированных частиц из солнечной короны', correct: 'true' },
                { text: 'Взрывной процесс выделения энергии в атмосфере Солнца', correct: 'false' },
                { text: 'Внешние слои атмосферы Солнца', correct: 'false' },
                { text: 'Периодическое изменение магнитного поля Солнца', correct: 'false' }
            ]
        },
        {
            question: 'Звёздами какого созвездия являются Сегин, Рукбах, Нави, Шедар и Каф?',
            image: '',
            option: [
                { text: 'Большая медведица', correct: 'false' },
                { text: 'Кассиопея', correct: 'true' },
                { text: 'Гончие псы', correct: 'false' },
                { text: 'Капелла', correct: 'false' }
            ]
        },
        {
            question: 'Что такое «Астеризм»?',
            image: '',
            option: [
                { text: 'Группа звёзд, образующая узнаваемый узор', correct: 'true' },
                { text: 'Официально признанное созвездие', correct: 'false' },
                { text: 'Взрыв звезды в конце её жизни', correct: 'false' },
                { text: 'Скопление газа и пыли в космосе', correct: 'false' }
            ]
        }]
    return shuffleArray(questions);
}
