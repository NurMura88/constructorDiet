const logForm = document.querySelector("#logForm");

logForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log(logForm);

  const email = logForm.email.value;
  const password = logForm.password.value;

  const res = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  console.log(res.status);
  if (res.status !== 200) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Пользователя с таким эл.адрес не существует",
    });
  } else {
    window.location = "/constructor";
  }
});
