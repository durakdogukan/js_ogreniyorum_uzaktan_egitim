var kelimeler = [
    "istanbul",
    "ankara",
    "kayseri",
    "izmir",
    "manisa",
    "bursa",
    "antalya",
    "trabzon",
    "samsun",
    "muğla",
    "konya"
]

let cevap = '';
let tahmin = [];
let hata = 0;
let maxYanlış = 6;
let durum = null;

document.getElementById('btnReset').style.visibility='hidden';


function butonlar() {
    let btnHTML = 'abcçdefgğhiıjklmnoöprsştuüvyz'.split('').map(harf =>
        `
      <button
        class="harfbuton"
        id='` + harf + `'
        onClick="tahminFonk('` + harf + `')"
      >
        ` + harf + `
      </button>
    `).join('');

    document.getElementById('klavye').innerHTML = btnHTML;
}

function randomKelime() {
    cevap = kelimeler[Math.floor(Math.random() * kelimeler.length)];
}

function tahminFonk(seçilenKelime) {
    tahmin.indexOf(seçilenKelime) === -1 ? tahmin.push(seçilenKelime) : null;
    document.getElementById(seçilenKelime).setAttribute('disabled', true);

    if (cevap.indexOf(seçilenKelime) >= 0) {
        tahminKelime();
        kazanmaKontrol();
    } else if (cevap.indexOf(seçilenKelime) === -1) {
        hata++;
        hataGüncelleme();
        kaybetmeKontrol();
        resmiGüncelle();
    }
}

function kazanmaKontrol() {
    if (durum === cevap) {
        document.getElementById('klavye').innerHTML = 'Tebrikler Kazandınız!';
    }
}

function resmiGüncelle() {
    document.getElementById('adamAsmaca Foto').src = './images/' + hata + '.jpg';
}

function hataGüncelleme() {
    document.getElementById('hata').innerHTML = hata;
}

function kaybetmeKontrol() {
    if (hata === maxYanlış) {
        document.getElementById('kelimeleriGoster').innerHTML = 'Cevap bu idi: ' + cevap;
        document.getElementById('klavye').innerHTML = 'Kaybettiniz!';
    }
}

function tahminKelime() {
    durum = cevap.split('').map(harf => (tahmin.indexOf(harf) >= 0 ? harf : " _ ")).join('');
    document.getElementById('kelimeleriGoster').innerHTML = durum;
}


function sıfırla() {
    hata = 0;
    tahmin = [];
    randomKelime();
    tahminKelime();
    hataGüncelleme();
    butonlar();
    document.getElementById('adamAsmaca Foto').src = './images/' + 0 + '.jpg';
    document.getElementById('btnBasla').style.visibility='hidden';
}

function basla(){
    randomKelime();
    butonlar();
    tahminKelime();
    hataGüncelleme();
    document.getElementById('btnBasla').style.visibility='hidden';
    document.getElementById('btnReset').style.visibility='visible';
    document.getElementById('btnReset').style.marginRight='8%';
}
