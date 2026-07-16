function showToast(message) {
  const root = document.getElementById("toastRoot");
  root.innerHTML = `<div class="toast">${message}</div>`;
  setTimeout(() => {
    root.innerHTML = "";
  }, 2500);
}

function appRender() {
  const customerView = document.getElementById("customerView");
  const adminView = document.getElementById("adminView");
  const customerBtn = document.getElementById("customerModeBtn");
  const adminBtn = document.getElementById("adminModeBtn");

  if (window.appState.mode === "customer") {
    customerView.classList.remove("hidden");
    adminView.classList.add("hidden");
    customerBtn.classList.add("active");
    adminBtn.classList.remove("active");
    Customer.render();
  } else {
    customerView.classList.add("hidden");
    adminView.classList.remove("hidden");
    customerBtn.classList.remove("active");
    adminBtn.classList.add("active");
    Admin.render();
  }
}

window.appState = {
  mode: "customer"
};

document.addEventListener("DOMContentLoaded", () => {
  Storage.load();

  document.getElementById("customerModeBtn").addEventListener("click", () => {
    window.appState.mode = "customer";
    appRender();
  });

  document.getElementById("adminModeBtn").addEventListener("click", () => {
    window.appState.mode = "admin";
    appRender();
  });

  appRender();
});