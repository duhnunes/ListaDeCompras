const newItemInput = document.getElementById('newItem');
const clearInputBtn = document.getElementById('clearInput');
const itemContainer = document.getElementById('itemContainer');
const form = document.querySelector('form');

let items = JSON.parse(localStorage.getItem('items')) || [];

function checkInput() {
  newItemInput.addEventListener('input', () => {
    if(newItemInput.value.trim() !== "") {
      clearInputBtn.style.display = 'block';
    } else {
      clearInputBtn.style.display = 'none';
    }
  })
}

function handleInvalidInput() {
  const small = document.querySelector('.input small');
  newItemInput.setAttribute('class', 'error');
  small.style.visibility = 'visible';
  newItemInput.focus();

  newItemInput.addEventListener('input', () => {
    newItemInput.removeAttribute('class');
    small.style.visibility = 'hidden';
  })
}

function handleSubmitInput() {
  const value = newItemInput.value;

  if(value === "") {
    handleInvalidInput();
  } else {
    items.push(value);
    newItemInput.value = "";
    newItemInput.focus();
    addItemToDOM(value);
    clearInputBtn.style.display = 'none';
  
    localStorage.setItem('items', JSON.stringify(items));
  }
}
function clearInput() {
  newItemInput.value = "";
  newItemInput.focus();
  clearInputBtn.style.display = 'none';
}
function addItemToDOM(value) {
  const label = document.createElement('label');
  label.className = 'item';

  const input = document.createElement('input');
  input.type = 'checkbox';
  const icon = document.createElement('i');
  icon.className = 'alert-icon';
  label.appendChild(icon);
  icon.style.display = 'none';

  const span = document.createElement('span');
  span.textContent = value;

  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('data-variant', 'trash');
  button.innerHTML = '<i class="trash"></i>';
  button.addEventListener('click', () => {
    label.animate([
      { transform: 'rotate3d(1, 0, 0, 0deg)' },
      { transform: 'rotate3d(1, 0, 0, 360deg)' }
    ], {
      duration: 800,
    })
    label.className = 'alert';
    input.style.display = 'none';
    icon.style.display = 'block';
    button.style.visibility = 'hidden';
    items = items.filter(item => item !== value);
    localStorage.setItem('items', JSON.stringify(items));

    setTimeout(() => {
      itemContainer.removeChild(label);
      
    }, 2500)
  });

  label.appendChild(input);
  label.appendChild(span);
  label.appendChild(button);

  if(itemContainer.firstChild){
    itemContainer.insertBefore(label, itemContainer.firstChild);
  } else {
    itemContainer.appendChild(label);
  }
}

checkInput();
items.forEach(item => addItemToDOM(item));


form.onsubmit = (e) => {
  e.preventDefault();
  handleSubmitInput();
}

clearInputBtn.addEventListener('click', clearInput);
