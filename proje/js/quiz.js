const soruElementi = document.getElementById("soru");
const cevapButon = document.getElementById("cevaplar");
const ileriButon = document.getElementById("ileri");

let gecerliSoruIndex = 0;
let skor = 0;

function testeBasla(){
    gecerliSoruIndex = 0;
    skor = 0;
    ileriButon.innerHTML = "İleri";
    soruGetir();
}

function soruGetir(){
    reset();
    let gecerliSoru = sorular[gecerliSoruIndex];
    let soruNo = gecerliSoruIndex + 1;
    soruElementi.innerHTML = soruNo + ". " + gecerliSoru.soru;

    gecerliSoru.cevaplar.forEach(cevap => {
        const buton = document.createElement("button");
        buton.innerHTML = cevap.text;
        buton.classList.add("btn");
        cevapButon.appendChild(buton);
        if(cevap.dogru){
            buton.dataset.dogru = cevap.dogru;
        }
        buton.addEventListener("click", cevapSec);
    });
}
function cevapSec(e){
    const seciliButon = e.target;
    const dogrumu = seciliButon.dataset.dogru === "true";
    if(dogrumu){
        seciliButon.classList.add("dogru");
        skor++;
    } else {
        seciliButon.classList.add("yanlis");
    }
    Array.from(cevapButon.children).forEach(buton => {
        if(buton.dataset.dogru === "true"){
            buton.classList.add("dogru")
        }
        buton.disabled = true;
    });
    ileriButon.style.display = "block";
}
function reset(){
    ileriButon.style.display = "none";
    while(cevapButon.firstChild){
        cevapButon.removeChild(cevapButon.firstChild);
    }
}
function ileriButonAktifle(){
    gecerliSoruIndex++;
    if(gecerliSoruIndex < sorular.length){
        soruGetir();
    } else {
        skorGetir();
    }
}
function skorGetir(){
    reset();
    soruElementi.innerHTML = `Afferin Baba Yiğit Toplamda ${sorular.length} sorudan ${skor} doğru cevabın var.`;
    ileriButon.innerHTML = "Yeniden Oyna";
    ileriButon.style.display = "block";
}
ileriButon.addEventListener("click", () => {
    if(gecerliSoruIndex < sorular.length){
        ileriButonAktifle();
    } else {
        testeBasla();
    }
});
testeBasla();