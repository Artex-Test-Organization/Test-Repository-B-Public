function getShortString(number) {
    if (number >= 1000000) {
        return `Lot: ${number / 1000000} mln $`
    }
    if (number >= 1000) {
        return `Lot: ${number / 1000} thds $`
    }
    return `Lot: ${number} $`
}

let set = new Set();

$.get("/images", {}).done((pictures) => {
    for (let picture of pictures) {
        document.getElementById(picture.id).style.backgroundImage = "url(static/" + picture.image_path + ")"

        $("#auction" + picture.id).on("click", () => {
            let styleBg = $("#auction" + picture.id).css('background-image');
            let img = styleBg.substr(styleBg.length - 8).slice(0, 2);
            switch (img) {
                case "st":
                    $("#auction" + picture.id).css('background-image', 'url("static/images/auction_ch.png")');
                    set.add(picture.id)
                    break
                case "hv":
                    $("#auction" + picture.id).css('background-image', 'url("static/images/auction_ch.png")');
                    set.add(picture.id)
                    break
                case "ch":
                    $("#auction" + picture.id).css('background-image', '');
                    if (set.has(picture.id)){
                        set.delete(picture.id)
                    }
                    break
            }
            console.log(set)
            $.post('/send_selected_paintings', {set: JSON.stringify(Array.from(set))}, function(data){
                alert(data);
            });
            // $.post("/send_selected_paintings", {set:set}).done((pictures) => {
            //     console.log('hi')
            // })

        })
        $("#editimg" + picture.id).on("click", (event) => {
            let id = event.currentTarget.id.replace("editimg", "")
            document.location.href = "/edit?picture_id=" + id;
        })

        let price = $("#price_" + picture.id).text()
        $("#price_" + picture.id).text(getShortString(price))
        // console.log()

    }
})

$("#new_picture").on("click", (event) => {
    document.location.href = "/new_picture";
})

$("#clients_list").on("click", (event) => {
    document.location.href = "/clients";
})

$("#auction_settings").on("click", (event) => {
    document.location.href = `/auction`;
})