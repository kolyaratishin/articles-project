function submitForm(event) {
    event.preventDefault();
    let form = document.querySelector("form").elements;
    console.log(form);

    const id = getIdFromPath(window.location.href);

    fetch('/articles/' + id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify({
            "title": form[0].value,
            "text": form[1].value,
        })
    })
        .then(response => response.json())
        .then(response => {
            console.log(JSON.stringify(response));
            window.location.href = "http://localhost:3000/articles";
        });
}

document.querySelector("form").addEventListener("submit", submitForm);

function getIdFromPath(path){
    let part = path.split("/");
    return part[part.length - 1];
}
