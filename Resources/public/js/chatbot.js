// chatbot.js

// Knowledge base compiled from all HTML files
// This array holds key information the chatbot can refer to.
// Each item is a string representing a piece of information from your site.
const KNOWLEDGE_BASE = [
    // From index.html
    "The PoL Data Management Corner is a central hub for research data management at Physics of Life (PoL) and TU Dresden (TUD).",
    "It provides comprehensive guides, best practices, and essential tools for the entire lifecycle of research data.",
    "Key resources include Data Management Regulations, Data Storage & Backup, and Data Sharing & Archiving.",
    "Recommended tools for data storage include OwnCloud TUD.",
    "Recommended tools for data sharing and archiving include Zenodo and Figshare.",
    "The 'What's New!?' section provides updates on advancements in data science, AI, and research tools.",
    "The 'Upcoming Data Science Events' section lists workshops, seminars, and talks.",
    "You can get in touch with the data management team for assistance.",

    // From whats-new.html
    "The 'What's New' page highlights AI Usage in Python, Recent 2025 LLM Tools, and Big Data Open Source Tools.",
    "It also features a 'Community Spotlight' on innovative research projects and data management success stories.",
    "Links are provided for 'AI Usage in Python' (koshurai.medium.com), 'Recent 2025 LLM Tools' (datacamp.com/blog/llmops-tools), and 'Big Data Open Source Tools' (opensource.com/resources/big-data).",

    // From resources.html
    "The 'Resources' page details Data Management Regulations, Data Storage & Backup, and Data Sharing & Archiving.",
    "OwnCloud TUD is a recommended tool for secure cloud storage for TU Dresden users.",
    "Zenodo is a general-purpose open-access repository by CERN, providing persistent identifiers (DOIs).",
    "Figshare is an online repository for researchers to publish data, figures, and research outputs with DOIs.",
    "The 'Resources' page also links to upcoming data science events.",

    // From Events.html
    "The 'Events' page lists upcoming events related to data science and genomics.",
    "Upcoming events in August 2025 include: 'Drosophila genetics and genomics' (EMBL Heidelberg, Aug 3-8), 'Light sheet microscopy' (Dresden, Aug 11-22), and 'FISHing for RNAs: classical to single molecule approaches' (EMBL Heidelberg, Aug 31 - Sep 5).",
    "An event in October 2025 is the 'EMBO | EMBL Symposium: Seeing is believing' (Heidelberg, Oct 8-11).",
    "An event in November 2025 is the 'Cytodata Symposium' (Berlin, Nov 20-21) focusing on morphological profiling and Cell Painting Data analysis.",

    // From data-storage-backup.html
    "The 'Data Storage & Backup' page covers Cloud Storage, Local Backup, and a Hybrid Approach.",
    "Cloud Storage offers access from anywhere, automatic syncing, and version history.",
    "Local Backup involves keeping sensitive data on-site with external drives or NAS for total control and fast retrieval.",
    "The Hybrid Approach combines local speed with cloud for disaster recovery, following a 3-2-1 backup strategy.",
    "This page also features a 'Data storage Spotlight' on innovative research projects and their data management.",

    // From data-sharing-archiving.html
    "The 'Data Sharing & Archiving' page provides guidelines for Data Sharing, Data Archiving, and the FAIR Principles.",
    "Data Sharing guidelines focus on making data accessible to the scientific community.",
    "Data Archiving policies cover long-term data preservation.",
    "The FAIR Principles ensure data is Findable, Accessible, Interoperable, and Reusable.",
    "Recommended data repositories include ZENODO, OpARA (open-access data repository at TU Dresden), and figshare.",

    // From data-management-regulations.html
    "The 'EU & German Data Regulations' page guides on data protection and management regulations.",
    "Key considerations for researchers include developing a Data Management Plan (DMP), Data Anonymization, Long-Term Archiving, and Ethical Clearances.",
    "Regulation topics include GDPR for Research, DFG General Guidelines, Animal Data Guidelines (DFG's 3Rs principle), Image Data Management, and Metadata Management.",
    "Interoperability standards mentioned are FHIR (Fast Healthcare Interoperability Resources) for health data exchange, UCUM (Unified Code for Units of Measure) for consistent measurement units, and LOINC (Logical Observation Identifiers Names and Codes) for medical lab results.",
    "SNOMED CT, a globally recognized clinical terminology for electronic health records, is also covered."
];

