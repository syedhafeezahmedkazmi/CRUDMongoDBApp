// window.createPost = function () {
//     let title = document.querySelector('#title').value
//     let text = document.querySelector('#text').value
//     // event.preventDefault()
//     axios.post('/api/v1/mongoDB/post',{
//         title: title,
//         text: text
//     })
//     .then(function (response){
//         console.log(response)
//         // document.querySelector('#displayData').innerHTML = response
//         // getAllPosts()

// import { text } from "express";


//     })
//     .catch(function (error){
//         console.log(error)
//         alert('Error in post submission.')
//     })
// }

document.querySelector('#form1').addEventListener("submit", function (event) {
    event.preventDefault();

    let title = document.querySelector('#title').value
    let text = document.querySelector('#text').value
    // event.preventDefault()
    axios.post('/api/v1/mongoDB/post', {
        title: title,
        text: text
    })
        .then(function (response) {
            // const responseData = JSON.parse(response.data)
            // console.log(response);
            // document.querySelector('#displayData').innerHTML = response.data
            getAllPosts()
        })
        .catch(function (error) {
            console.log("err",error);
            alert('Error in post submission.');
        });
})


window.getAllPosts = () => {
    axios.get('/api/v1/mongoDB/posts')
        .then(function (response) {
            // console.log(response.data);
            let showPosts = "";
            response.data.map((eachPost) => {
                // console.log(eachPost)
                showPosts +=
                    `
            <div id="card-${eachPost._id}">  
            <h3>${eachPost.title}</h3>
            <p>${eachPost.text}</p>
            <button onclick="editPost('${eachPost._id}','${eachPost.title}','${eachPost.text}')">Edit</button>
            <button onclick="delPost('${eachPost._id}')">Delete</button>
            </div>
            <br>
             `;
            });
            document.querySelector('#displayPosts').innerHTML = showPosts;
        })
        .catch(function (error) {
            console.log(error);
            alert("Something went wrong");
        });
}


window.delPost = function (postId) {
    axios.delete(`api/v1/mongoDB/post/${postId}`)
    .then(function (response){
        getAllPosts()
    })
    .catch(function (error){
        console.log(error)
        alert('Error in data deleting.')
    })
}


window.editPost = function(postId , title , text) {
    console.log("_id: ",postId , "title: ",title, "text: ",text)
    document.querySelector(`#card-${postId}`).innerHTML = 
    `
    <form onsubmit="save('${postId}')">
    <label>Title: </label><input type="text" name="" id="title-${postId}" value="${title}"><br>
    <label>Text: </label><textarea name="" id="text-${postId}" cols="30" rows="10" value="">${text}</textarea><br>
    <button>Save</button>
    </form>
    
    `
    // console.log()
}


window.save = function(postId) {
    // console.log(postId)
    const updatedTitle = document.querySelector(`#title-${postId}`).value;
    const updatedText= document.querySelector(`#text-${postId}`).value;
    // console.log(updatedTitle)
    axios.put(`/api/v1/mongoDB/post/${postId}`,{
        title: updatedTitle,
        text: updatedText
    })
    .then(function (response){
        console.log(response.data)
    })
    .catch(function (error){
        console.log(error)
        alert('Error in post submission.')
    })
}

getAllPosts()