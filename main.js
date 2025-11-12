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

