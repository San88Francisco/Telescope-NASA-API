
const userContant = document.getElementById('user-contant')
const exitUser = document.getElementById('exit-user')
const userBtn = document.getElementById('user-btn')
const userValue = document.getElementById('user-value')

const registrationBtn = document.querySelector('.registration-btn')
const registerForm = document.getElementById('register-form')

const signInBtn = document.querySelector('.sign-in-btn')
const logInForm = document.getElementById('log-in-form')


//* Вихід з меню user

function onBlock0None() {
   userContant.style.opacity = '0'
   setTimeout(() => {
      userContant.style.display = 'none'
   }, 500);
}

function onBlockFlex1(form) {
   form.style.display = 'flex'
      setTimeout(() => {
         form.style.opacity = '1'
      }, 200);
}


exitUser.addEventListener('click', () => {
   onBlock0None()
})

//* Вхід в меню user
userBtn.addEventListener('click', () => {
   userContant.style.display = 'block'
   setTimeout(() => {
      userContant.style.opacity = '1'
   }, 400);
})

registrationBtn.addEventListener('click', () => {
   logInForm.style.opacity = '0'
   setTimeout(() => {
      logInForm.style.display = 'none'

      onBlockFlex1(registerForm)
   }, 300);
})

signInBtn.addEventListener('click', () => {
   registerForm.style.opacity = '0'
   setTimeout(() => {
      registerForm.style.display = 'none'

      onBlockFlex1(logInForm)
   }, 300);
})




class User {
   constructor(name, surname, email, password, confirmPassword) {
      this.name = name;
      this.surname = surname;
      this.email = email;
      this.password = password;
      this.confirmPassword = confirmPassword;
   }
   register() {
      if (this.name.length < 1) {
         alert(`Поле 'Ім'я користувача' повинно містити хоча б один символ`)
         return
      }
      if (this.surname.length < 1) {
         alert(`Поле 'Прізвище користувача' повинно містити хоча б один символ`)
         return
      }
      if (this.email.length < 1) {
         alert(`Поле 'Email' є обов'язковим`)
         return
      }
      if (this.password.length < 6) {
         alert(`Пароль повинен бути довжиною від 6 символів`)
         return
      }
      if (this.confirmPassword !== this.password) {
         alert(`Підтвердження пароля не співпадає з паролем`)
         return
      }


      console.log(this);
      localStorage.setItem(this.email, JSON.stringify(this))
      console.log('Вітаємо');
      return true
   }
}

const registerSubmitBtn = document.getElementById('register-submit-btn')

//* Реєстрація
registerForm.addEventListener('submit', (event) => {
   event.preventDefault();

   const name = document.getElementById('name').value;
   const surname = document.getElementById('surname').value;
   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;
   const confirmPassword = document.getElementById('confirmPassword').value;

   const user = new User(name, surname, email, password, confirmPassword);

   if (user.register()) {
      registerForm.style.opacity = '0';
      setTimeout(() => {
         registerForm.style.display = 'none';

         onBlockFlex1(logInForm)
      }, 300);
   }
});

logInForm.addEventListener('submit', (event) => {
   event.preventDefault();

   const emailLog = document.getElementById('emailLog').value
   const passwordLog = document.getElementById('passwordLog').value

   const userData = localStorage.getItem(emailLog)
   console.log('✌️userData --->', userData);

   if (userData) {
      const user = JSON.parse(userData)
      console.log('✌️user --->', user);

      if (user.password === passwordLog) {
         alert(`Вхід успішний.`)
         userValue.textContent = ` ${user.name}`

         onBlock0None()
      } else {
         alert('Не вірний пароль')
      }
   } else {
      alert(`Користувача з таким email: ${logInEmail} не існує`)
   }
})