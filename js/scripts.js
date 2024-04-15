const url = "https://jsonplaceholder.typicode.com/posts";
const loadingElement = document.querySelector("#loading")
const postsContainer = document.querySelector("#posts-container")
const urlSearchParams = new URLSearchParams(window.location.search)
const postId = urlSearchParams.get("id")
const postPage = document.querySelector("#post")
const postContainer = document.querySelector("#post-container")
const commentsContainer = document.querySelector("#comments-container")

//Pegar todos os post
async function getAllPosts(){
    const response = await fetch(url)
    const posts = await response.json()
    console.log(posts)
    loadingElement.classList.add("hide")
    posts.map((post) =>{
        const div = document.createElement("div")
        const title = document.createElement("h2")
        const body = document.createElement("p")
        const link = document.createElement("a")
        title.innerText = post.title
        body.innerText = post.body
        link.innerText = "Ler"
        link.setAttribute("href", `/post.html?id=${post.id}`)
        div.appendChild(title)
        div.appendChild(body)
        div.appendChild(link)
        postsContainer.appendChild(div)
    })
}

//Pegar só um post
async function getPost(id){
    const [responsePost, responseComments] = await Promise.all([
        fetch(`${url}/${id}`),
        fetch(`${url}/${id}/comments`)
    ])
    const dataPost = await responsePost.json()
    const dataComments = await responseComments.json()
    loadingElement.classList.add("hide")
    postPage.classList.remove("hide")
    const title = document.createElement("h1")
    const body = document.createElement("p")
    title.innerText = dataPost.title
    body.innerText= dataPost.body
    postContainer.appendChild(title)
    postContainer.appendChild(body)
    dataComments.map((comment) => {
        createComment(comment)

    })
}
    function createComment(comment) {
        const div = document.createElement("div")
        const email = document.createElement("h3")
        const commentBody = document.createElement("p")
        email.innerText = comment.email
        commentBody.innerText = comment.body
        div.appendChild(email)
        div.appendChild(commentBody)
        commentsContainer.appendChild(div)
        
    }
if (!postId){
    getAllPosts()
}
else{
    getPost(postId)
    
}