// script.js
// Restaurant Menu Object
const menu = {
    items: [
        { id: 1, name: 'Margherita Pizza', price: 12.99, category: 'food' },
        { id: 2, name: 'Pasta Carbonara', price: 14.50, category: 'food' },
        { id: 3, name: 'Caesar Salad', price: 9.99, category: 'food' },
        { id: 4, name: 'Lemonade', price: 3.50, category: 'drink' },
        { id: 5, name: 'Iced Coffee', price: 4.25, category: 'drink' }
    ],
    currentOrder: []
};

// Initialize website
function init() {
    displayMenu();
}

// Display menu items using loop
function displayMenu() {
    const menuContainer = document.getElementById('menu');
    
    for (const item of menu.items) {
        const menuItem = document.createElement('div');
        menuItem.className = `menu-item category-${item.category}`;
        menuItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)}</p>
            <button onclick="addToOrder(${item.id})">Add to Order</button>
        `;
        menuContainer.appendChild(menuItem);
    }
}

// Add item to order (object operation)
function addToOrder(itemId) {
    const item = menu.items.find(i => i.id === itemId);
    const existingItem = menu.currentOrder.find(i => i.id === itemId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        menu.currentOrder.push({ ...item, quantity: 1 });
    }
    
    updateOrderDisplay();
}

// Update order display using array methods
function updateOrderDisplay() {
    const orderList = document.getElementById('order-items');
    const totalElement = document.getElementById('total');
    
    // Clear current list
    orderList.innerHTML = '';
    
    // Calculate total using reduce
    let total = menu.currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Update order items
    for (const item of menu.currentOrder) {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        orderList.appendChild(li);
    }
    
    totalElement.textContent = total.toFixed(2);
}

// Checkout function
function checkout() {
    if (menu.currentOrder.length === 0) {
        alert('Your order is empty!');
        return;
    }
    
    const total = menu.currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your order! Total: $${total.toFixed(2)}`);
    menu.currentOrder = [];
    updateOrderDisplay();
}

// Initialize website when loaded
window.onload = init;