// 1. Modal Open Function
function openPage(pageId) {
    const modal = document.getElementById('pageModal');
    const modalBody = document.getElementById('modalBody');
    const contentElement = document.getElementById(pageId + '-content');
    
    if (contentElement) {
        modalBody.innerHTML = contentElement.innerHTML;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Background scroll stop
    } else {
        console.error("Content not found for ID: " + pageId + "-content");
    }
}

// 2. Modal Close Function
function closePage() {
    const modal = document.getElementById('pageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Background scroll start
}

// 3. Modal Close on Outside Click
window.onclick = function(event) {
    const modal = document.getElementById('pageModal');
    if (event.target == modal) {
        closePage();
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const rForm = document.getElementById('rentalForm');

    if (rForm) {
        rForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Page refresh hone se rokta hai
            console.log("Form Submit Ho Gaya!"); // Browser console mein check karein (F12)

            // Values nikalna
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const address = document.getElementById('address').value;
            const sport = document.getElementById('sport').value;
            const phone = "916201113077"; // Aapka number

            // Message ko format karna
            const message = `*New Inquiry from Ritros Sports*%0A` +
                            `----------------------------%0A` +
                            `*Name:* ${name}%0A` +
                            `*Email:* ${email}%0A` +
                            `*Address:* ${address}%0A` +
                            `*Interest:* ${sport}%0A` +
                            `----------------------------%0A` +
                            `Is this available?`;

            const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
            
            // WhatsApp link kholna
            window.open(whatsappUrl, '_blank');
        });
    } else {
        console.error("Error: 'rentalForm' ID wala form nahi mila!");
    }
});

// 5. Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 6. Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.glass-nav'); // Aapke HTML mein class .glass-nav hai
    if (nav) {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(10, 12, 16, 0.95)';
            nav.style.backdropFilter = 'blur(10px)';
            nav.style.padding = '10px 8%';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.05)';
            nav.style.padding = '20px 8%';
        }
    }
});

// Calculator Logic
const equipSelect = document.getElementById('equipSelect');
const rentHours = document.getElementById('rentHours');
const totalPriceDisplay = document.getElementById('totalPrice');

function calculateRent() {
    const pricePerHour = parseInt(equipSelect.value);
    const hours = parseInt(rentHours.value) || 1;
    const total = pricePerHour * hours;
    totalPriceDisplay.innerText = `₹${total}`;
}

// Event Listeners for automatic change
if(equipSelect && rentHours) {
    equipSelect.addEventListener('change', calculateRent);
    rentHours.addEventListener('input', calculateRent);
}

// Calculator se seedha WhatsApp booking
function bookCalculatedItem() {
    const item = equipSelect.options[equipSelect.selectedIndex].text.split('(')[0].trim();
    const hours = rentHours.value;
    const total = totalPriceDisplay.innerText;
    const phone = "916201113077";

    const message = `*SportyFi Quick Booking*%0A` +
                    `----------------------------%0A` +
                    `*Item:* ${item}%0A` +
                    `*Duration:* ${hours} Hour(s)%0A` +
                    `*Estimated Total:* ${total}%0A` +
                    `----------------------------%0A` +
                    `Is this available for rent right now?`;

    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}