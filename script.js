// ! SELECTORS
const apiPost = "http://localhost:3000/posts";
const postsBody = document.querySelector("#postsBody");
const loadCommentsBtn = document.querySelector("#loadCommentsBtn");
const saveChangesBtn = document.querySelector("#saveChangesBtn");
let elementNumber = 0;
let targetToChange = undefined;
let pickedPost = undefined;
// ! FETCHING
fetch(apiPost)
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            elementNumber++;
            const postRow = document.createElement("div");
            postRow.classList.add("row");
            postRow.setAttribute("data-elementNumber", elementNumber);
            postsBody.appendChild(postRow);

            const post = document.createElement("div");
            post.classList.add("col-10");

            const postModal = document.createElement("button");
            postModal.classList.add("btn");
            postModal.classList.add("btn-outline-dark");
            postModal.setAttribute("type", "button");
            postModal.setAttribute("data-bs-toggle", "modal");
            postModal.setAttribute("data-bs-target", "#modal");
            postModal.setAttribute("data-id", element.id);
            postModal.setAttribute("data-userId", element.userId);
            postModal.setAttribute("id", "openPost");
            postModal.setAttribute("data-element", elementNumber);
            postModal.addEventListener("click", (event) => {
                deleteComents();
                loadCommentsBtn.classList.remove("disabled");
                const id = postModal.dataset.id;
                const userId = event.target.getAttribute("data-userId");
                const modalTittle = document.querySelector("#modalLabel");
                const modalBody = document.querySelector("#modalBody");
                const user = document.querySelector("#user");
                const userName = document.querySelector("#userName");
                const userEmail = document.querySelector("#userEmail");
                loadCommentsBtn.setAttribute("data-userId", userId);
                pickedPost = event.currentTarget.getAttribute("data-element");
                console.log(pickedPost);
                fetch(`http://localhost:3000/posts?id=${id}`)
                    .then(response => response.json())
                    .then(data => {
                        modalTittle.innerText = data[0].title;
                        modalBody.innerText = data[0].body;
                    })
                fetch(`http://localhost:3000/users/${userId}`)
                    .then(response => response.json())
                    .then(users => {
                        user.innerText = users.name;
                        userName.innerText = users.username;
                        userEmail.innerText = users.email;
                    })
                })
            postModal.textContent = element.title;
            post.appendChild(postModal);

            postRow.appendChild(post);

            const postCol1 = document.createElement("div");
            postCol1.classList.add("col");

            const postCol1Btn = document.createElement("button");
            postCol1Btn.classList.add("btn");
            postCol1Btn.classList.add("btn-dark");
            postCol1Btn.setAttribute("type", "button");
            postCol1Btn.setAttribute("data-bs-toggle", "modal");
            postCol1Btn.setAttribute("data-bs-target", "#editorModal");
            postCol1Btn.setAttribute("data-elementNumber", elementNumber);
            postCol1Btn.setAttribute("data-userId", element.userId);
            postCol1Btn.addEventListener("click", (event) => {
                targetToChange = event.currentTarget.getAttribute("data-elementNumber");
                console.log(targetToChange);
                const modalEditTitle = document.querySelector("#modalEditTitle");
                modalEditTitle.textContent = postModal.textContent;

            });

            postCol1.appendChild(postCol1Btn);

            const postCol1BtnIcon = document.createElement("i");
            postCol1BtnIcon.classList.add("fa-regular");
            postCol1BtnIcon.classList.add("fa-pen-to-square");
            postCol1Btn.appendChild(postCol1BtnIcon);

            postRow.appendChild(postCol1);

            const postCol2 = document.createElement("div");
            postCol2.classList.add("col");

            const postCol2Btn = document.createElement("button");
            postCol2Btn.classList.add("btn");
            postCol2Btn.classList.add("btn-dark");
            postCol2Btn.setAttribute("data-elementNumber", elementNumber);
            postCol2Btn.setAttribute("type", "button");
            postCol2Btn.addEventListener("click", (event) => {
                const targetElement = event.currentTarget.getAttribute("data-elementNumber");
                const elementToDelete = document.querySelector(`[data-elementNumber="${targetElement}"]`);
                if (elementToDelete) {
                    elementToDelete.remove();
                    alert("Element removed correctly!")
                }
            });

            postCol2.appendChild(postCol2Btn);

            const postCol2BtnIcon = document.createElement("i");
            postCol2BtnIcon.classList.add("fa-regular");
            postCol2BtnIcon.classList.add("fa-circle-xmark");
            postCol2Btn.appendChild(postCol2BtnIcon);

            postRow.appendChild(postCol2);

            const separator = document.createElement("hr");
            separator.classList.add("my-2");
            postRow.appendChild(separator);
        })

    });
// ! FUNCTIONS
function deleteComents() {
    const commentSection = document.querySelector("#commentSection");
    while (commentSection.firstChild) {
        commentSection.removeChild(commentSection.firstChild);
    }
    }
function loadComments(data){
    const commentSection = document.querySelector("#commentSection");
    data.forEach(element => {
                const commentRow = document.createElement("div");
                commentRow.classList.add("row");

                const commentName = document.createElement("p");
                commentName.innerText= element.name;
                commentRow.appendChild(commentName);

                const commentsEmail = document.createElement("p");
                commentsEmail.innerText= element.email;
                commentRow.appendChild(commentsEmail);

                const comment = document.createElement("p");
                comment.innerText= element.body;
                commentRow.appendChild(comment);

                const separator = document.createElement("hr");
                separator.classList.add("my-1");
                commentRow.appendChild(separator);

                commentSection.appendChild(commentRow);
    })
};
function saveChanges(targetToChange) {
    const inputField = document.getElementById("changeTitle");
    const newTittle = inputField.value;
    const element = document.querySelector(`[data-element="${targetToChange}"]`);
    if (element) {
        element.innerText = newTittle;
        inputField.value = ''
    }
};
function edit(targetToChange) {
    const inputField = document.getElementById("changeTitle");
    const newTittle = inputField.value;
    fetch(`http://localhost:3000/posts/${targetToChange}`, {
    method: 'PATCH',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    title: newTittle
    })
})
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error(error);
});
inputField.value = ''

}
// ! EVENT LISTENERS
loadCommentsBtn.addEventListener("click", () => {
                fetch(`http://localhost:3000/comments?postId=${pickedPost}`)
                    .then(response => response.json())
                    .then(comments => {
                        loadComments(comments);
                        loadCommentsBtn.classList.add("disabled");
                    });
});
saveChangesBtn.addEventListener("click", (event) => {
    event.preventDefault();
    edit(targetToChange);
    alert('The element was modified successfully');
})

// ? TESTING ZONE
