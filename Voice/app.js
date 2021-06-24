//Init speechsynthesis API
const synth = window.speechSynthesis;

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

//Init voices array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();

    //Loop through the voices and create option for each
    voices.forEach(voice =>{
        const option = document.createElement('option');
        option.textContent = voice.name + '(' + voice.lang + ')';
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option); 

    });
}
getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

//Speak
const speak = () =>{
    //Check if already speaking
    if(synth.speaking){
        console.error("Already speaking");
        return;
    } 
    if(textInput.value !== ''){
        //Get Speak Text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        //Speak end
        speakText.onend = e =>{
            console.log('Done Speaking');
        }
        //Speak error
        speakText.onerror = e => {
            console.log("Something went wrong");
        }
        //Selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        //Loop through voices
        voices.forEach(voice => {
            if(voice.name === selectedVoice){
                speakText.voice = voice;
            }
        })

        //Set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        //speak
        synth.speak(speakText);
    }

};

//Event listeners

//textform submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

//rate value change
rate.addEventListener('change', e => rateValue.textContent = rate.value);

//pitch value change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

//voice select change
voiceSelect.addEventListener('change', e => speak());

//range-slider-css


