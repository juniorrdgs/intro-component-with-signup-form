let regex = /^([A-z0-9._-]{2,})(@[A-z0-9]{2,})(.[A-z0-9]{2,})(.[A-z0-9]{2,})?$/g;

let formValidator = {
    handleSubmit: (event) => {
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');

        formValidator.clearErrors();

        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = formValidator.checkInput(input);
            if (check !== true) {
                send = false;
                formValidator.showError(input, check);
            }
        }
        if (send) {
            form.submit();
        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');

        if (rules !== null) {
            rules = rules.split('|');
            for (let k in rules) {
                let rDetails = rules[k].split('=');
                switch (rDetails[0]) {
                    case 'required':
                        if (input.value == '') {
                            return `${input.placeholder} cannot be empty.`;
                        }
                        break;
                    case 'regex':
                        if (!regex.test(input.value)) {
                            return 'Looks like this is not an email';
                        }
                        break;
                }
            }
        }

        return true;
    },
    showError: (input, error) => {
        input.style.border = '1px solid hsl(0, 100%, 74%)';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors: () => {
        let inputs = form.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }
};

let form = document.querySelector('.form');
form.addEventListener('submit', formValidator.handleSubmit);

function termsClick() {
    alert("You have clicked to read our Terms and Services documentation.")
}