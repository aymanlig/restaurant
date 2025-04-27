document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".header");
   
    function checkScroll() { 
      if (window.scrollY > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    } 
  
    checkScroll(); 
    window.addEventListener("scroll", checkScroll);
  
    // Mobile menu functionality
    const mobileToggle = document.querySelector(".mobile-toggle");
    const mobileNavOverlay = document.querySelector(".mobile-nav-overlay");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-menu .nav-link");
  
    mobileToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      mobileNavOverlay.classList.toggle("active");
      document.body.style.overflow = mobileNavOverlay.classList.contains("active") ? "hidden" : "";
    });
    
    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileToggle.classList.remove("active");
        mobileNavOverlay.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  
    const menuTabs = document.querySelectorAll(".menu-tab");
  
    menuTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        menuTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
      });
    });
  
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
  
        if (this.getAttribute("href") === "#") return;
  
        const targetElement = document.querySelector(this.getAttribute("href"));
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          });
        }
      });
    }); 
  
    // Cart functionality
    const addButtons = document.querySelectorAll(".menu-item-btn");
    const cartCount = document.querySelector(".cart-count");
    const cartIcon = document.querySelector(".nav-icon .fa-shopping-cart").parentElement;
    let count = 3;
    let cartItems = [
      { name: "Sample Item 1", price: 12.95 },
      { name: "Sample Item 2", price: 8.95 },
      { name: "Sample Item 3", price: 14.95 }
    ];
    
    // Calculate initial total price
    let totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    // Create checkout overlay
    const checkoutOverlay = document.createElement("div");
    checkoutOverlay.className = "checkout-overlay";
    checkoutOverlay.innerHTML = `
      <div class="checkout-panel">
        <div class="checkout-header">
          <h3>Your Cart</h3>
          <button class="close-checkout"><i class="fas fa-times"></i></button>
        </div>
        <div class="checkout-items">
          <h4>Items (<span class="checkout-item-count">${count}</span>)</h4>
          <div class="checkout-item-list">
            ${cartItems.map(item => `
              <div class="checkout-item">
                <span class="checkout-item-name">${item.name}</span>
                <span class="checkout-item-price">$${item.price.toFixed(2)}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="checkout-summary">
          <div class="checkout-subtotal">
            <span>Subtotal:</span>
            <span class="checkout-price">$${totalPrice.toFixed(2)}</span>
          </div>
          <div class="checkout-coupon">
            <input type="text" placeholder="Enter coupon code" class="coupon-input">
            <button class="apply-coupon">Apply</button>
          </div>
          <div class="checkout-discount hidden">
            <span>Discount:</span>
            <span class="discount-amount">-$0.00</span>
          </div>
          <div class="checkout-total">
            <span>Total:</span>
            <span class="total-price">$${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        <button class="checkout-button">Proceed to Checkout</button>
      </div>
    `;
    document.body.appendChild(checkoutOverlay);

    // Add CSS for checkout panel to body
    const checkoutStyles = document.createElement("style");
    checkoutStyles.textContent = `
      .checkout-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }
      
      .checkout-panel {
        background-color: white;
        width: 90%;
        max-width: 500px;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        max-height: 90vh;
        overflow-y: auto;
      }
      
      .checkout-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
      }
      
      .checkout-header h3 {
        margin: 0;
        font-family: 'Playfair Display', serif;
        font-size: 24px;
      }
      
      .close-checkout {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
      }
      
      .checkout-items {
        margin-bottom: 20px;
      }
      
      .checkout-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid #f5f5f5;
      }
      
      .checkout-summary {
        padding: 15px 0;
      }
      
      .checkout-subtotal, .checkout-total, .checkout-discount {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
      }
      
      .checkout-total {
        font-weight: bold;
        font-size: 18px;
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid #eee;
      }
      
      .checkout-coupon {
        display: flex;
        margin: 15px 0;
      }
      
      .coupon-input {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px 0 0 4px;
      }
      
      .apply-coupon {
        padding: 8px 15px;
        background-color: #f0f0f0;
        border: 1px solid #ddd;
        border-left: none;
        border-radius: 0 4px 4px 0;
        cursor: pointer;
      }
      
      .checkout-button {
        width: 100%;
        padding: 12px;
        background-color: #e8842d;
        color: white;
        border: none;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      
      .checkout-button:hover {
        background-color: #d97520;
      }
      
      .hidden {
        display: none;
      }

      @media (max-width: 576px) {
        .checkout-panel {
          width: 95%;
          padding: 15px;
        }
      }
    `;
    document.head.appendChild(checkoutStyles);

    // Add items to cart
    addButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        // Get item details
        const menuItem = button.closest('.menu-item');
        const itemName = menuItem.querySelector('.menu-item-name').textContent;
        const itemPrice = parseFloat(menuItem.querySelector('.menu-item-price').textContent.replace('$', ''));
        
        // Add to cart array
        cartItems.push({ name: itemName, price: itemPrice });
        
        // Update count and visual feedback
        count++;
        cartCount.textContent = count;
        totalPrice += itemPrice;
        
        // Update checkout panel
        document.querySelector('.checkout-item-count').textContent = count;
        const itemList = document.querySelector('.checkout-item-list');
        const newItem = document.createElement('div');
        newItem.className = 'checkout-item';
        newItem.innerHTML = `
          <span class="checkout-item-name">${itemName}</span>
          <span class="checkout-item-price">$${itemPrice.toFixed(2)}</span>
        `;
        itemList.appendChild(newItem);
        
        document.querySelector('.checkout-price').textContent = `$${totalPrice.toFixed(2)}`;
        document.querySelector('.total-price').textContent = `$${totalPrice.toFixed(2)}`;

        // Animation for button
        button.style.transform = "scale(1.2)";
        setTimeout(() => {
          button.style.transform = "";
        }, 200);
      });
    });

    // Toggle checkout panel when clicking on cart icon
    cartIcon.addEventListener('click', function(e) {
      e.preventDefault();
      checkoutOverlay.style.display = 'flex';
    });

    // Close checkout panel
    document.querySelector('.close-checkout').addEventListener('click', function() {
      checkoutOverlay.style.display = 'none';
    });

    // Close checkout when clicking outside the panel
    checkoutOverlay.addEventListener('click', function(e) {
      if (e.target === checkoutOverlay) {
        checkoutOverlay.style.display = 'none';
      }
    });

    // Apply coupon functionality
    document.querySelector('.apply-coupon').addEventListener('click', function() {
      const couponInput = document.querySelector('.coupon-input');
      const couponCode = couponInput.value.trim().toUpperCase();
      
      if (couponCode === 'SAVE10') {
        // Apply 10% discount
        const discountAmount = totalPrice * 0.1;
        const newTotal = totalPrice - discountAmount;
        
        document.querySelector('.checkout-discount').classList.remove('hidden');
        document.querySelector('.discount-amount').textContent = `-$${discountAmount.toFixed(2)}`;
        document.querySelector('.total-price').textContent = `$${newTotal.toFixed(2)}`;
        
        couponInput.disabled = true;
        this.disabled = true;
        this.textContent = "Applied";
      } else if (couponCode === 'CRAFT25') {
        // Apply 25% discount
        const discountAmount = totalPrice * 0.25;
        const newTotal = totalPrice - discountAmount;
        
        document.querySelector('.checkout-discount').classList.remove('hidden');
        document.querySelector('.discount-amount').textContent = `-$${discountAmount.toFixed(2)}`;
        document.querySelector('.total-price').textContent = `$${newTotal.toFixed(2)}`;
        
        couponInput.disabled = true;
        this.disabled = true;
        this.textContent = "Applied";
      } else {
        alert("Invalid coupon code. Try SAVE10 or CRAFT25");
      }
    });
  });

// Dark mode functionality
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");
  const saved = localStorage.getItem("theme") || "light";

  // Apply on loading
  if (saved === "dark") document.body.classList.add("dark-mode");

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});

