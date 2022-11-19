import throttle from "lodash.throttle";

const STORAGE_KEY = "feedback-form-state";
const formData = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('input'),
    textarea: document.querySelector('textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInput, 500));

onFormRestart();

function onInput(evt) {
    formData[evt.target.name] = evt.target.value;
    const string = JSON.stringify(formData);
    localStorage.setItem(STORAGE_KEY, string);
}

function onFormSubmit(evt) {
    evt.preventDefault();
    console.log(formData);
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
};


function onFormRestart() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
        
    if (savedMessage) {
        JSON.parse(savedMessage, (a, b) => {
            if (a === refs.input.name) { refs.input.value = b } else
                if (a === refs.textarea.name) { refs.textarea.value = b }
        });
    };
};


