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
        letterBody: document.getElementById('letterBody'),
        // Signature specific
        sigCountSelector: document.getElementById('sigCountSelector'),
        signatureNameInputs: document.getElementById('signatureNameInputs')
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
        body: document.getElementById('displayBody'),
        // Signature specific
        signatureGrid: document.getElementById('signatureGrid')
    };

    const downloadBtn = document.getElementById('downloadBtn');

    // --- 2. LIVE PREVIEW UPDATE FUNCTIONS ---

    // Generic Text Updater
    function updateText(inputId, displayElement) {
        inputId.addEventListener('input', (e) => {
            displayElement.innerText = e.target.value;
        });
    }

    // Initialize Standard Text Listeners
    updateText(inputs.companyName, displays.company);
    updateText(inputs.senderName, displays.sender);
    updateText(inputs.senderTitle, displays.title);
    updateText(inputs.phone, displays.phone);
    updateText(inputs.email, displays.email);
    updateText(inputs.website, displays.website);
    updateText(inputs.address, displays.address);
    updateText(inputs.letterBody, displays.body);

    // Date Updater
    inputs.date.addEventListener('change', (e) => {
        if(!e.target.value) return;
        const dateObj = new Date(e.target.value);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        displays.date.innerText = dateObj.toLocaleDateString('en-US', options);
    });

    // --- 3. STYLE & THEME LOGIC ---
    inputs.colorPicker.addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--primary-color', e.target.value);
    });

    inputs.styleSelector.addEventListener('change', (e) => {
        const selectedStyle = e.target.value;
        displays.letterhead.classList.remove('modern', 'classic', 'minimal');
        displays.letterhead.classList.add(selectedStyle);
    });

    // --- 4. SIGNATURE LOGIC ---
    function renderSignatures(count) {
        // Clear previous inputs and preview
        inputs.signatureNameInputs.innerHTML = '';
        displays.signatureGrid.innerHTML = '';

        for(let i = 1; i <= count; i++) {
            // 1. Create Control Input
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.placeholder = `Signatory Name ${i}`;
            inputField.id = `sigInput${i}`;
            inputField.value = `Signatory ${i}`; // Default text
            inputs.signatureNameInputs.appendChild(inputField);

            // 2. Create Preview Block
            const sigBlock = document.createElement('div');
            sigBlock.className = 'sig-block';
            
            const sigLine = document.createElement('div');
            sigLine.className = 'sig-line';

            const sigName = document.createElement('div');
            sigName.className = 'sig-name';
            sigName.innerText = `Signatory ${i}`;
            sigName.id = `sigPreview${i}`;

            sigBlock.appendChild(sigLine);
            sigBlock.appendChild(sigName);
            displays.signatureGrid.appendChild(sigBlock);

            // 3. Link Input to Preview immediately
            inputField.addEventListener('input', (e) => {
                sigName.innerText = e.target.value;
            });
        }
    }

    // Initialize with 1 signature
    renderSignatures(1);

    // Listen for count change
    inputs.sigCountSelector.addEventListener('change', (e) => {
        const count = parseInt(e.target.value);
        renderSignatures(count);
    });


    // --- 5. IMAGE HANDLING (LOGO) ---
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

    // --- 6. PDF DOWNLOAD LOGIC ---
    downloadBtn.addEventListener('click', () => {
        const element = document.getElementById('letterhead');
        
        const opt = {
            margin:       0,
            filename:     'letterhead.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        downloadBtn.innerText = "Generating...";
        
        html2pdf().set(opt).from(element).save().then(() => {
            downloadBtn.innerHTML = '<i class="fa-solid fa-download"></i> Download PDF';
        });
    });
});
