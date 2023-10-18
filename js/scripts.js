// LOGIN 
// Captura os elementos do form
const formLogin = document.getElementById("form-login")
const emailInput = document.getElementById("email-login")
const passwordInput = document.getElementById("password-login")

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault()

  const emailValue = emailInput.value
  const passwordValue = passwordInput.value

  const data = {
    email: emailValue,
    password: passwordValue
  }

  try {
    const response = await api.post("/users/login", data)

    if (response.status === 200) {
      const userData = response.data
      localStorage.setItem("userId", userData.userId)

      const successAlert = document.getElementById("success-alert-login")

      successAlert.classList.remove("d-none")

      setTimeout(() => {
        window.location.href = "/notes.html"
      }, 3000)
    }
  } catch (error) {
    console.log("Erro:", error)
  }
})

// SIGNUP
// Captura os elementos do form
const formSignup = document.getElementById("form-signup")
const nameInputSignup = document.getElementById("name")
const emailInputSignup = document.getElementById("email")
const passwordInputSignup = document.getElementById("password")
const rePasswordInputSignup = document.getElementById("re-password")

formSignup.addEventListener("submit", async (e) => {
  e.preventDefault()

  const nameValue = nameInputSignup.value
  const emailValue = emailInputSignup.value
  const passwordValue = passwordInputSignup.value
  const rePasswordValue = rePasswordInputSignup.value

  if (passwordValue !== rePasswordValue) {
    const errorAlert = document.getElementById("error-alert")
    errorAlert.textContent = "As senhas não coincidem. Por favor, digite as senhas novamente."

    errorAlert.classList.remove("d-none")

    // Limpar os campos após senhas não coincidirem
    passwordInputSignup.value = ""
    rePasswordInputSignup.value = ""
  } else {
    const errorAlert = document.getElementById("error-alert")
    errorAlert.classList.add("d-none")

    const newUser = {
      name: nameValue,
      email: emailValue,
      password: passwordValue
    }

    try {
      const response = await api.post("/users/signup", newUser)

      if (response.status === 201) {
        const successAlert = document.getElementById("success-alert-signup")

        successAlert.classList.remove("d-none")

        setTimeout(() => {
          window.location.href = "/index.html"
        }, 3000)
      }
    } catch (error) {
      const errorAlert = document.getElementById("error-alert")

      if (error.response && error.response.data && error.response.data.message) {
        errorAlert.textContent = `Erro ao cadastrar usuário: ${error.response.data.message}`
      } else {
        errorAlert.textContent = "Erro ao cadastrar usuário. Por favor, tente novamente."
      }

      errorAlert.classList.remove("d-none")
      console.log("Erro ao cadastrar usuário", error)
    }
  }
})

  // VALIDATION
  (() => {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
  })()