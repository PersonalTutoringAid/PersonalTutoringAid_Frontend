document.addEventListener("DOMContentLoaded", function() {
  const contentArea = document.getElementById("content-area");
  const navTitle = document.getElementById("nav-title");
  const links = document.querySelectorAll(".sidebar a");
  const mainButton = document.getElementById("main-button");

  function loadPage(page) {
    fetch(`./${page}.html`)
      .then(response => response.text())
      .then(html => {
        contentArea.innerHTML = html;

        const pageTitleElement = document.querySelector(
          `[data-page="${page}"]`
        );
        sidebar.classList.remove("active");
        if (pageTitleElement) {
          navTitle.textContent = pageTitleElement.textContent;
        } else {
          navTitle.textContent = "내 오답노트";
        }

        document.removeEventListener("click", handleClick);

        document.addEventListener("click", handleClick);

        const scripts = contentArea.querySelectorAll("script");
        scripts.forEach(oldScript => {
          const newScript = document.createElement("script");
          newScript.text = oldScript.text;
          document.body.appendChild(newScript);
        });
      })
      .catch(error => console.error("Error loading the page:", error));
  }

  links.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const page = link.getAttribute("data-page");
      history.pushState({ page }, "", `${page}.html`);
      loadPage(page);
    });
  });

  mainButton.addEventListener("click", function() {
    const page = "my_review_notes";
    history.pushState({ page }, "", `${page}.html`);
    loadPage(page);
  });

  const initialPage = "my_review_notes";
  loadPage(initialPage);
});

function handleClick(event) {
  if (event.target.closest(".add-generator")) {
    console.log("추가 버튼 클릭됨");
    const container = document.querySelector(".generator-container");

    const newSelection = document.createElement("div");
    newSelection.classList.add("select-group");
    newSelection.innerHTML = `
          <div class="select-item">
              <label>문제집 선택</label>
              <select>
                  <option>문제집 1</option>
                  <option>문제집 2</option>
              </select>
          </div>

          <div class="select-item">
              <label>대단원 선택</label>
              <select>
                  <option>지수 로그</option>
                  <option>삼각함수</option>
                  <option>수열</option>
              </select>
          </div>

              <div class="select-item">
      <label>소단원 선택</label>
      <select>
        <option>Step 1</option>
        <option>Step 2</option>
        <option>Step 3</option>
      </select>
    </div>

          <div class="select-item">
              <label>문제 번호 입력</label>
              <input type="text" placeholder="1, 2, 3...">
          </div>
      `;

    container.appendChild(newSelection);
  }
}
