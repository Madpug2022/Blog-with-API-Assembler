const apiPost = "https://jsonplaceholder.typicode.com/posts";
const postsBody = document.querySelector("#postsBody");
fetch(apiPost)
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            const post = document.createElement("div");
            post.classList.add("col-10");

            const postModal = document.createElement("button");
            postModal.classList.add("btn");
            postModal.classList.add("btn-outline-dark");
            postModal.setAttribute("data-bs-toggle", "modal");
            postModal.setAttribute("data-bs-target", "#modal");
            postModal.textContent = element.title;
            post.appendChild(postModal);

            const postCol1 = document.createElement("div");
            postCol1.classList.add("col");


        })
    });
