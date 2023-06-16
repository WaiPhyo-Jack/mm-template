
    function EnableDisableTextBox() {
        var premium = document.getElementById("premium");
        var price = document.getElementById("price");
        price.disabled = premium.checked ? false : true;
        if (!price.disabled) {
            price.focus();
        }
        else if (price.disabled) {
            price.value = 0.00;
        }
    }