function submitForm(event) {
    event.preventDefault();
    let form = document.querySelector("form").elements;
    console.log(form);

    fetch('/add-article', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify({
            "title": form[0].value,
            "text": form[1].value,
        })
    })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
}

document.querySelector("form").addEventListener("submit", submitForm);
