(function() {
  const form   = document.getElementById("my-form");
  const status = document.getElementById("my-form-status");

  async function handleSubmit(event) {
    event.preventDefault();
    status.textContent = "Sending…";

    const data = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        status.textContent = "Thanks for your submission!";
        form.reset();
      } else {
        const json = await res.json();
        status.textContent = json.errors 
          ? json.errors.map(err => err.message).join(", ")
          : "Oops! There was a problem submitting your form.";
      }
    } catch (err) {
      status.textContent = "Network error. Please try again later.";
    }
  }

  form.addEventListener("submit", handleSubmit);
})();