connect2Server();

const main = document.querySelector("main");
const dialog = document.getElementById("obra-popup");

// Click a un obra
main.addEventListener("click", (e) => {
  const article = e.target.closest("article");
  if (!article) return;
  const id = article.dataset.id;
  const obra = lObras.find((o) => o.id == id);
  if (!obra) return;
  dialog.querySelector("img").src = obra.link;
  dialog.querySelector("img").alt = obra.título;
  dialog.querySelector("h2").textContent = obra.título;
  dialog.querySelector("h3").textContent = obra.año;
  const button = dialog.querySelector("div");
  button.querySelector("span").textContent = obra.enColección
    ? "Sacar de Colección"
    : "Agregar a Colección";
  button.onclick = () => {
    obra.enColección = !obra.enColección;
    postEvent(
      "modificarColección",
      {
        id: obra.id,
        enColección: obra.enColección,
      },
      (response) => {
        if (response) {
          getCollection();
          dialog.close();
        }
      }
    );
  };
  dialog.showModal();
});

// Cerrar popup al clickear fuera
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    dialog.close();
  }
});

let lObras = [];

const getCollection = () => {
  getEvent("obrasColección", (obras) => {
    // Set enColección to true for each obra in obras
    obras.forEach((obra) => (obra.enColección = true));
    lObras = obras;
    main.innerHTML = "";
    // Remove empty class from main and add grid class
    main.classList.remove("empty");
    main.classList.add("grid");
    for (let obra of obras) {
      const article = document.createElement("article");
      article.classList.add("card");
      article.dataset.id = obra.id;
      article.innerHTML = `
      <img src="${obra.link}" alt="${obra.título}" />
      <div class="info">
        <h2>${obra.título}</h2>
        <span>${obra.año}</span>
      </div>
    `;
      main.appendChild(article);
    }
  });
};
getCollection();
