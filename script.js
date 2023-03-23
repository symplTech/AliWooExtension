setTimeout(handleProducts, 2500);

function handleProducts() {
    jQuery(".productContainer").append('<div class="add-to-aliwoo">Add to AliWoo</div>');

    jQuery(".productContainer .add-to-aliwoo").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(this);
    })
}