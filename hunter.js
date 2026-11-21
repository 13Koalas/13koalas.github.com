function hunterPage() {
  return `<section class="hunter" aria-labelledby="hunter-game-title">
    <div class="hunter-heading">
      <div>
        <h1 id="hunter-game-title" tabindex="-1">Fiilimsi Avcısı</h1>
        <p>Cümledeki işaretli kelimeyi incele ve türünü seç.</p>
      </div>
      <button class="option" id="tamEkran">Tam ekran</button>
    </div>
    <section id="giris">
      <div class="kart">
        <h2>Nasıl ilerleyelim?</h2>
        <p>Sorular, seviyeleri seçtiğin sırayla gelir. Seçimini kaldırmak için aynı seviyeye tekrar dokun.</p>
        <div class="seviyeler">
          <button class="option seviye" data-s="kolay" aria-pressed="false"><span class="rozet"></span>Kolay<small>Temel ekler</small></button>
          <button class="option seviye" data-s="orta" aria-pressed="false"><span class="rozet"></span>Orta<small>Karışık ekler ve ilk tuzaklar</small></button>
          <button class="option seviye" data-s="zor" aria-pressed="false"><span class="rozet"></span>Zor<small>Zor ekler ve çok tuzak</small></button>
        </div>
        <p class="sira" id="siraYazi" role="status">Önce bir seviye seç.</p>
        <button class="primary" id="baslaBtn" disabled>Oyuna başla</button>
      </div>

      <div class="kart">
        <h2>Önce kuralları hatırla</h2>
        <div class="hunter-table"><table>
          <tbody><tr><th>Tür</th><th>Ekler</th><th>Örnek</th></tr>
          <tr><td>İsim-fiil</td><td>-mak/-mek, -ma/-me, -ış/-iş/-uş/-üş</td><td>okumak, yürüyüş</td></tr>
          <tr><td>Sıfat-fiil</td><td>-an/-en, -dık/-dik, -acak/-ecek, -mış/-miş, -ar/-er, -maz/-mez</td><td>gelen, yapılacak</td></tr>
          <tr><td>Zarf-fiil</td><td>-arak/-erek, -ıp/-ip, -ınca/-ince, -dıkça, -madan/-meden, -ken, -alı/-eli, -a/-e, -maksızın</td><td>koşarak, bitirince</td></tr>
        </tbody></table></div>
        <p style="margin-bottom:0">Dikkat: bazı kelimeler fiilimsi gibi görünür ama değildir. Çekimli fiiller ve fiilden türemiş isimler tuzaktır!</p>
      </div>
    </section>
    <section id="oyun" hidden>
      <div class="ust">
        <span id="canlar" role="img" aria-label="Kalan can: 3">Can <strong aria-hidden="true">‽‽‽</strong></span>
        <span>Puan <strong id="puan">0</strong></span>
        <span>Seri <strong id="seri">0</strong></span>
      </div>
      <div class="ilerleme progressbar" role="progressbar" aria-label="Cevaplanan soru" aria-valuemin="0" aria-valuenow="0"><div id="bar"></div></div>
      <div class="kart" id="soruKart">
        <p class="soru" id="sayac" tabindex="-1"></p>
        <p class="cumle" id="cumle"></p>
        <p class="soru">İşaretli kelime hangisi?</p>
        <div class="options secenekler" id="secenekler"></div>
        <div class="feedback" id="geri" role="status" hidden></div>
        <button class="primary" id="sonraki" hidden>Sonraki soru</button>
      </div>
    </section>
    <section id="bitis" class="kart" hidden>
      <h2 id="bitisBaslik" tabindex="-1"></h2>
      <p class="buyuk" id="bitisPuan"></p>
      <p id="bitisDetay" style="font-weight:800"></p>
      <p id="bitisMesaj"></p>
      <button class="primary" id="tekrarBtn">Seviyeleri yeniden seç</button>
    </section>
  </section>`;
}

