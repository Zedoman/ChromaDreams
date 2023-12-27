const apiKey = "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"; //hugging face token
//Avradeep Nayak
const imageCount = 4;   // how many images we want
let selectImageNumber = null;
//Avradeep Nayak
// to generate random number between min and max
function getRandomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function disableGenerateButton(){
    document.getElementById("generate").disable = true;
}//Avradeep Nayak

function enableGenerateButton(){
    document.getElementById("generate").disable = false;
}//Avradeep Nayak

function clearImageGrid(){   // to clear the images after each generate button click...
    const imageGrid = document.getElementById("image-grid");
    imageGrid.innerHTML = "";
}//Avradeep Nayak



// generate images
async function generateImages(input){//Avradeep Nayak
    disableGenerateButton();
    clearImageGrid();

    const loading = document.getElementById("loading");
    loading.style.display = "block";

    const imageUrls = [];  // array to store all the image links
    for(let i = 0; i<imageCount; i++){
        const randomNum = getRandomNum(1, 1000);

        // all code below explaination at - https://huggingface.co/docs/api-inference/quicktour 
        const prompt = `${input} ${randomNum}`;
        const response = await fetch(
            "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
            {//Avradeep Nayak
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                },
                body: JSON.stringify({inputs: prompt}),
            }
        )
        if(!response.ok){
            alert("Unable to generate images...");
        }//Avradeep Nayak

        const result = await response.blob();  // blob is to get the response as promise
        const imageUrl = URL.createObjectURL(result);  // URL returns a newly created url which was given by response
        imageUrls.push(imageUrl);
        
        // Creating image elements 
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `art-${i + 1}`;
        img.onclick = () => downloadImage(imageUrl, i);
        document.getElementById("image-grid").appendChild(img);
    }//Avradeep Nayak
    loading.style.display = "none";
    enableGenerateButton();
    //Avradeep Nayak
    selectImageNumber = null;
}
//Avradeep Nayak

function downloadImage(imageUrl, imageNumbers){
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `image-${imageNumbers+1}.png`;
    link.click();
}//Avradeep Nayak

// event listener for generate button
document.getElementById("generate").addEventListener('click', ()=>{
    const input = document.getElementById("user-prompt").value;
    generateImages(input);
})//Avradeep Nayak