// Function to call the Gemini API (mocked for preview)
async function callGeminiAPI(prompt) {
    // This is a mock implementation for the preview.
    // In a real scenario, this would make a fetch call to the Gemini API.
    // For the preview, it just returns a generic response or a simple echo.
    console.log("Mock API call with prompt:", prompt);
    let responseText = "I'm a chatbot for the PoL Data Management Corner. I can answer questions based on the information provided on this website. What would you like to know?";

    // Normalize input for better matching, handling common variations and punctuation
    const lowerCasePrompt = prompt.toLowerCase().replace(/[?!.,;']/g, '').trim();

    // --- General Greetings and Introduction ---
    if (lowerCasePrompt.includes("hello") || lowerCasePrompt.includes("hi") || lowerCasePrompt.includes("hey") || lowerCasePrompt.includes("hallo")) {
        responseText = "Hello! I'm your PoL Data Management Corner AI assistant. What's on your mind?";
    } else if (lowerCasePrompt.includes("who are you") || lowerCasePrompt.includes("what can you do") || lowerCasePrompt.includes("what is your purpose")) {
        responseText = "I am the AI chatbot for the PoL Data Management Corner. I can provide information on data management regulations, storage, sharing, archiving, upcoming events, and relevant tools mentioned on this website. Just ask me a question!";
    } else if (lowerCasePrompt.includes("what is this site about") || lowerCasePrompt.includes("purpose of this website") || lowerCasePrompt.includes("about this site")) {
        responseText = "This website, the PoL Data Management Corner, is a central hub for research data management at Physics of Life (PoL) and TU Dresden (TUD). How can I help you?";
    }

    // --- "What is..." questions (expanded) ---
    else if (lowerCasePrompt.includes("what is pol data management corner") || lowerCasePrompt.includes("what is pol dmc") || lowerCasePrompt.includes("what is po l dmc")) {
        responseText = "The PoL Data Management Corner is a central hub for research data management at Physics of Life (PoL) and TU Dresden (TUD). It offers guides, best practices, and tools for the entire research data lifecycle. Visit the <a href='./index.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>homepage</a> for more.";
    } else if (lowerCasePrompt.includes("what is a dmp") || lowerCasePrompt.includes("what is data management plan") || lowerCasePrompt.includes("what dmp is")) {
        responseText = "A Data Management Plan (DMP) is a document outlining how data will be handled throughout a research project, covering aspects like collection, storage, sharing, and archiving. It's a key consideration under EU & German Data Regulations. Learn more on the <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>Data Management Regulations page</a>.";
    } else if (lowerCasePrompt.includes("what are fair principles") || lowerCasePrompt.includes("what fair")) {
        responseText = "The FAIR Principles ensure data is Findable, Accessible, Interoperable, and Reusable. Adhering to these principles is crucial for effective data sharing and archiving. Find details on the <a href='./data-sharing-archiving.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>Data Sharing & Archiving page</a>.";
    } else if (lowerCasePrompt.includes("what is zenodo") || lowerCasePrompt.includes("info on zenodo") || lowerCasePrompt.includes("about zenodo")) {
        responseText = "Zenodo is a general-purpose open-access repository by CERN, providing persistent identifiers (DOIs) for research data. It's recommended for data sharing and archiving. Official website: <a href='https://zenodo.org/' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>https://zenodo.org/</a>. More info: <a href='./data-sharing-archiving.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>data-sharing-archiving.html</a>.";
    } else if (lowerCasePrompt.includes("what is figshare") || lowerCasePrompt.includes("info on figshare") || lowerCasePrompt.includes("about figshare")) {
        responseText = "Figshare is an online repository for researchers to publish data, figures, and research outputs with DOIs. Official website: <a href='https://figshare.com/' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>https://figshare.com/</a>. It's a recommended tool for data sharing and archiving: <a href='./data-sharing-archiving.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>data-sharing-archiving.html</a>.";
    } else if (lowerCasePrompt.includes("what is owncloud tud") || lowerCasePrompt.includes("owncloud for tud") || lowerCasePrompt.includes("tud cloud storage")) {
        responseText = "OwnCloud TUD is a recommended tool for secure cloud storage specifically for TU Dresden users. It offers benefits like accessibility and syncing. Find more details on the <a href='./data-storage-backup.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>Data Storage & Backup page</a>.";
    } else if (lowerCasePrompt.includes("what are the latest llm tools") || lowerCasePrompt.includes("latest llm") || lowerCasePrompt.includes("new llm tools")) {
        responseText = "The 'What's New' page highlights Recent 2025 LLM Tools. You can find more information and links on this topic here: <a href='./whats-new.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>whats-new.html</a> (e.g., <a href='https://datacamp.com/blog/llmops-tools' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>datacamp.com/blog/llmops-tools</a>).";
    } else if (lowerCasePrompt.includes("what is gdpr for research") || lowerCasePrompt.includes("gdpr research") || lowerCasePrompt.includes("gdpr and research")) {
        responseText = "GDPR for Research refers to the General Data Protection Regulation's application to scientific research, outlining the legal framework for processing personal data. It's covered under EU & German Data Regulations: <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>data-management-regulations.html</a>.";
    } else if (lowerCasePrompt.includes("what are big data open source tools") || lowerCasePrompt.includes("open source big data tools")) {
        responseText = "The 'What's New' page features information on Big Data Open Source Tools. You can explore relevant resources and links on this topic: <a href='./whats-new.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>whats-new.html</a> (e.g., <a href='https://opensource.com/resources/big-data' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>opensource.com/resources/big-data</a>).";
    } else if (lowerCasePrompt.includes("what is opara") || lowerCasePrompt.includes("what is op ara")) {
        responseText = "OpARA is the open-access data repository at TU Dresden, recommended for data sharing and archiving. You can find it mentioned on the <a href='./data-sharing-archiving.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>Data Sharing & Archiving page</a>. For TU Dresden's official OpARA site, you might check the <a href='https://tu-dresden.de/forschung/services-forschende/forschungsdatenmanagement' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>TU Dresden Research Data Management page</a>.";
    } else if (lowerCasePrompt.includes("what are interoperability standards") || lowerCasePrompt.includes("interoperability standards")) {
        responseText = "Interoperability standards like FHIR, UCUM, LOINC, and SNOMED CT are crucial for consistent data exchange and management, especially in specific fields like health data. They are discussed on the <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>EU & German Data Regulations page</a>.";
    } else if (lowerCasePrompt.includes("what is the 3-2-1 backup strategy") || lowerCasePrompt.includes("3-2-1 backup")) {
        responseText = "The 3-2-1 backup strategy is a robust approach mentioned on the <a href='./data-storage-backup.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>Data Storage & Backup page</a>. It recommends having at least 3 copies of your data, stored on 2 different types of media, with 1 copy off-site for disaster recovery.";
    } else if (lowerCasePrompt.includes("what are the main resources") || lowerCasePrompt.includes("main resources")) {
        responseText = "The main resources provided by the PoL Data Management Corner include Data Management Regulations, Data Storage & Backup, and Data Sharing & Archiving. You can explore them on the <a href='./resources.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>Resources page</a>.";
    } else if (lowerCasePrompt.includes("what is metadata management") || lowerCasePrompt.includes("metadata")) {
        responseText = "Metadata Management is crucial for making data Findable and Interoperable (part of FAIR Principles). It involves creating and maintaining descriptive information about your data. This is covered in the <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>'EU & German Data Regulations' section</a>.";
    } else if (lowerCasePrompt.includes("what is image data management") || lowerCasePrompt.includes("image data")) {
        responseText = "Image Data Management is a specific topic addressed under EU & German Data Regulations, highlighting best practices for handling image-based research data. You can find more details here: <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>data-management-regulations.html</a>.";
    } else if (lowerCasePrompt.includes("what is fhir")) {
        responseText = "FHIR (Fast Healthcare Interoperability Resources) is an interoperability standard mentioned in the <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>'EU & German Data Regulations' page</a>, primarily for health data exchange.";
    } else if (lowerCasePrompt.includes("what is ucum")) {
        responseText = "UCUM (Unified Code for Units of Measure) is a standard for consistent measurement units, discussed on the <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>EU & German Data Regulations page</a>.";
    } else if (lowerCasePrompt.includes("what is loinc")) {
        responseText = "LOINC (Logical Observation Identifiers Names and Codes) is a standard for medical lab results, covered on the <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>EU & German Data Regulations page</a>.";
    } else if (lowerCasePrompt.includes("what is snomed ct")) {
        responseText = "SNOMED CT is a globally recognized clinical terminology for electronic health records, mentioned on the <a href='./data-management-regulations.html' target='_blank' class='text-blue-500 dark:text-blue-300 hover:underline'>EU & German Data Regulations page</a>.";
    } else {
        // Fallback response using a knowledge base search
        const found = KNOWLEDGE_BASE.find(item => item.toLowerCase().includes(lowerCasePrompt));
        if (found) {
            responseText = found;
        } else {
            responseText = "I'm sorry, I couldn't find specific information about that. Please try rephrasing your question or check the website for more details!";
        }
    }

    return responseText;
}

// Function to add a message to the chat container
function addMessage(message, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageClass = sender === 'user' ? 'justify-end' : 'justify-start';
    const messageBg = sender === 'user' ? 'bg-primary-blue text-white dark:bg-primary-blue' : 'bg-gray-200 dark:bg-dark-card dark:text-gray-200';
    const messageRounded = sender === 'user' ? 'rounded-l-xl rounded-br-xl' : 'rounded-r-xl rounded-bl-xl';

    const newMessageDiv = document.createElement('div');
    newMessageDiv.className = `flex ${messageClass} mb-4`;
    newMessageDiv.innerHTML = `
        <div class="max-w-[85%]">
            <div class="${messageBg} ${messageRounded} p-3 shadow-sm">
                ${message}
            </div>
        </div>
    `;
    messagesContainer.appendChild(newMessageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to handle sending a message from the chatbot
async function sendMessage() {
    const chatbotInput = document.getElementById('chatbot-input');
    const userMessage = chatbotInput.value.trim();

    if (userMessage === '') return;

    addMessage(userMessage, 'user');
    chatbotInput.value = '';

    const messagesContainer = document.getElementById('chatbot-messages');
    const typingIndicatorDiv = document.createElement('div');
    typingIndicatorDiv.id = 'typing-indicator';
    typingIndicatorDiv.className = 'flex justify-start mb-4 animate-pulse';
    typingIndicatorDiv.innerHTML = `
        <div class="bg-gray-200 dark:bg-dark-card dark:text-gray-200 p-3 rounded-r-xl rounded-bl-xl max-w-[85%] shadow-sm">
            <span class="animate-blink">Typing...</span>
        </div>
    `;
    messagesContainer.appendChild(typingIndicatorDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    const aiResponse = await callGeminiAPI(userMessage);

    messagesContainer.removeChild(typingIndicatorDiv); // Remove typing indicator
    addMessage(aiResponse, 'ai');
}


// Initialize the chatbot when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeChatbot);

function initializeChatbot() {
    const chatbotToggleBtn = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotSendButton = document.getElementById('chatbot-send-button');
    const chatbotInput = document.getElementById('chatbot-input');

    if (chatbotToggleBtn) {
        chatbotToggleBtn.addEventListener('click', () => {
            chatbotContainer.classList.toggle('hidden');
            chatbotToggleBtn.classList.toggle('bg-primary-blue');
            chatbotToggleBtn.classList.toggle('text-white');
        });
    }

    if (chatbotSendButton && chatbotInput) {
        chatbotSendButton.addEventListener('click', sendMessage);
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Add Tailwind CSS dark mode classes to the chatbot elements on initialization
    const htmlTag = document.documentElement;
    const isDarkMode = localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDarkMode) {
        htmlTag.classList.add('dark');
        // Ensure dynamically created elements also respect dark mode if needed
        // (already handled by dark: classes in innerHTML, but useful for direct manipulation)
    }
}
