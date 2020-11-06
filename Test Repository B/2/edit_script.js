let id = window.location.search.replace("?picture_id=", "")

document.getElementById("id").value = id

$("#rm_btn").on("click", (event) => {
    document.getElementById('id01').style.display = 'block'
    console.log('click')
})

$("#rm_btn_modal").on("click", (event) => {
    $.post('/delete_picture', {delete_picture_id: id}, function (response) {
        if (response.ok) {
            document.location.href = "/list";
        }
    });
})