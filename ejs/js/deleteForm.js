function submitForm(event) {
    event.preventDefault();
    let form = document.querySelector("form").elements;
    console.log(form);

    const id = getIdFromPath(window.location.href);

    fetch('/articles/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.status)
        .then(response => {
            console.log(response);
            window.location.href = "http://localhost:3000/articles";
        })
}

document.querySelector("form").addEventListener("submit", submitForm);

function getIdFromPath(path){
    let part = path.split("/");
    return part[part.length - 1];
}
