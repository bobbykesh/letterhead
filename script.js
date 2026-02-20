document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. DOM ELEMENTS ---
    const inputs = {
        styleSelector: document.getElementById('styleSelector'),
        colorPicker: document.getElementById('colorPicker'),
        logoInput: document.getElementById('logoInput'),
        companyName: document.getElementById('companyName'),
        senderName: document.getElementById('senderName'),
        senderTitle: document.getElementById('senderTitle'),
        phone: document.getElementById('phone'),
        email: document.getElementById('email'),
        website: document.getElementById('website'),
        address: document.getElementById('address'),
        date: document.getElementById('date'),
        letterBody: document.getElementById('letterBody')
    };

    const displays = {
        letterhead: document.getElementById('letterhead'),
        logo: document.getElementById('displayLogo'),
        company: document.getElementById('displayCompany'),
        sender: document.getElementById('displaySender'),
        title: document.getElementById('displayTitle'),
        phone: document.getElementById('displayPhone'),
        email: document.getElementById('displayEmail'),
        website: document.getElementById('displayWebsite'),
        address: document.getElementById('displayAddress'),
        date: document.getElementById('displayDate'),
        body: document.getElementById('displayBody')
    };

    const downloadBtn = document.getElementById('downloadBtn');

    // --- 2. LIVE PREVIEW UPDATE FUNCTIONS ---

    // Generic Text Updater
    function updateText(inputId, displayElement) {
        inputId.addEventListener('input', (e) => {
            displayElement.innerText = e.target.value;
        });
    }

    // Initialize Text Listeners
    updateText(inputs.companyName, displays.company);
    updateText(inputs.senderName, displays.sender);
    updateText(inputs.senderTitle, displays.title);
    updateText(inputs.phone, displays.phone);
    updateText(inputs.email, displays.email);
    updateText(inputs.website, displays.website);
    updateText(inputs.address, displays.address);
    updateText(inputs.letterBody, displays.body);

    // Date Updater (formatting)
    inputs.date.addEventListener('change', (e) => {
        const dateObj = new Date(e.target.value);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        displays.date.innerText = dateObj.toLocaleDateString('en-US', options);
    });

    // --- 3. STYLE & THEME LOGIC ---

    // Color Picker
    inputs.colorPicker.addEventListener('input', (e) => {
        // Set CSS Variable
        document.documentElement.style.setProperty('--primary-color', e.target.value);
    });

    // Template Switcher
    inputs.styleSelector.addEventListener('change', (e) => {
        const selectedStyle = e.target.value;
        // Remove all style classes
        displays.letterhead.classList.remove('modern', 'classic', 'minimal');
        // Add selected style class
        displays.letterhead.classList.add(selectedStyle);
    });

    // --- 4. IMAGE HANDLING (LOGO) ---
    inputs.logoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                displays.logo.src = event.target.result;
                displays.logo.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // --- 5. PDF DOWNLOAD LOGIC ---
    downloadBtn.addEventListener('click', () => {
        const element = document.getElementById('letterhead');
        
        // Configuration for html2pdf
        const opt = {
            margin:       0,
            filename:     'my-letterhead.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true }, // Scale 2 improves resolution
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Execute download
        // We temporarily show a loading text or disable button
        downloadBtn.innerText = "Generating...";
        
        html2pdf().set(opt).from(element).save().then(() => {
            downloadBtn.innerHTML = '<i class="fa-solid fa-download"></i> Download PDF';
        });
    });
});
