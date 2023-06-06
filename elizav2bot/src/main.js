//alert('Hello World')

//grab all the html id's in order do documentgetelementbyid
const chatresponse = document.querySelector('.answer');
const chatinput = document.getElementById('inputquestion');
const buttonsubmit = document.querySelector('.submitbutton');
const loading = document.getElementById('loading');
const chathistory = document.createElement('div');
const chatlist = document.getElementById('chatting');
const subbutton = document.getElementById('submittingbutton')

//api configuration
// const { Configuration, OpenAIApi } = require('openai');
import { Configuration, OpenAIApi } from 'openai';


const configuration = new Configuration({
    // apiKey: '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',
    // apiKey: "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",
    apiKey: "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"
    // process.env.OPENAI_API_KEY,
    //organisation: org key
})
const openai = new OpenAIApi(configuration)

//chatbot context
let convoHist = [{
    role: "system",
    content: `You are a friendly and knowledgeable chatbot named pixel. You are present on a showcase website of the crand called Chroma, that sells artwork from independent artists in digital and print forms. Your soul mission is to be of help to the clients that visit the website in order to provide the best and most personalised experience possible, and answer all their questions, if you do not have an answer to one of the questions you may provide the client with the customer service email which is: chroma@customerservice.com . We offer 3 different frame sizes which are 10″ x 8″, 10″ x 12″, and 16″ x 20″, if the client whishes to have a personalised frame size ask them the details of the print wantedsuch as the artist and frame size and then provide them with the customer support email. The prices for the three frames respectively are between 200 - 400*€, between 350 - 570€, and between 540 - 890€. Some of our artists include: Avery Benson, Cameron Lane, Delaney Reyes, Elliot Parker, Fiona Cooper, Georgia Lee, Jasper Reid, Kieran Flynn, Landon Hayes and Nico Ruiz. The different styles of photography used at Chroma Studio are: Film photography, Digital photography, Polaroid photography, Disposable camera photography, Smartphone photography, and Instant camera photography. You are to only talk about the website's subject and help the client with their needs, if they change the subject remind them politely that you are only used for helping them on the website. You are only to inform the client of this information if they ask for it, when first interacting with the customer you may display this message: Hello! I'm Pixel, your friendly chatbot. How can I assist you today? If you need help finding the perfect framed photography for your space, I can guide you through our collection and provide recommendations based on your preferences.`,
}];


//creating the prompting function for the question input and output
const prompting = async () => {
    //setting a loading spinner
    subbutton.classList.add("visually-hidden");
    loading.classList.remove("visually-hidden");
    
    const input = chatinput.value
    console.log(typeof input)
    convoHist.push({
        role: "user",
        content: input
    }); //update the conversation log with the chat response
    console.log(convoHist)

    //output function (maybe try a try and catch for error catching just in case)
    const output = await openai
        .createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: convoHist,
            max_tokens: 100, //important to limit the token usage
        }).catch((err) => {
            console.log("ChatBot Error:", err)
        });
    chathistory.innerHTML = `<li class="chathist"><b>😃 Me:</b> ${input}</li>
    </br>
    <li class="chatcurrent"><b>🤖 Pixel:</b> ${output.data.choices[0].message.content}</li>`
    chatlist.append(chathistory)
    // chatresponse.innerHTML = `<div class="displayanswer">${output.data.choices[0].message.content}</div>`

    const answer = output.data.choices[0].message.content
    convoHist.push({ role: "system", content: answer });

    //Stop loading spinner
    subbutton.classList.remove("visually-hidden");
    loading.classList.add("visually-hidden");
    
}

// buttonsubmit.addEventListener('click', prompting)
if (buttonsubmit) {
    buttonsubmit.addEventListener('click', () => {
    prompting()
    //alert('button clicked')
    //buttonsubmit.classList.add("button--loading")
    })
}