const regForm = document.querySelector("#regForm");

regForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log(regForm);

  const username = regForm.username.value;
  const email = regForm.email.value;
  const password = regForm.password.value;

  const res = await fetch("/registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });
  console.log(res.status);
  if (res.status !== 200) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Пользователь с таким эл.адресом уже существует",
    });
  } else {
    window.location = "/";
  }
});
