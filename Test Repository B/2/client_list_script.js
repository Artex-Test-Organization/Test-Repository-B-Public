let p = 0
let client_id = 0

function getShortString(number) {
    if (number >= 1000000) {
        return `Balance: ${number / 1000000} mln $`
    }
    if (number >= 1000) {
        return `Balance: ${number / 1000} thds $`
    }
    return `Balance: ${number} $`
}

$.get("/clients_list",{}).done((clients)=>{
    for (let client of clients){
        let i = client.user_id
        $("#client_card_" + i).on("click", (event) => {
            if (document.getElementById('id01').style.display==='none') {
                document.location.href = "/edit_client?user_id="+i;
            }
        })

        $("#rm_btn_" + i).on("click", (event) => {
            p = $("#rm_btn_" + i).parent();
            client_id = i;
            document.getElementById('id01').style.display='block'
        })

        let balance = $("#balance_" + i).text()
        $("#balance_" + i).text(getShortString(balance))

    }
})

$("#rm_btn").on("click",(event) =>{
    document.getElementById('id01').style.display='none'
    p.fadeOut(function () {
        p.remove();
    });
    $.post('/delete_client', {delete_client_id: client_id}, function (response) {
        // if (response.ok) {
        //     document.location.href = "/list";
        // }
    });
})

$("#new_client").on("click", (event) => {
    document.location.href = "/new_client";
})

$("#pictures_list").on("click", (event) => {
    document.location.href = "/list";
})