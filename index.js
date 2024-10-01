document.addEventListener("DOMContentLoaded", () => { 

    document.querySelector(".get-scheme-btn").addEventListener("click", () => { 

        const color = document.getElementById("color-selector").value.substring(1);
        const schemeType = document.getElementById("scheme-type").value;

        const url = `https://www.thecolorapi.com/scheme?hex=${color}&mode=${schemeType}&count=5`;

        fetch(url)
            .then(response => response.json())
            .then(data => {

                displayScheme(data.colors);

            })
            .catch(error => console.error("Error occurred fetching the color scheme", error));

    });

    function displayScheme(colors) {
        
        const colorContainer = document.querySelector(".color-scheme-container");
        colorContainer.innerHTML = "";
        const hexValueContainer = document.querySelector(".hex-value-container");
        hexValueContainer.innerHTML = "";

        colors.forEach(color => { 

            const colorDiv = document.createElement("div");
            colorDiv.style.backgroundColor = color.hex.value;
            colorDiv.classList.add("color-strip");

            const hexValue = document.createElement("p");
            hexValue.textContent = color.hex.value;
            hexValue.classList.add("color-hex-value");
            
            hexValue.addEventListener("click", () => { 

                copyToClipboard(color.hex.value);


            });

            colorContainer.appendChild(colorDiv);
            hexValueContainer.appendChild(hexValue);

        });

    }

    function copyToClipboard(text) {
        
        navigator.clipboard.writeText(text)
            .then(() => {
            
                alert(`Copied ${text} to clipboard`);

            }).catch(error => {
            
                console.error("Error occurred copying value to clipboard", error);

            });

    }

});