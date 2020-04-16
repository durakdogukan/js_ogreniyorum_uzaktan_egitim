var alisveris = {
  items: [],
  ekle: function (evt) {
    evt.preventDefault();
    var item = document.getElementById('urun-ekle').value;

    if(item.length==0){
        alert("Lütfen ürün adı giriniz !");
      return;
    }

    alisveris.items.push({
      name: item,
      done: false
    });

    item.value = "";
    alisveris.yaz();
    alisveris.kaydet();
  },

  kaydet: function () {

    if (localStorage.items == undefined) {
      localStorage.items = "[]";
    }

    localStorage.items = JSON.stringify(alisveris.items);
  },

  sil: function () {

    if (confirm("Silinsin mi?")) {
      alisveris.items.splice(this.dataset.id, 1);
      alisveris.kaydet();
      alisveris.yaz();
    }
  },

  yaz: function () {

    var container = document.getElementById('alisveris-listesi');
    container.innerHTML = "";
    if (alisveris.items.length > 0) {
      var row = "", button = "";
      for (let i in alisveris.items) {

        row = document.createElement("div");
        row.innerHTML = alisveris.items[i].name;

        if (alisveris.items[i].done) {
          row.style = "text-decoration:line-through;";
          row.style = 'right;';
        }
        container.appendChild(row);

        row = document.createElement("div");
        button = document.createElement("input");
        button.type = "button";
        button.value = "Sil";
        button.setAttribute("class", "test1");
        button.dataset.id = i;
        button.addEventListener("click", alisveris.sil);
        row.appendChild(button);
        container.appendChild(row);
      }
    }
  },

  geriGetir: function () {

    if (localStorage.items == undefined) {
      localStorage.items = "[]";
    }

    alisveris.items = JSON.parse(localStorage.items);

    alisveris.yaz();
  }

};

function herseyiSil() {
   document.getElementById('alisveris-listesi').innerHTML='';
   localStorage.clear();
   location.reload();
}

window.addEventListener("load", function () {
  alisveris.geriGetir();
  document.getElementById("alisveris-ekle").addEventListener("submit", alisveris.ekle);

});