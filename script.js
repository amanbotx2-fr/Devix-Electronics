document.addEventListener("DOMContentLoaded", function () {
  const toggleCheckbox = document.querySelector(".bb8-toggle__checkbox");

  if (!toggleCheckbox) {
    console.error("BB-8 toggle checkbox not found.");
    return;
  }

  toggleCheckbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");

    // Save preference
    const theme = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);
  });

  // Apply saved theme on load
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggleCheckbox.checked = true;
  }
});
