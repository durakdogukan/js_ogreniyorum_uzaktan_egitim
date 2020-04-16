window.onload = init;

function init() {
    document.getElementById("benimFormum").onsubmit = validateForm;
    document.getElementById("btnReset").onclick = clearForm;
    document.getElementById("txtAd").focus();
}

function validateForm(theForm) {
    with(theForm) {
        return (bosKontrol(txtAd, "Lütfen adınızı giriniz!", adHatasi)
            && bosKontrol(txtSoyad, "Lütfen soyadınızı giriniz!", soyadHatasi)
            && uzunlukMinMax(txtTCno, 11, 11, "Lütfen 11 haneli T.C. Kimlik numaranızı giriniz!", tcNohatasi)
            && sayısalKontrol(txtPostakodu, "Lütfen 5 haneli posta kodunuzu giriniz!", postaKoduHatasi)
            && uzunlukMinMax(txtPostakodu, 5, 5, "Lütfen 5 haneli posta kodunuzu giriniz!", postaKoduHatasi)
            && secimKontrol(secimUlke, "Lütfen seçim yapınız!", ulkeHatasi)
            && checkKontrol("gender", "Lütfen cinsiyetinizi seçiniz!", cinsiyetHatasi)
            && sayısalKontrol(txtPhone, "Lütfen telefon numaranızı giriniz!", telefonHatasi)
            && emailKontrol(txtEmail, "Lütfen e mail adresinizi giriniz", emailHatasi)
            && sifreKontrol(txtPassword, "6-8 karakterlik şifre giriniz!", sifreHatasi)
            && sifreDogrulama(txtPassword, txtPWVerified, "Girdiğiniz şifre farklı !",sifredogrulamaHatasi)
        );
    }
}

function bosKontrol(inputElm, errMsg, errElm) {
    var isValid = (inputElm.value.trim() !== "");
    postValidate(isValid, errMsg, errElm, inputElm);
    return isValid;
}

function sayısalKontrol(inputElm, errMsg, errElm) {
    var isValid = (inputElm.value.trim().match(/^\d+$/) !== null);
    postValidate(isValid, errMsg, errElm, inputElm);
    return isValid;
}""

function uzunlukMinMax(inputElm, minLength, maxLength, errMsg, errElm) {
    var inputValue = inputElm.value.trim();
    var isValid = (inputValue.length >= minLength) && (inputValue.length <= maxLength);
    postValidate(isValid, errMsg, errElm, inputElm);
    return isValid;
}

function emailKontrol(inputElm, errMsg, errElm) {
    var isValid = (inputElm.value.trim().match(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) !== null);
    postValidate(isValid, errMsg, errElm, inputElm);
    return isValid;
}

function secimKontrol(selectElm, errMsg, errElm) {
    var isValid = (selectElm.value !== "");
    postValidate(isValid, errMsg, errElm, selectElm);
    return isValid;
}

function checkKontrol(inputName, errMsg, errElm) {
    var elms = document.getElementsByName(inputName);
    var checkKontrol = false;
    for (var i = 0; i < elms.length; ++i) {
        if (elms[i].checked) {
            checkKontrol = true;
            break;
        }
    }
    postValidate(checkKontrol, errMsg, errElm, null);
    return checkKontrol;
}

function sifreKontrol(inputElm, errMsg, errElm) {
    var isValid = (inputElm.value.trim().match(/^\w{6,8}$/) !== null);
    postValidate(isValid, errMsg, errElm, inputElm);
    return isValid;
}

function sifreDogrulama(pwElm, pwVerifiedElm, errMsg, errElm) {
    var isTheSame = (pwElm.value === pwVerifiedElm.value);
    postValidate(isTheSame, errMsg, errElm, pwVerifiedElm);
    return isTheSame;
}

function clearForm() {
    var elms = document.querySelectorAll('.errorBox');
    for (var i = 0; i < elms.length; i++) {
        elms[i].classList.remove("errorBox");
    }

    elms = document.querySelectorAll('[id$="Error"]');
    for (var i = 0; i < elms.length; i++) {
        elms[i].innerHTML = "";
    }

    document.getElementById("txtAd").focus();
}

function postValidate(isValid, errMsg, errElm, inputElm) {
    if (!isValid) {
        if (errElm !== undefined && errElm !== null
            && errMsg !== undefined && errMsg !== null) {
            errElm.innerHTML = errMsg;
        }
        if (inputElm !== undefined && inputElm !== null) {
            inputElm.classList.add("errorBox");  //
            inputElm.focus();
        }
    } else {
        if (errElm !== undefined && errElm !== null) {
            errElm.innerHTML = "";
        }
        if (inputElm !== undefined && inputElm !== null) {
            inputElm.classList.remove("errorBox");
        }
    }
}