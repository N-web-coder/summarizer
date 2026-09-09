const text = document.getElementById("text");
const style = document.getElementById("style");
const length = document.getElementById("length");

const summarizeBtn = document.getElementById("summarizeBtn");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");

const resultCard = document.getElementById("resultCard");
const summary = document.getElementById("summary");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const characters = document.getElementById("characters");
const words = document.getElementById("words");

const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");

const documentStats = document.getElementById("documentStats");
const resultCharacters = document.getElementById("resultCharacters");
const resultWords = document.getElementById("resultWords");
const resultChunks = document.getElementById("resultChunks");

// const downloadTxtBtn = document.getElementById("downloadTxtBtn");
// const downloadDocxBtn = document.getElementById("downloadDocxBtn");


// ===============================
// TEXT STATISTICS
// ===============================

function updateStats() {

    const value = text.value.trim();

    characters.textContent =
        `${text.value.length} characters`;

    const wordCount =
        value === ""
            ? 0
            : value.split(/\s+/).length;

    words.textContent =
        `${wordCount} words`;
}


// Update statistics while typing
text.addEventListener("input", updateStats);


// ===============================
// FILE SELECT
// ===============================

fileInput.addEventListener("change", () => {

    if (fileInput.files.length > 0) {

        const file = fileInput.files[0];

        fileName.textContent =
            `Selected file: ${file.name}`;

        // Clear pasted text
        text.value = "";

        updateStats();
    }

});


// ===============================
// CLEAR BUTTON
// ===============================

clearBtn.addEventListener("click", () => {

    text.value = "";

    fileInput.value = "";

    fileName.textContent = "";

    summary.textContent = "";

    error.textContent = "";

    resultCard.classList.add("hidden");

    error.classList.add("hidden");

    loading.classList.add("hidden");

    documentStats.classList.add("hidden");

    resultCharacters.textContent = "0";

    resultWords.textContent = "0";

    resultChunks.textContent = "0";

    summarizeBtn.disabled = false;

    summarizeBtn.textContent = "Summarize";

    updateStats();

});


// ===============================
// SUMMARIZE BUTTON
// ===============================

summarizeBtn.addEventListener("click", async () => {

    const textValue = text.value.trim();

    const selectedStyle = style.value;

    const selectedLength = length.value;


    // Show result card
    resultCard.classList.remove("hidden");


    // Reset previous result
    summary.textContent = "";

    error.textContent = "";

    error.classList.add("hidden");

    documentStats.classList.add("hidden");

    loading.classList.remove("hidden");

    summarizeBtn.disabled = true;

    summarizeBtn.textContent = "Generating...";


    try {

        let response;


        // ==================================
        // FILE UPLOAD
        // ==================================

        if (fileInput.files.length > 0) {

            const file = fileInput.files[0];

            const formData = new FormData();

            formData.append(
                "file",
                file
            );

            formData.append(
                "style",
                selectedStyle
            );

            formData.append(
                "length",
                selectedLength
            );


            response = await fetch(
                "/api/summarize-file",
                {
                    method: "POST",
                    body: formData
                }
            );

        }


        // ==================================
        // NORMAL TEXT
        // ==================================

        else {

            if (textValue.length < 20) {

                throw new Error(
                    "Please enter at least 20 characters or upload a file."
                );

            }


            response = await fetch(
                "/api/summarize",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        text: textValue,

                        style: selectedStyle,

                        length: selectedLength

                    })
                }
            );

        }


        // ==================================
        // RESPONSE
        // ==================================

        const data = await response.json();


        if (!response.ok || !data.success) {

            throw new Error(
                data.error ||
                "Unable to generate summary."
            );

        }


        // ==================================
        // SHOW SUMMARY
        // ==================================

        summary.textContent =
            data.summary;


        // ==================================
        // DOCUMENT STATISTICS
        // ==================================

        resultCharacters.textContent =
            data.characters || 0;

        resultWords.textContent =
            data.words || 0;

        resultChunks.textContent =
            data.chunks || 1;


        documentStats.classList.remove(
            "hidden"
        );


    }

    catch (err) {

        error.textContent =
            err.message;

        error.classList.remove(
            "hidden"
        );

    }

    finally {

        loading.classList.add(
            "hidden"
        );

        summarizeBtn.disabled = false;

        summarizeBtn.textContent =
            "Summarize";

    }

});


// ===============================
// COPY BUTTON
// ===============================

copyBtn.addEventListener(
    "click",
    async () => {

        const value =
            summary.textContent.trim();


        if (!value) {
            return;
        }


        try {

            await navigator.clipboard.writeText(
                value
            );


            copyBtn.textContent =
                "Copied!";


            setTimeout(() => {

                copyBtn.textContent =
                    "Copy";

            }, 1500);


        }

        catch (err) {

            copyBtn.textContent =
                "Failed";


            setTimeout(() => {

                copyBtn.textContent =
                    "Copy";

            }, 1500);

        }

    }
);


// ===============================
// DOWNLOAD TXT
// ===============================

// downloadTxtBtn.addEventListener(
//     "click",
//     async () => {

//         const value =
//             summary.textContent.trim();


//         if (!value) {
//             return;
//         }


//         try {

//             const response = await fetch(
//                 "/api/download/txt",
//                 {
//                     method: "POST",

//                     headers: {
//                         "Content-Type":
//                             "application/json"
//                     },

//                     body: JSON.stringify({
//                         summary: value
//                     })
//                 }
//             );


//             if (!response.ok) {

//                 throw new Error(
//                     "Failed to download TXT file."
//                 );

//             }


//             const blob =
//                 await response.blob();


//             const url =
//                 window.URL.createObjectURL(
//                     blob
//                 );


//             const link =
//                 document.createElement("a");


//             link.href = url;

//             link.download =
//                 "summary.txt";


//             document.body.appendChild(
//                 link
//             );

//             link.click();

//             link.remove();


//             window.URL.revokeObjectURL(
//                 url
//             );

//         }

//         catch (err) {

//             error.textContent =
//                 err.message;

//             error.classList.remove(
//                 "hidden"
//             );

//         }

//     }
// );


// ===============================
// DOWNLOAD DOCX
// ===============================

// downloadDocxBtn.addEventListener(
//     "click",
//     async () => {

//         const value =
//             summary.textContent.trim();


//         if (!value) {
//             return;
//         }


//         try {

//             const response = await fetch(
//                 "/api/download/docx",
//                 {
//                     method: "POST",

//                     headers: {
//                         "Content-Type":
//                             "application/json"
//                     },

//                     body: JSON.stringify({
//                         summary: value
//                     })
//                 }
//             );


//             if (!response.ok) {

//                 throw new Error(
//                     "Failed to download DOCX file."
//                 );

//             }


//             const blob =
//                 await response.blob();


//             const url =
//                 window.URL.createObjectURL(
//                     blob
//                 );


//             const link =
//                 document.createElement("a");


//             link.href = url;

//             link.download =
//                 "summary.docx";


//             document.body.appendChild(
//                 link
//             );

//             link.click();

//             link.remove();


//             window.URL.revokeObjectURL(
//                 url
//             );

//         }

//         catch (err) {

//             error.textContent =
//                 err.message;

//             error.classList.remove(
//                 "hidden"
//             );

//         }

//     }
// );


// ===============================
// INITIAL STATE
// ===============================

updateStats();