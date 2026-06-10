const selectAll = document.querySelector('#select_all');
const clearAll = document.querySelector('#clear_all');
const cartList = document.querySelector('.cart_list');
const selectedCount = document.querySelector('#selected_count');
const productTotal = document.querySelector('#product_total');
const finalTotal = document.querySelector('#final_total');
const vatTotal = document.querySelector('#vat_total');

function formatPrice(price) {
    return price.toLocaleString('ko-KR') + '원';
}

function updateCart() {
    const cartItems = document.querySelectorAll('.cart_item');
    let total = 0;
    let count = 0;

    cartItems.forEach((item) => {
        const checkbox = item.querySelector('.item_check');
        const quantity = Number(item.querySelector('.count').textContent);
        const price = Number(item.dataset.price);
        const subtotal = price * quantity;

        item.querySelector('.subtotal b').textContent = formatPrice(subtotal);

        if (checkbox.checked) {
            total += subtotal;
            count += quantity;
        }
    });

    selectedCount.textContent = count;
    productTotal.textContent = formatPrice(total);
    finalTotal.textContent = formatPrice(total);
    vatTotal.textContent = formatPrice(Math.floor(total / 11));

    const checkedItems = document.querySelectorAll('.item_check:checked');
    selectAll.checked = cartItems.length > 0 && checkedItems.length === cartItems.length;
}

cartList.addEventListener('click', (event) => {
    const item = event.target.closest('.cart_item');

    if (!item) {
        return;
    }

    const count = item.querySelector('.count');

    if (event.target.classList.contains('plus')) {
        count.textContent = Number(count.textContent) + 1;
    }

    if (event.target.classList.contains('minus')) {
        if (Number(count.textContent) > 1) {
            count.textContent = Number(count.textContent) - 1;
        }
    }

    if (event.target.classList.contains('delete_btn')) {
        item.remove();
    }

    updateCart();
});

cartList.addEventListener('change', (event) => {
    if (event.target.classList.contains('item_check')) {
        updateCart();
    }
});

selectAll.addEventListener('change', () => {
    const itemChecks = document.querySelectorAll('.item_check');

    itemChecks.forEach((checkbox) => {
        checkbox.checked = selectAll.checked;
    });

    updateCart();
});

clearAll.addEventListener('click', () => {
    const itemChecks = document.querySelectorAll('.item_check');

    itemChecks.forEach((checkbox) => {
        checkbox.checked = false;
    });

    selectAll.checked = false;
    updateCart();
});

updateCart();
