document.addEventListener('DOMContentLoaded', () => {

    // --- DOM REFERENCES ---
    const inputs = {
        company: document.getElementById('companyName'),
        leftAddr: document.getElementById('leftAddress'),
        centerInfo: document.getElementById('centerInfo'),
        rightAddr: document.getElementById('rightAddress'),
        date: document.getElementById('dateInput'),
        recName: document.getElementById('recipientName'),
        recComp: document.getElementById('recipientCompany'),
        recAddr: document.getElementById('recipientAddress'),
        subject: document.getElementById('subjectLine'),
        body: document.getElementById('letterBody'),
        sigCount: document.getElementById('sigCountSelector'),
        dynamicSigContainer: document.getElementById('dynamicSigInputs')
    };

    const display = {
        company: document.getElementById('dispCompany'),
        companySmall: document.getElementById('dispCompanySmall'),
        leftAddr: document.getElementById('dispLeftAddr'),
        centerInfo: document.getElementById('dispCenterInfo'),
        rightAddr: document.getElementById('dispRightAddr'),
        date: document.getElementById('dispDate'),
        recName: document.getElementById('dispRecName'),
        recComp: document.getElementById('dispRecComp'),
        recAddr: document.getElementById('dispRecAddr'),
        subject: document.getElementById('dispSubject'),
        body: document.getElementById('dispBody'),
        sigGrid: document.getElementById('signatureGrid')
    };

    // --- 1. BASIC TEXT UPDATERS ---
    
    // Helper to map inputs to outputs (handling newlines for addresses)
    function bindText(input, output, isHTML = false) {
        input.addEventListener('input', () => {
            if(isHTML) {
                output.innerHTML = input.value.replace(/\n/g, '<br>');
            } else {
                output.innerText = input.value;
            }
        });
        // Trigger once on load
        input.dispatchEvent(new Event('input'));
    }

    bindText(inputs.company, display.company);
    
    // Special binder for the "For: COMPANY" part
    inputs.company.addEventListener('input', () => {
        display.companySmall.innerText = inputs.company.value;
    });

    bindText(inputs.leftAddr, display.leftAddr, true);
    bindText(inputs.centerInfo, display.centerInfo, true);
    bindText(inputs.rightAddr, display.rightAddr, true);
    
    bindText(inputs.recName, display.recName);
    bindText(inputs.recComp, display.recComp);
    bindText(inputs.recAddr, display.recAddr);
    bindText(inputs.subject, display.subject);
    bindText(inputs.body, display.body);

    // Date Logic (Default to today)
    const today = new Date();
    inputs.date.valueAsDate = today;
    
    function formatDate(dateString) {
        if(!dateString) return "";
        const d = new Date(dateString);
        // Format: 19th February, 2026
        const day = d.getDate();
        const month = d.toLocaleString('default', { month: 'long' });
        const year = d.getFullYear();
        
        let suffix = "th";
        if (day === 1 || day === 21 || day === 31) suffix = "st";
        else if (day === 2 || day === 22) suffix = "nd";
        else if (day === 3 || day === 23) suffix = "rd";

        return `${day}${suffix} ${month}, ${year}`;
    }

    inputs.date.addEventListener('change', () => {
        display.date.innerText = formatDate(inputs.date.value);
    });
    // Trigger date update immediately
    display.date.innerText = formatDate(inputs.date.value);


    // --- 2. DYNAMIC SIGNATURE LOGIC ---

    function generateSignatories(count) {
        inputs.dynamicSigContainer.innerHTML = '';
        display.sigGrid.innerHTML = '';

        for (let i = 1; i <= count; i++) {
            // 1. Create Inputs in Sidebar
            const wrapper = document.createElement('div');
            wrapper.style.borderLeft = "3px solid #000";
            wrapper.style.paddingLeft = "10px";
            wrapper.style.marginBottom = "10px";

            const nameInput = document.createElement('input');
            nameInput.placeholder = `Person ${i} Name`;
            nameInput.value = (i === 1) ? "Mr. Kazeem Oderinde" : "Signatory Name";
            
            const titleInput = document.createElement('input');
            titleInput.placeholder = `Person ${i} Title`;
            titleInput.value = (i === 1) ? "MD/CEO" : "Director";

            wrapper.appendChild(nameInput);
            wrapper.appendChild(titleInput);
            inputs.dynamicSigContainer.appendChild(wrapper);

            // 2. Create Preview Blocks
            const sigBlock = document.createElement('div');
            sigBlock.className = 'sig-item';

            const sigLine = document.createElement('div');
            sigLine.className = 'sig-line';

            const sigNameDisplay = document.createElement('div');
            sigNameDisplay.className = 'sig-name';

            const sigTitleDisplay = document.createElement('div');
            sigTitleDisplay.className = 'sig-title';

            sigBlock.appendChild(sigLine);
            sigBlock.appendChild(sigNameDisplay);
            sigBlock.appendChild(sigTitleDisplay);
            display.sigGrid.appendChild(sigBlock);

            // 3. Bind Events
            const updateSig = () => {
                sigNameDisplay.innerText = nameInput.value;
                sigTitleDisplay.innerText = titleInput.value;
            };

            nameInput.addEventListener('input', updateSig);
            titleInput.addEventListener('input', updateSig);
            
            // Init
            updateSig();
        }
    }

    // Initialize with 2 people (based on image)
    generateSignatories(2);

    inputs.sigCount.addEventListener('change', (e) => {
        generateSignatories(parseInt(e.target.value));
    });


    // --- 3. PDF DOWNLOAD ---
    document.getElementById('downloadBtn').addEventListener('click', () => {
        const element = document.getElementById('letterhead');
        const btn = document.getElementById('downloadBtn');
        
        btn.innerText = "Processing...";
        
        const opt = {
            margin:       0,
            filename:     'Official_Letter.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            btn.innerHTML = '<i class="fa-solid fa-download"></i> Download PDF';
        });
    });

});
