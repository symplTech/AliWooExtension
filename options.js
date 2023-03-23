// Saves options to chrome.storage
const saveOptions = () => {
    const newKey = document.getElementById('store-key').value;
    const isActive = document.getElementById('is-active').checked;
    if (newKey === "") {

    }
    chrome.storage.sync.get(
        {listOfKeys: []},
        (items) => {
            console.log(items);
            items.listOfKeys.push({storeKey: newKey, isActive: isActive});
            setNewItems(items);
        }
    );


};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const displayKeys = () => {
    chrome.storage.sync.get(
        {listOfKeys: []},
        (items) => {
            jQuery(".keys-wrapper input.is-active").off("click" );
            jQuery(".keys-wrapper .remove").off("click");


            jQuery(".keys-wrapper").html('');
            let checked = '';
            for (const [i, item] of items.listOfKeys.entries()) {
                console.log(item);
                console.log(i);
                checked = item.isActive?'checked':'';
                jQuery(".keys-wrapper").append("<div class='key-item'>"+item.storeKey+"<input type='checkbox' class='is-active' data-index='"+i+"' "+ checked +"><span class='remove' data-index='"+i+"'> Remove </span></div>");
            }
            jQuery(".keys-wrapper input.is-active").on("click", handleListCheckBoxClicked);
            jQuery(".keys-wrapper .remove").on("click", handleListItemRemove);
        }
    );
};

function handleListCheckBoxClicked () {
    let itemIndex = jQuery(this).attr('data-index');

    chrome.storage.sync.get(
        {listOfKeys: []},
        (items) => {
            items.listOfKeys[itemIndex].isActive = jQuery(this).is(':checked');
            setNewItems(items);
        }
    );
}

function setNewItems(items, message = 'Options saved.') {
    chrome.storage.sync.set(
        {listOfKeys: items.listOfKeys},
        () => {
            // Update status to let user know options were saved.
            const status = document.getElementById('status');
            status.textContent = message;
            document.getElementById('store-key').value = "";
            document.getElementById('is-active').checked = false;
            displayKeys();
            setTimeout(() => {
                status.textContent = '';
            }, 1500);
        }
    );
}

function handleListItemRemove () {
    if (confirm("Are you sure you want to delete Store Key?") === false) {
        return
    }
    let itemIndex = jQuery(this).attr('data-index');

    chrome.storage.sync.get(
        {listOfKeys: []},
        (items) => {
            items.listOfKeys.splice(itemIndex, 1);
            setNewItems(items, "Store key removed.");
        }
    );
}


document.addEventListener('DOMContentLoaded', displayKeys);
document.getElementById('save').addEventListener('click', saveOptions);
