// import bot from './assets/bot.svg';
// import user from './assets/user.svg';

// const form = document.querySelector('form');  //we got this without id bcz it's thr only form in index.html
// const chatContainer = document.querySelector('#chat_container');  //it should be the same id as in index.html

// let loadInterval;

// function loader(element) {
//   element.textContent = '';
//   loadInterval= setInterval(() => {
//     element.textContent += '.';  //adding dots in an interval

//     if(element.textContent === '....') {
//       element.textContent =''; //basically reseting back to 0
//     }
//   } , 300) //300ms time in between the appearance of those dots
// }

// //this is for letter by letter vy texting while answering
// function typeText(element, text) {
//   let index=0;

//   let  interval = setInterval( () => {
//     if(index <  text.length) { //if still typing,
//       element.innerHTML += text.charAt(index);
//       index++;
//     }
//     else {
//       clearInterval(interval);
//     }
//   }, 20)  //20ms in between the letter-occurances
// }

// // generate unique ID for each message div of bot
// // necessary for typing text effect for that specific reply
// // without unique ID, typing text will work on every element
// function generateUniqueId() {   

//   //we generate unique random id by current time and date, it is always unique

//   const timestamp = Date.now();
//   const randomNumber = Math.random(); //more random
//   const hexadecimalString = randomNumber.toString(16); //even more random

//   return `id-${timestamp}-${hexadecimalString}`;
// }

// // `` is a template string
// //with template strings, we can create spaces and  enters unlike regular strings
// function chatStripe(isAi, value, uniqueId) {
//   return (                                  //'ai' is a special class
//       `
//       <div class="wrapper ${isAi && 'ai'}"> 
//           <div class="chat">
//               <div class="profile">
//                   <img 
//                     src=${isAi ? bot : user} 
//                     alt="${isAi ? 'bot' : 'user'}" 
//                   />
//               </div>
//               <div class="message" id=${uniqueId}>${value}</div>
//           </div>
//       </div>
//   `
//   )
// }

// const handleSubmit = async (e) => {
//   e.preventDefault(); //to prevent the default behaviour of reloading

//   const data = new FormData(form);

//   // user's chatstripe
//   chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

//   // to clear the textarea input 
//   form.reset();

//   // bot's chatstripe
//   const uniqueId = generateUniqueId();
//   chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

//   // to focus scroll to the bottom 
//   chatContainer.scrollTop = chatContainer.scrollHeight;

//   // specific message div 
//   const messageDiv = document.getElementById(uniqueId);

//   // messageDiv.innerHTML = "..."
//   loader(messageDiv);


//   //fetch data from the server -> bot's response
//   const response = await fetch('http://localhost:5000', {
//   // const response = await fetch('https://codex-im0y.onrender.com/', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//           prompt: data.get('prompt')
//       })
//   })

//   clearInterval(loadInterval)
//   messageDiv.innerHTML = " "

//   if (response.ok) {
//       const data = await response.json();
//       const parsedData = data.bot.trim() // trims any trailing spaces/'\n' 

//       typeText(messageDiv, parsedData)
//   } else {
//       const err = await response.text()

//       messageDiv.innerHTML = "Something went wrong"
//       alert(err)
//   }
// }

// form.addEventListener('submit', handleSubmit)
// form.addEventListener('keyup', (e) => {
//   if (e.keyCode === 13) {
//       handleSubmit(e)
//   }
// }) 

import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')

let loadInterval

function loader(element) {
    element.textContent = ''

    loadInterval = setInterval(() => {
        // Update the text content of the loading indicator
        element.textContent += '.';

        // If the loading indicator has reached three dots, reset it
        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300);
}

function typeText(element, text) {
    let index = 0

    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index)
            index++
        } else {
            clearInterval(interval)
        }
    }, 20)
}

// generate unique ID for each message div of bot
// necessary for typing text effect for that specific reply
// without unique ID, typing text will work on every element
function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
    return (
        `
        <div class="wrapper ${isAi && 'ai'}">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${isAi ? bot : user} 
                      alt="${isAi ? 'bot' : 'user'}" 
                    />
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>
    `
    )
}

const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData(form)

    // user's chatstripe
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'))

    // to clear the textarea input 
    form.reset()

    // bot's chatstripe
    const uniqueId = generateUniqueId()
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

    // to focus scroll to the bottom 
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // specific message div 
    const messageDiv = document.getElementById(uniqueId)

    // messageDiv.innerHTML = "..."
    loader(messageDiv);

    //fetch data from the server -> bot's response

    // const response = await fetch('http://localhost:5000/', {
    const response = await fetch('https://codex-i0ts.onrender.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: data.get('prompt')
        })
    })

    clearInterval(loadInterval)
    messageDiv.innerHTML = " "

    if (response.ok) {
        const data = await response.json();
        const parsedData = data.bot.trim() // trims any trailing spaces/'\n' 

        typeText(messageDiv, parsedData)
    } else {
        const err = await response.text()

        messageDiv.innerHTML = "Something went wrong"
        alert(err)
    }
}

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e)
    }
})