const form = document.getElementById('form');
const nameInput = document.getElementById('username');
const surnameInput = document.getElementById('surname');
const passInput = document.getElementById('password');
const emailInput = document.getElementById('email');
// username
const checkUsername = () => {
  let valid = false;
  const min = 3;
  const max = 25;

  const username = nameInput.value.trim();

  if (!isEmpty(username)) {
    showError(nameInput, 'El nombre es obligatorio');
  } else if (!isBetween(username.length, min, max)) {
    showError(
      nameInput,
      `El nombre debe tener entre ${min} y ${max} caracteres`
    );
  } else {
    showSuccess(nameInput);
    valid = true;
  }
  
  return valid;
};

const checkSurname = () => {
  let valid = false;
  const min = 3;
  const max = 25;

  const surname = surnameInput.value.trim();

  if (!isEmpty(surname)) {
    showError(surnameInput, 'Tu apellido es obligatorio');
  } else if (!isBetween(surname.length, min, max)) {
    showError(
      surnameInput,
      `Tu apellido debe tener entre ${min} y ${max} caracteres`
    );
  } else {
    showSuccess(surnameInput);
    valid = true;
  }
  
  return valid;
};

// email
const checkEmail = () => {
  let valid = false;
  const emailValue = emailInput.value.trim();
  if (!isEmpty(emailValue)) {
    showError(emailInput, 'El email es obligatorio');
  } else if (!isEmailValid(emailValue)) {
    showError(emailInput, 'El email no es valido');
  } else {
    showSuccess(emailInput);
    valid = true;
  }
  
  return valid;
};

// password
const checkPassword = () => {
  let valid = false;
  const password = passInput.value.trim();
  if (!isEmpty(password)) {
    showError(passInput, 'La contraseña es obligatoria');
  } else if (!isPassSecure(password)) {
    showError(
      passInput,
      'La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un simbolo'
    );
  } else {
    showSuccess(passInput);
    valid = true;
  }
  
  return valid;
};


const isEmpty = value => (value === '' ? false : true);

const isBetween = (length, min, max) =>
length < min || length > max ? false : true;

const isEmailValid = email => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return re.test(email);
};

const isPassSecure = pass => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
  return re.test(pass);
};

// error
const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove('success');
  formField.classList.add('error');
  const error = formField.querySelector('small');
  error.textContent = message;
};

// success

const showSuccess = input => {
  const formField = input.parentElement;
  formField.classList.remove('error');
  formField.classList.add('success');
  const error = formField.querySelector('small');
  error.textContent = '';
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  let isUsernameValid = checkUsername();
  let isEmailValid = checkEmail();
  let isPasswordValid = checkPassword();
  let isSurnameInput = checkSurname();
  
  console.log(isUsernameValid, isEmailValid, isPasswordValid, isSurnameInput);
  
  let isFormValid =
  isUsernameValid && isEmailValid && isPasswordValid && isSurnameInput;
  
  if (isFormValid) {
    alert('Exito');
    form.submit();
  }
});


const debounce = (fn, delay = 300) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  'input',
  debounce(e => {
    switch (e.target.id) {
      case 'username':
        checkUsername();
        break;
        case 'surname':
          checkSurname();
          break;
      case 'email':
        checkEmail();
        break;
      case 'password':
        checkPassword();
        break;
    }
  })
);