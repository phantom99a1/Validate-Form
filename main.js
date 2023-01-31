const username=document.querySelector('#username');
const email=document.querySelector('#email');
const password=document.querySelector('#password');
const confirmPassword=document.querySelector('#confirm-password');
const form=document.querySelector('form');

function showError(input, message){
    let parent=input.parentElement;
    let small=parent.querySelector('small');
    parent.classList.add('error');
    small.innerText= message;
}

function showSuccess(input){
    let parent=input.parentElement;
    let small=parent.querySelector('small');
    parent.classList.remove('error');
    small.innerText= '';
}

function checkEmptyError(listInput){
    let isEmptyError= false;
    listInput.forEach(input => {
        input.value=input.value.trim();
        if(!input.value){
            isEmptyError=true;
            showError(input,'Khong duoc de trong');
        }
        else{
            showSuccess(input);
        }
    });
    return isEmptyError
}

function checkEmailError(input){
    const regexEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    input.value=input.value.trim();
    
    let isEmailError= !regexEmail.test(input.value)
    if(regexEmail.test(input.value)){
        showSuccess(input);
    }
    else{
        showError(input,'Email valid')
    }
    return isEmailError;
};

function checkLengthError(input,min,max){
    input.value=input.value.trim()
    if(input.value<min){
        showError(input,`Phai co it nhat ${min} ky tu`)
        return true
    }
    else if(input.value>max){
        showError(input,`Khong duoc qua ${max} ky tu`)
        return true
    }
    return false
}

function checkMatchPasswordError(passwordInput,cfPassword){
    if(passwordInput.value!== cfPassword.value){
        showError(cfPassword,'Mat khau khong trung khop')
        return true
    }
    return false
}

form.addEventListener('submit',function(e){
    e.preventDefault();
    let isEmptyError=checkEmptyError([username,email,password,confirmPassword])
    let isEmailError=checkEmailError(email);
    let isUsernameLengthError=checkLengthError(username,3,10)
    let isPasswordLengthError= checkLengthError(password,3,20)
    let isMatchError= checkMatchPasswordError(password,confirmPassword)
})