function mountHunter(root) {
  const SORULAR = [
    // ---------- KOLAY ----------
    ["kolay", "{Koşarak} okula yetişti.", "zarf", "-arak eki: Zarf-fiil. Yetişme işinin nasıl olduğunu anlatıyor."],
    ["kolay", "{Okumak} güzel bir alışkanlıktır.", "isim", "-mak eki: İsim-fiil. Cümlede isim gibi (özne) kullanılmış."],
    ["kolay", "{Gelen} misafirleri karşıladık.", "sifat", "-en eki: Sıfat-fiil. 'Misafirleri' adını niteliyor."],
    ["kolay", "Ali okula {gitti}.", "degil", "-ti çekim ekidir (geçmiş zaman). Çekimli fiil olduğu için fiilimsi DEĞİL."],
    ["kolay", "Ders {çalışırken} müzik dinleme.", "zarf", "-ken eki: Zarf-fiil. İki işin aynı anda yapıldığını gösteriyor."],
    ["kolay", "{Yürüyüş} sağlığa çok faydalıdır.", "isim", "-üş eki: İsim-fiil. Özne gibi kullanılmış."],
    ["kolay", "Kitabı {bitirince} bana ver.", "zarf", "-ince eki: Zarf-fiil. 'Ver' fiilinin zamanını bildiriyor."],
    ["kolay", "{Akan} sular durulur.", "sifat", "-an eki: Sıfat-fiil. 'Sular' adını niteliyor."],
    ["kolay", "Çocuklar bahçede {oynuyor}.", "degil", "-yor çekim ekidir (şimdiki zaman). Fiilimsi DEĞİL."],
    ["kolay", "{Yüzmek} çok güzel bir spordur.", "isim", "-mek eki: İsim-fiil. Cümlenin öznesi."],
    // ---------- ORTA ----------
    ["orta", "Yarın {yapılacak} sınava hazırlanıyorum.", "sifat", "-acak eki: Sıfat-fiil. 'Sınav' adını niteliyor."],
    ["orta", "{Konuşma} sırası sende.", "isim", "-ma eki: İsim-fiil. İşin adını bildiriyor."],
    ["orta", "{Okunmuş} kitapları rafa dizdi.", "sifat", "-mış eki: Sıfat-fiil. 'Kitapları' adını niteliyor."],
    ["orta", "{Güldükçe} içim ısınıyor.", "zarf", "-dıkça eki: Zarf-fiil. Tekrar eden bir durumu anlatıyor."],
    ["orta", "{Gördüğüm} film çok güzeldi.", "sifat", "-dık eki: Sıfat-fiil. 'Film' adını niteliyor."],
    ["orta", "Sınıfa {girmeden} önce ayakkabılarını temizle.", "zarf", "-madan eki: Zarf-fiil. Fiilin zamanını bildiriyor."],
    ["orta", "{Yazıp} çizmeyi çok severim.", "zarf", "-ıp eki: Zarf-fiil. Sonraki fiile bağlanıyor."],
    ["orta", "Çocuk {gülmeye} başladı.", "isim", "-me eki + yönelme hâli: İsim-fiil. İsim gibi çekimlenmiş."],
    ["orta", "Annem {yemek} pişirdi.", "degil", "TUZAK! Bu 'yemek' yiyecek anlamında bir isim. İş bildiren -mek eki değil.", 1],
    ["orta", "Babamın {geliri} bu yıl arttı.", "degil", "TUZAK! 'Gelir' kazanç demek, isimdir. Gelmek fiilinden türemiş bir isim.", 1],
    // ---------- ZOR ----------
    ["zor", "{Güler} yüzlü satıcı herkese yardım etti.", "sifat", "-er eki: Sıfat-fiil. 'Yüz' adını niteliyor, çekimli fiil değil."],
    ["zor", "{Gelenler} salona geçti.", "sifat", "-en eki: Sıfat-fiil. Adın yerini tutmuş (adlaşmış) ve çoğul eki almış."],
    ["zor", "Soru {sormaksızın} dışarı çıktı.", "zarf", "-maksızın eki: Zarf-fiil. 'Çıktı' fiilinin nasıl olduğunu anlatıyor."],
    ["zor", "{Gideli} üç yıl oldu.", "zarf", "-eli eki: Zarf-fiil. Zaman bildiriyor."],
    ["zor", "{Koşa koşa} eve geldi.", "zarf", "-a eki: Zarf-fiil. Tekrarlanarak 'nasıl geldi?' sorusunu cevaplıyor."],
    ["zor", "{Sevgi} insanı güçlü kılar.", "degil", "TUZAK! 'Sevgi' sevmek kökünden türemiş bir isimdir. -gi yapım ekidir, fiilimsi eki değil.", 1],
    ["zor", "{Koşu} pistinde antrenman yaptık.", "degil", "TUZAK! 'Koşu' -u ekiyle türemiş bir isimdir. Fiilimsi değil.", 1],
    ["zor", "{Yazar} yeni kitabını tanıttı.", "degil", "TUZAK! Burada 'yazar' bir meslek adı. Fiilimsi değil.", 1],
    ["zor", "{Görür görmez} ona koştu.", "zarf", "-ır ... -maz ekleri: Zarf-fiil. 'Koştu' fiilinin zamanını bildiriyor."],
    ["zor", "{Gülüşü} herkesi etkiledi.", "isim", "-üş eki: İsim-fiil. İşin adı olarak özne olmuş."]
  ].map(([sev, cumle, tur, ac, tuzak]) => ({ sev, cumle, tur, ac, tuzak: !!tuzak }));

  const TURLER = { isim: "İsim-fiil", sifat: "Sıfat-fiil", zarf: "Zarf-fiil", degil: "Fiilimsi değil" };
  const SEV_AD = { kolay: "Kolay", orta: "Orta", zor: "Zor" };
  const CAN_SAYISI = 3;

  let secim = [];
  let liste, sira, puan, can, seri, dogru, cevaplandi;
  const $ = id => root.querySelector("#" + id);

  function karistir(dizi) {
    for (let i = dizi.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [dizi[i], dizi[j]] = [dizi[j], dizi[i]];
    }
    return dizi;
  }

  function ekranGoster(ad) {
    ["giris", "oyun", "bitis"].forEach(e => $(e).hidden = (e !== ad));
    root.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  function secimGuncelle() {
    root.querySelectorAll(".seviye").forEach(b => {
      const i = secim.indexOf(b.dataset.s);
      b.classList.toggle("secili", i >= 0);
      b.setAttribute("aria-pressed", i >= 0);
      b.querySelector(".rozet").textContent = i >= 0 ? i + 1 : "";
    });
    const n = SORULAR.filter(q => secim.includes(q.sev)).length;
    $("siraYazi").textContent = secim.length
      ? "Sıra: " + secim.map(s => SEV_AD[s]).join(" → ") + "  (" + n + " soru)"
      : "Önce bir seviye seç.";
    $("baslaBtn").disabled = secim.length === 0;
  }

  root.querySelectorAll(".seviye").forEach(b => {
    b.addEventListener("click", () => {
      const s = b.dataset.s;
      if (secim.includes(s)) secim = secim.filter(x => x !== s);
      else secim.push(s);
      secimGuncelle();
    });
  });

  function basla() {
    liste = secim.flatMap(s => karistir(SORULAR.filter(q => q.sev === s)));
    sira = 0; puan = 0; can = CAN_SAYISI; seri = 0; dogru = 0;
    ekranGoster("oyun");
    soruGoster();
  }

  function durumYaz() {
    const canlar = $("canlar");
    canlar.querySelector("strong").textContent = "‽".repeat(can);
    canlar.setAttribute("aria-label", "Kalan can: " + can);
    $("puan").textContent = puan;
    $("seri").textContent = seri;
    const answered = sira + (cevaplandi ? 1 : 0);
    const bar = $("bar");
    bar.style.width = (answered / liste.length * 100) + "%";
    bar.parentElement.setAttribute("aria-valuemax", liste.length);
    bar.parentElement.setAttribute("aria-valuenow", answered);
  }

  function soruGoster() {
    cevaplandi = false;
    const s = liste[sira];
    $("cumle").innerHTML = s.cumle.replace(/\{(.+?)\}/g, "<mark>$1</mark>");
    $("sayac").innerHTML = '<span class="chip ' + s.sev + '">' + SEV_AD[s.sev] + "</span>Soru " + (sira + 1) + " / " + liste.length;
    $("geri").hidden = true;
    $("sonraki").hidden = true;

    const kutu = $("secenekler");
    kutu.innerHTML = "";
    Object.keys(TURLER).forEach(anahtar => {
      const b = document.createElement("button");
      b.className = "option";
      b.textContent = TURLER[anahtar];
      b.dataset.tur = anahtar;
      b.addEventListener("click", () => cevapla(anahtar));
      kutu.appendChild(b);
    });
    durumYaz();
    $("sayac").focus();
  }

  function cevapla(secilen) {
    if (cevaplandi) return;
    cevaplandi = true;
    const s = liste[sira];
    const dogruMu = secilen === s.tur;

    if (dogruMu) {
      dogru++; seri++;
      puan += 10 + (seri >= 3 ? 5 : 0);
    } else {
      seri = 0; can--;
    }

    root.querySelectorAll("#secenekler button").forEach(b => {
      b.disabled = true;
      if (b.dataset.tur === s.tur) b.classList.add("dogru");
      else if (b.dataset.tur === secilen) b.classList.add("yanlis");
    });

    const geri = $("geri");
    geri.hidden = false;
    geri.className = dogruMu ? "feedback good" : "feedback";
    geri.innerHTML = (s.tuzak ? '<span class="tuzak">Tuzak soruydu!</span><br>' : "") +
      (dogruMu ? '<b class="d">Doğru!</b> ' : '<b class="y">Yanlış.</b> Doğru cevap: ' + TURLER[s.tur] + ". ") + s.ac;

    durumYaz();
    const son = (can === 0) || (sira === liste.length - 1);
    $("sonraki").textContent = son ? "Sonucu gör" : "Sonraki soru";
    $("sonraki").hidden = false;
    $("sonraki").focus();
  }

  function sonraki() {
    if (can === 0 || sira === liste.length - 1) return bitir();
    sira++;
    soruGoster();
  }

  function bitir() {
    ekranGoster("bitis");
    const kazandi = can > 0;
    const cevaplanan = sira + 1;
    const oran = dogru / cevaplanan;
    $("bitisBaslik").textContent = kazandi ? "Oyun bitti!" : "Canların bitti!";
    $("bitisPuan").textContent = puan + " puan";
    $("bitisDetay").textContent = cevaplanan + " sorudan " + dogru + " tanesini doğru bildin.";
    let mesaj = "Biraz daha çalışırsan çok iyi olacak. Ekleri tekrar et ve yeniden dene!";
    if (!kazandi) mesaj = "Pes etme! Tuzaklara dikkat edip yeniden dene.";
    else if (oran >= 0.9) mesaj = "Harika! Tam bir fiilimsi avcısısın!";
    else if (oran >= 0.6) mesaj = "Çok iyi! Birkaç küçük hata kaldı.";
    $("bitisMesaj").textContent = mesaj;
    $("bitisBaslik").focus();
  }

  const fullscreen = $("tamEkran");
  fullscreen.hidden = !document.fullscreenEnabled || !root.requestFullscreen;
  fullscreen.addEventListener("click", async () => {
    try {
      if (document.fullscreenElement === root) await document.exitFullscreen();
      else await root.requestFullscreen();
    } catch {
      // The game remains playable when the browser blocks fullscreen.
    }
  });
  $("baslaBtn").addEventListener("click", basla);
  $("tekrarBtn").addEventListener("click", () => {
    secim = [];
    secimGuncelle();
    ekranGoster("giris");
    root.querySelector(".seviye").focus();
  });
  $("sonraki").addEventListener("click", sonraki);
  secimGuncelle();
}
