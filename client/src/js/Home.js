document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.getElementById('closeModal');
    const registerBtn = document.getElementById('registerBtn');
    const loginBtn = document.getElementById('loginBtn');
    const switchToLogin = document.getElementById('switchToLogin');
    const switchToRegister = document.getElementById('switchToRegister');
    
    // Forms
    const registerForm = `
        <h1>Register</h1>
        <form action=#>
            <div class="input-box">
                <label for="select your role">Select your Role</label>
                <select id="select your role" name="select your role" required>
                    <option value="">select your role</option>
                    <option value="inventory manager">Inventory Manager</option>
                    <option value="supplier">Supplier</option>
                    <option value="customer">Customer</option>
                    <option value="courier service">Courier Service</option>
                </select>
            </div>
            <div class="input-box">
                <input type="text" placeholder="Username" required>
            </div>
            <div class="input-box">
                <input type="email" id="email" placeholder="Email" required>
                <small id="emailError" style="color: red; display: none;">Please enter a valid email address.</small>
            </div>
            <div class="input-box">
                <input type="password" id="password" placeholder="Password" required>
            </div>
            <div class="input-box">
                <input type="password" id="confirmPassword" placeholder="Confirm Password" required>
            </div>
            <button type="submit" class="btn">Register</button>
            <div class="register-link">
                <p>Already have an account? <a href="#" id="switchToLogin">Login</a></p>
            </div>
        </form>
    `;

    const loginForm = `
        <h1>Login</h1>
        <div class="input-box">
            <input type="text" placeholder="Username" required>
        </div>
        <div class="input-box">
            <input type="password" placeholder="Password" required>
        </div>
        <button type="submit" class="btn">Login</button>
        <div class="register-link">
            <p>Don't have an account? <a href="#" id="switchToRegister">Register</a></p>
        </div>
    `;

    // Show register form when register button is clicked
    if (registerBtn) {
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalContent.innerHTML = registerForm;
            modal.style.display = 'flex';
        });
    }

    // Show login form when login button is clicked
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalContent.innerHTML = loginForm;
            modal.style.display = 'flex';
        });
    }

    // Close modal if clicked outside modal or on close button
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target === closeModal) {
                modal.style.display = 'none';
            }
        });
    }

    // Switch between login and register forms
    if (modalContent) {
        modalContent.addEventListener('click', (e) => {
            if (e.target.id === 'switchToLogin') {
                modalContent.innerHTML = loginForm;
            } else if (e.target.id === 'switchToRegister') {
                modalContent.innerHTML = registerForm;
            }
        });
    }

    // Typing effect for tagline
    const taglineElement = document.querySelector(".tagline");
    if (taglineElement) {
        const tagline = "● Swift ● Reliable ● Transparent";
        let i = 0;

        function type() {
            if (i < tagline.length) {
                taglineElement.textContent += tagline.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        }

        type();
    }

    // Modal functionality
    const demoModalBtn = document.querySelector(".button:nth-child(2)");
    const demoModal = document.getElementById("demoModal");
    const closeDemoModal = document.querySelector(".close");

    if (demoModalBtn) {
        demoModalBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (demoModal) {
                demoModal.style.display = "flex";
            }
        });
    }

    if (closeDemoModal) {
        closeDemoModal.addEventListener("click", function () {
            if (demoModal) {
                demoModal.style.display = "none";
            }
        });
    }
});
