const scienceScenes=[
{title:'Koridordaki tanık',art:0,place:'Okul koridoru',icon:'⌕',person:'Ece’nin ifadesi',text:'Koridorda {koşan} öğrenciyi {görünce} durdum. Elindeki kutuyu {incelemek} istedim. Öğretmen “Burada {koşma}!” dedi.',words:[['koşan',1,'“Koşan”, öğrenciyi niteler. “-an” ekiyle kurulmuş bir sıfat-fiildir.'],['görünce',2,'“Görünce”, durma eyleminin zamanını belirtir. “-ünce” ekiyle zarf-fiil olmuştur.'],['incelemek',0,'“İncelemek”, eylemin adıdır. “-mek” ekiyle isim-fiil olmuştur.'],['koşma',4,'Burada “koşma!”, olumsuz emir bildiren çekimli fiildir. “-ma” olumsuzluk ekidir.']],evidence:'Ece kutuyu saat 14.10’da gördü. Kutunun üzerinde mavi bir yıldız vardı.',clue:'14.10 · Mavi yıldızlı kutu'},
{title:'Kantindeki iz',art:1,place:'Kantin',icon:'☕',person:'Kantinci Hasan Bey’in notu',text:'{Dondurma} {alan} öğrenci, {yemek} için masaya oturdu. {Konuşurken} mavi yıldızlı kutuyu kütüphaneye götüreceğini söyledi.',words:[['Dondurma',3,'Bu cümlede bir yiyeceğin adıdır; kalıcı isimdir. Her “-ma” ile biten kelime fiilimsi değildir.'],['alan',1,'“Alan”, öğrenciyi niteleyen sıfat-fiildir.'],['yemek',0,'Burada “yemek”, bir yiyeceğin adı değil, yeme eyleminin adıdır. “-mek” ekiyle isim-fiildir.'],['Konuşurken',2,'“Konuşurken”, söyleme eyleminin zamanını belirtir; “-ken” ekiyle zarf-fiildir.']],extraWords:[['götüreceğini',1,'“Götüreceğini”, “-ecek” ekiyle kurulmuş adlaşmış sıfat-fiildir. “Neyi söyledi?” sorusunu yanıtlar.']],evidence:'Kantindeki öğrenci Deniz’di. Deniz, kutuyu kütüphaneye götürdüğünü söyledi. Kantin fişinde saat 14.15 yazıyor.',clue:'14.15 · Deniz kütüphaneye gitti'},
{title:'Rafların arasındaki not',art:2,place:'Kütüphane',icon:'▤',person:'Kütüphaneci Selin Hanım’ın ifadesi',text:'Deniz {gelince} mavi yıldızlı kutuyu masaya bıraktı. {Okumak} için {aldığı} kitabı açtı. Az sonra zil {çaldı}.',words:[['gelince',2,'“Gelince”, bırakma eyleminin zamanını belirtir; zarf-fiildir.'],['Okumak',0,'“Okumak”, “-mak” ekiyle eylemin adını bildirir; isim-fiildir.'],['aldığı',1,'“Aldığı”, kitabı niteler. “-dık” ekinin ses değişimine uğramış biçimiyle sıfat-fiil kurulmuştur.'],['çaldı',4,'“Çaldı”, geçmiş zaman ve kişi bildirerek cümlenin yüklemi olmuştur; çekimli fiildir.']],evidence:'Deniz kutuyu kütüphanedeki masaya bıraktı. Selin Hanım 14.20’de laboratuvar sorumlusu Aslı’nın kutuyu aldığını gördü.',clue:'14.20 · Kutuyu Aslı aldı'},
{title:'Laboratuvarın kapısı',art:3,place:'Fen laboratuvarı',icon:'⚗',person:'Aslı’nın kapıya bıraktığı mesaj',text:'Kutuyu {taşırken} köşesindeki {çakmak} yere düştü. {Kırılan} kapağı {onarmak} için kutuyu öğretmenler odasına götürdüm.',words:[['taşırken',2,'“Taşırken”, düşme eyleminin gerçekleştiği zamanı belirtir; zarf-fiildir.'],['çakmak',3,'Burada ateş yakmaya yarayan aracın adıdır. “-mak” ile bitse de kalıcı isimdir.'],['Kırılan',1,'“Kırılan”, kapağı niteleyen sıfat-fiildir.'],['onarmak',0,'“Onarmak”, onarma eyleminin adıdır; isim-fiildir.']],evidence:'Aslı kutunun kırılan kapağını onarmak için öğretmenler odasına gitti. Projedeki çakmak, ateş kullanılmadan hazırlanan güvenlik maketinin parçasıydı.',clue:'Kırık kapak · Öğretmenler odası'},
{title:'Son mesaj',art:4,place:'Öğretmenler odası',icon:'✉',person:'Fen öğretmeninin mesajı',text:'Kutuyu {görünce} Aslı’ya yardım ettim. {Yapıştırma} işlemi bitti. {Kuruyan} kapağı kontrol ettik. Sakın kutuyu {açma}!',words:[['görünce',2,'“Görünce”, yardım etme eyleminin zamanını belirtir; zarf-fiildir.'],['Yapıştırma',0,'“Yapıştırma”, burada işlemin adını bildirir; isim-fiildir. Bir fiilimsinin ismi nitelemesi, onu sıfat-fiil yapmaz.'],['Kuruyan',1,'“Kuruyan”, kapağı niteler; “-an” ekiyle sıfat-fiildir.'],['açma',4,'“Açma!”, olumsuz emir bildiren çekimli fiildir. “-ma” burada isim-fiil eki değildir.']],evidence:'Fen öğretmeni, onarılan kutuyu güvenli olsun diye öğretmenler odasındaki dolaba koydu. Kimse projeyi çalmamıştı; taşıma sırasında haber verilmemişti.',clue:'Proje dolapta · Onarım tamamlandı'}
];

const INVESTIGATIONS = [
  {
    id: 'bilim-projesi', icon: '⚗', title: 'Kaybolan Bilim Projesi',
    summary: 'Bilim şenliğine saatler kaldı. Mavi yıldızlı proje kutusunu en son kim gördü?',
    scenes: scienceScenes,
    question: 'Bilim projesine ne oldu?',
    verdicts: [
      'Ece projeyi koridorda sakladı. Kutunun mavi yıldızı bunu kanıtlıyor.',
      'Deniz projeyi kantinde unuttu. Kütüphaneye hiç gitmedi.',
      'Kutu onarım için öğretmenler odasına taşındı, sonra dolaba kaldırıldı.'
    ],
    correct: 2,
    hint: 'Kütüphane ve öğretmenler odası kayıtlarını birlikte düşün.',
    resolution: 'Deniz kutuyu kütüphaneye götürdü. Aslı kırılan kapağı onartmak için öğretmenler odasına taşıdı. Fen öğretmeni kutuyu dolaba kaldırdı.'
  },
  {
    id: 'kitap-iadesi', atlas: 'assets/kitap-iadesi.webp', extraAtlas: 'assets/ek-mekanlar-kitap-afis.webp', icon: '▤', title: 'Görünmez Kitap İadesi',
    summary: 'Bir kitap kayıtlarda iade edilmiş görünüyor ama rafta yok. İade fişindeki numarayı takip et.',
    scenes: [
      {
        place: 'Kütüphane', icon: '▤', title: 'İade fişi', person: 'Kütüphanecinin notu',
        text: 'Kitabı {getiren} öğrenci iade fişini {alınca} çıktı. Fişi {saklamak} için dosyaya koydum. Ekranda iade kaydı {belirdi}.',
        words: [
          ['getiren', 1, '“Getiren”, öğrenciyi niteler. “-en” ekiyle sıfat-fiil olmuştur.'],
          ['alınca', 2, '“Alınca”, öğrencinin ne zaman çıktığını belirtir.'],
          ['saklamak', 0, '“Saklamak”, eylemin adıdır. “-mak” ekiyle isim-fiil olmuştur.'],
          ['belirdi', 4, '“Belirdi”, geçmiş zamanla çekimlenmiş bir fiildir ve cümlenin yüklemidir.']
        ],
        clue: 'İade kaydı · 218',
        evidence: 'Saat 12.40’ta 218 numaralı Gökyüzü Atlası iade edilmiş. Fişte bu numara açıkça yazıyor.'
      },
      {
        place: 'Okul koridoru', icon: '⌕', title: 'Kitap arabası', person: 'Nöbetçi öğrencinin ifadesi',
        text: 'Arabayı {iterken} üst rafta {yırtılmış} bir kapak gördüm. Arabanın {gidişi} tekerlek sıkışınca yavaşladı. Yanındaki {yazma} ise tarih sergisinde kullanılan bir başörtüsüydü.',
        extraWords: [
          ['sıkışınca', 2, '“Sıkışınca”, yavaşlama eyleminin zamanını belirten zarf-fiildir.'],
          ['kullanılan', 1, '“Kullanılan”, başörtüsünü niteleyen sıfat-fiildir.']
        ],
        words: [
          ['iterken', 2, '“İterken”, görme eyleminin hangi sırada gerçekleştiğini anlatır.'],
          ['yırtılmış', 1, '“Yırtılmış”, kapağı niteler. “-mış” burada sıfat-fiil ekidir.'],
          ['gidişi', 0, '“Gidişi”, gitme eyleminin adıdır. “-ış” ekiyle isim-fiil olmuştur.'],
          ['yazma', 3, 'Bu cümlede “yazma” bir başörtüsünün adıdır. Kalıcı isimdir.']
        ],
        clue: '218 numaralı kitabın kapağı hasarlı',
        evidence: 'Öğrenci, 218 numaralı kitabı üst raftan alıp “Onarım” etiketli bölmeye koymuş.'
      },
      {
        place: 'Öğretmenler odası', icon: '✉', title: 'Onarım teslim listesi', person: 'Teslim tutanağı',
        text: '{Onarılacak} kitapları teslim aldım. Listeyi kontrol {ederek} 218 numarayı işaretledim. Kapağı {yapıştırmak} için hazırlık yaptım. “Kitabı henüz {açma}!” diye not ekledim.',
        words: [
          ['Onarılacak', 1, '“Onarılacak”, kitapları niteler. “-acak” ekiyle sıfat-fiil olmuştur.'],
          ['ederek', 2, '“-erek” eki, listeyi kontrol etme eylemini işaretlemenin yapılış biçimine bağlar.'],
          ['yapıştırmak', 0, '“Yapıştırmak”, yapıştırma eyleminin adıdır.'],
          ['açma', 4, '“Açma!”, olumsuz emir bildirir. “-ma” olumsuzluk ekidir.']
        ],
        clue: '218 · Onarım rafı',
        evidence: 'Teslim listesinde 218 numaralı Gökyüzü Atlası’nın onarım rafına alındığı yazıyor.'
      },
      {
        extraPanel: 0, place: 'Ciltleme odası', icon: '▧', title: 'Kapağın içindeki numara', person: 'Ciltleme görevlisinin inceleme notu',
        text: '{Sökülen} kapağı masaya serdim. İç yüzüne {bakınca} 218 numarayı gördüm. Yeni kapağı {kesmek} için ölçü aldım. “Islak kapağa {dokunma}!” diye uyardım.',
        words: [
          ['Sökülen', 1, '“Sökülen”, kapağı niteler. “-en” ekiyle sıfat-fiil olmuştur.'],
          ['bakınca', 2, '“Bakınca”, numarayı görme eyleminin zamanını belirtir.'],
          ['kesmek', 0, '“Kesmek”, kesme eyleminin adıdır. “-mek” isim-fiil ekidir.'],
          ['dokunma', 4, '“Dokunma!”, olumsuz emir bildirir. “-ma” burada olumsuzluk ekidir.']
        ],
        clue: 'Kapağın içindeki numara · 218',
        evidence: 'Onarılan kapağın iç yüzündeki 218 numarası iade fişiyle eşleşiyor. Ciltlenen kitap gerçekten Gökyüzü Atlası.'
      },
      {
        extraPanel: 1, place: 'Arşiv odası', icon: '▤', title: 'Bekleme rafı', person: 'Arşiv görevlisinin defteri',
        text: 'Kapağın {kuruması} için kitabı arşiv tepsisine koydum. {Onarılan} kitabı {kaldırmadan} önce numarasını kontrol ettim. Teslim saatini deftere {yazdım}.',
        words: [
          ['kuruması', 0, '“Kuruması”, kuruma eyleminin adıdır. “-ma” isim-fiil ekinden sonra iyelik eki gelmiştir.'],
          ['Onarılan', 1, '“Onarılan”, kitabı niteler. “-an” ekiyle sıfat-fiil olmuştur.'],
          ['kaldırmadan', 2, '“Kaldırmadan önce”, kontrolün ne zaman yapıldığını belirtir. “Kaldırmadan” zarf-fiildir.'],
          ['yazdım', 4, '“Yazdım”, geçmiş zaman ve birinci tekil kişiyle çekimlenmiştir.']
        ],
        clue: '218 · Geçici bekleme kaydı',
        evidence: 'Gökyüzü Atlası, kapağı kuruyana kadar arşiv tepsisinde bekleyecek. Görevli kuruma tamamlanınca kitabı kütüphaneye geri götürecek.'
      }
    ],
    question: 'Gökyüzü Atlası neden kütüphane rafında yok?',
    verdicts: [
      'Kitap iade edildi ve kapağının onarılması için ayrıldı.',
      'Başka bir kitap iade edildi. Gökyüzü Atlası öğrencide kaldı.',
      'Gökyüzü Atlası tarih sergisine götürüldü.'
    ],
    correct: 0,
    hint: 'İade fişindeki numarayı kapağın içindeki numarayla ve arşiv kaydıyla karşılaştır.',
    resolution: 'İade fişindeki 218 numara, hasarlı kapağın ve onarım kaydının numarasıyla eşleşiyor. Gökyüzü Atlası iade edildi ve ciltlendi. Kapağı kuruyana kadar arşiv tepsisinde bekliyor.'
  },
  {
    id: 'degisen-afis', atlas: 'assets/degisen-afis.webp', extraAtlas: 'assets/ek-mekanlar-kitap-afis.webp', icon: '◈', title: 'Panodaki Değişen Afiş',
    summary: 'Koridorda okul yarışması için iki farklı saat yazıyor. Yarışmanın doğru saatini belgelerden bul.',
    scenes: [
      {
        place: 'Okul koridoru', icon: '⌕', title: 'Yan yana iki afiş', person: 'Okul panosundaki not',
        text: 'Panoya {asılmış} iki afiş var. Soldaki afişi {okuyunca} saatin 13.00 olduğunu gördüm. Sağdakini {incelemek} için yanına gittim. Onda 14.30 {yazıyordu}.',
        extraWords: [
          ['olduğunu', 1, '“Olduğunu”, “-dık” ekiyle kurulmuş adlaşmış sıfat-fiildir. “Neyi gördüm?” sorusunu yanıtlar.']
        ],
        words: [
          ['asılmış', 1, '“Asılmış”, afişleri niteler. “-mış” burada sıfat-fiil ekidir.'],
          ['okuyunca', 2, '“Okuyunca”, görmenin ne zaman gerçekleştiğini belirtir.'],
          ['incelemek', 0, '“İncelemek”, inceleme eyleminin adıdır.'],
          ['yazıyordu', 4, '“Yazıyordu”, kip ve kişi bildirir. Cümlede yüklemdir.']
        ],
        clue: 'İki farklı saat · 13.00 ve 14.30',
        evidence: 'İki afiş de aynı yarışmaya ait. 13.00 yazan afişte tarih ve onay işareti bulunmuyor.'
      },
      {
        place: 'Kütüphane', icon: '▤', title: 'Eski taslak', person: 'Afiş ekibinin çalışma defteri',
        text: 'Afişi {basmadan} önce saat 13.00’dü. Son saati {belirlemek} için toplantıyı bekledik. Masada {dolma} vardı. Deftere {yazdığım} taslağı arşive koydum.',
        words: [
          ['basmadan', 2, '“Basmadan önce” ifadesi zamanı belirtir. “Basmadan” zarf-fiildir.'],
          ['belirlemek', 0, '“Belirlemek”, belirleme eyleminin adıdır.'],
          ['dolma', 3, '“Dolma”, burada bir yemeğin adıdır. Kalıcı isimdir.'],
          ['yazdığım', 1, '“Yazdığım”, taslağı niteler. “-dık” sıfat-fiil eki iyelik ekiyle birlikte kullanılmıştır.']
        ],
        clue: '13.00 · İlk taslak',
        evidence: 'Defterin kenarında “13.00 ilk taslaktı” notu bulunuyor. Afiş ekibi kesin saati toplantı sonrasında duyuracakmış.'
      },
      {
        place: 'Öğretmenler odası', icon: '✉', title: 'İmzalı duyuru', person: 'Yarışma komitesinin tutanağı',
        text: 'Salon {boşalınca} yarışma başlayacak. {Onaylanan} programda saat 14.30. Saati {değiştirme} kararı tutanağa yazıldı. Görevli yeni afişi {imzaladı}.',
        words: [
          ['boşalınca', 2, '“Boşalınca”, yarışmanın ne zaman başlayacağını belirtir.'],
          ['Onaylanan', 1, '“Onaylanan”, programı niteler. “-an” ekiyle sıfat-fiil olmuştur.'],
          ['değiştirme', 0, '“Değiştirme”, burada değiştirme eyleminin adıdır. “-me” isim-fiil ekidir.'],
          ['imzaladı', 4, '“İmzaladı”, görülen geçmiş zamanla çekimlenmiş bir fiildir.']
        ],
        clue: '14.30 · Onaylı program',
        evidence: 'İmzalı komite tutanağı, salonun dolu olması nedeniyle yarışmanın 14.30’a alındığını doğruluyor.'
      },
      {
        extraPanel: 2, place: 'Çok amaçlı salon', icon: '▥', title: 'Sahne rezervasyonu', person: 'Salon sorumlusunun çizelgesi',
        text: 'Saat 13.00’te sahnede prova {yapan} bir grup vardı. Prova {bitince} sandalyeleri topladık. Salonu yarışmaya {hazırlamak} için yarım saat ayırdık. Hazırlık tam 14.30’da {bitti}.',
        words: [
          ['yapan', 1, '“Yapan”, grubu niteler. “-an” sıfat-fiil ekidir.'],
          ['bitince', 2, '“Bitince”, sandalyeleri ne zaman topladıklarını belirtir.'],
          ['hazırlamak', 0, '“Hazırlamak”, hazırlama eyleminin adıdır.'],
          ['bitti', 4, '“Bitti”, geçmiş zamanla çekimlenmiş fiildir ve cümlenin yüklemidir.']
        ],
        clue: 'Salon · 13.00’te prova vardı',
        evidence: 'Rezervasyon kaydına göre prova 14.00’e kadar sürdü. Yarışma için sahne 14.30’da hazırdı.'
      },
      {
        extraPanel: 3, place: 'Duyuru odası', icon: '♫', title: 'Mikrofondaki düzeltme', person: 'Okul anonsunun metni',
        text: 'Yeni programı {okuyarak} saati duyurdum. {İmzalanan} metinde 14.30 yazıyor. Eski afişi {kaldırma} görevini panonun sorumlusuna verdim. “Eski saati tekrar {okuma}!” diye ekledim.',
        words: [
          ['okuyarak', 2, '“Okuyarak”, duyurma eyleminin nasıl yapıldığını belirtir.'],
          ['İmzalanan', 1, '“İmzalanan”, metni niteler. “-an” ekiyle sıfat-fiil olmuştur.'],
          ['kaldırma', 0, '“Kaldırma”, burada göreve konu olan eylemin adıdır. “-ma” isim-fiil ekidir.'],
          ['okuma', 4, '“Okuma!”, olumsuz emir bildiren çekimli fiildir. “-ma” burada olumsuzluk ekidir.']
        ],
        clue: 'Duyurulan saat · 14.30',
        evidence: 'Okul anonsunda yarışmanın 14.30’da başlayacağı duyuruldu. Eski afişin panodan indirilmesi istendi.'
      }
    ],
    question: 'Yarışma kaçta başlayacak?',
    verdicts: [
      '13.00’te. Panodaki ilk afiş en güncel programı gösteriyor.',
      '14.30’da. Komite değişikliği tutanakla onayladı.',
      'Her iki saatte de yarışma var. İki ayrı afiş iki ayrı yarışmayı duyuruyor.'
    ],
    correct: 1,
    hint: 'Taslağı salon rezervasyonu, imzalı tutanak ve okul anonsuyla karşılaştır.',
    resolution: '13.00 ilk taslağa aitti ve salon o saatte prova için kullanılıyordu. Komite 14.30’u onayladı, okul anonsu da bu saati duyurdu. Eski taslak panoda kaldığı için iki saat birden görünüyordu.'
  },
  {
    id: 'karisan-kutular', atlas: 'assets/karisan-kutular.webp', extraAtlas: 'assets/ek-mekanlar-kutu-zil.webp', icon: '✧', title: 'Karışan İki Kutu',
    summary: 'Atölyeye boya yerine piller ulaşmış. Aynı görünen iki kutunun teslim yolunu yeniden kur.',
    scenes: [
      {
        place: 'Kütüphane', icon: '▤', title: 'Hazırlık çizelgesi', person: 'Etkinlik ekibinin notu',
        text: 'Kutuları {hazırlarken} mavi etiketleri kullandım. Boyaları {göndermek} için B-17 kutusunu seçtim. Pilleri {koyduğum} kutu P-42 numaralıydı. İki kutuyu masaya {bıraktım}.',
        words: [
          ['hazırlarken', 2, '“Hazırlarken”, etiketleri kullanma eyleminin zamanını belirtir.'],
          ['göndermek', 0, '“Göndermek”, gönderme eyleminin adıdır.'],
          ['koyduğum', 1, '“Koyduğum”, kutuyu niteler. “-duk” eki burada sıfat-fiil kurar.'],
          ['bıraktım', 4, '“Bıraktım”, geçmiş zaman ve birinci tekil kişi bildirir.']
        ],
        clue: 'B-17 · Boya, P-42 · Pil',
        evidence: 'Hazırlık çizelgesinde B-17 atölyeye, P-42 laboratuvara ayrılmış. İkisinin de üzerinde aynı renkte etiket var.'
      },
      {
        place: 'Fen laboratuvarı', icon: '⚗', title: 'Laboratuvar teslimi', person: 'Laboratuvar sorumlusunun ifadesi',
        text: 'Kapıya {bırakılan} kutuyu {açınca} renkli tüpleri gördüm. Kutuyu {boyamak} için gelen öğrenciler kutunun üzerinde B-17 yazdığını fark etti. Teslim saatini deftere {yazdım}.',
        extraWords: [
          ['gelen', 1, '“Gelen”, öğrencileri niteleyen sıfat-fiildir.'],
          ['yazdığını', 1, '“Yazdığını”, “-dık” ekiyle kurulmuş adlaşmış sıfat-fiildir. “Neyi fark etti?” sorusunu yanıtlar.']
        ],
        words: [
          ['bırakılan', 1, '“Bırakılan”, kutuyu niteler. “-an” ekiyle sıfat-fiil olmuştur.'],
          ['açınca', 2, '“Açınca”, görme eyleminin zamanını belirtir.'],
          ['boyamak', 0, '“Boyamak”, boyama eyleminin adıdır. “-mak” isim-fiil ekidir.'],
          ['yazdım', 4, '“Yazdım”, geçmiş zaman ve birinci tekil kişiyle çekimlenmiştir.']
        ],
        clue: 'B-17 laboratuvara bırakılmış',
        evidence: 'Laboratuvarın teslim defterinde B-17 numarası ve 10.05 saati var. Kutuda piller yerine boyalar bulunmuş.'
      },
      {
        place: 'Öğretmenler odası', icon: '✉', title: 'Atölyeden gelen kayıt', person: 'Atölye öğretmeninin mesajı',
        text: 'Atölyeye {gelen} paketin numarası P-42. Numarayı {karşılaştırıp} teslim kaydını düzelttim. Kutuları {değiştirmek} için görevliye haber verdim. “Kutuyu {boşaltma}!” dedim.',
        words: [
          ['gelen', 1, '“Gelen”, paketi niteler. “-en” ekiyle sıfat-fiil olmuştur.'],
          ['karşılaştırıp', 2, '“Karşılaştırıp”, karşılaştırma eylemini sonraki düzeltme eylemine bağlayan zarf-fiildir.'],
          ['değiştirmek', 0, '“Değiştirmek”, değiştirme eyleminin adıdır.'],
          ['boşaltma', 4, '“Boşaltma!”, olumsuz emir biçiminde çekimli fiildir.']
        ],
        clue: 'P-42 atölyeye ulaşmış',
        evidence: 'Atölye teslim kaydında P-42 yazıyor ve kutuda piller var. İki kutu da açılmadan önce yanlış yere teslim edilmiş.'
      },
      {
        extraPanel: 0, place: 'Malzeme deposu', icon: '▣', title: 'Çıkış çizelgesindeki oklar', person: 'Depo görevlisinin açıklaması',
        text: 'Kutuları teslim {ederken} geçici yön çizelgesine baktım. Çizelgede {gördüğüm} okları izledim. Numaraları {karşılaştırma} işini atladım. Sonra iki kaydın yerini {değiştirdim}.',
        words: [
          ['ederken', 2, '“Teslim ederken”, çizelgeye ne zaman bakıldığını belirtir. “-ken” zarf-fiil ekidir.'],
          ['gördüğüm', 1, '“Gördüğüm”, okları niteler. “-dük” sıfat-fiil eki iyelik ekiyle birlikte kullanılmıştır.'],
          ['karşılaştırma', 0, '“Karşılaştırma”, karşılaştırma eyleminin adıdır.'],
          ['değiştirdim', 4, '“Değiştirdim”, geçmiş zaman ve birinci tekil kişiyle çekimlenmiştir.']
        ],
        clue: 'Geçici yön çizelgesi · İki hedef ters yazılmış',
        evidence: 'Depo görevlisi, hazırlık çizelgesini geçici yön listesine aktarırken B-17 ve P-42’nin hedeflerini ters yazdığını fark etti.'
      },
      {
        extraPanel: 1, place: 'Görsel sanatlar atölyesi', icon: '◈', title: 'Düzeltilen teslim', person: 'Atölyenin yeni teslim fişi',
        text: 'Doğru kutu {gelince} fişi imzaladım. İçinden {çıkan} boyaları masaya dizdim. Renkleri {karıştırmak} için bir palet aldım. Görevli P-42’yi laboratuvara {götürdü}.',
        words: [
          ['gelince', 2, '“Gelince”, fişi imzalama eyleminin zamanını belirtir.'],
          ['çıkan', 1, '“Çıkan”, boyaları niteler. “-an” ekiyle sıfat-fiil olmuştur.'],
          ['karıştırmak', 0, '“Karıştırmak”, karıştırma eyleminin adıdır.'],
          ['götürdü', 4, '“Götürdü”, geçmiş zamanla çekimlenmiş bir fiildir.']
        ],
        clue: 'B-17 atölyede · P-42 laboratuvarda',
        evidence: 'Düzeltilen fiş, aynı numaralı kutuların içerikleri değişmeden doğru yerlere yeniden teslim edildiğini gösteriyor.'
      }
    ],
    question: 'Boyalar ve piller neden yanlış yerdeydi?',
    verdicts: [
      'Hazırlık sırasında pillerle boyalar aynı kutuya kondu.',
      'Boyalar laboratuvarda kullanıldı. Boş kutu daha sonra atölyeye gitti.',
      'Kutular doğru hazırlanmıştı. Teslim sırasında gidecekleri yerler karıştı.'
    ],
    correct: 2,
    hint: 'Hazırlık çizelgesindeki hedefleri deponun yön listesi ve düzeltilen teslim fişiyle karşılaştır.',
    resolution: 'Kutular doğru hazırlanmıştı. Deponun geçici yön listesine hedefler ters yazıldığı için boyalar laboratuvara, piller atölyeye gitti. Hata anlaşılınca iki kutu doğru yerlere taşındı.'
  },
  {
    id: 'iki-kez-calan-zil', atlas: 'assets/iki-kez-calan-zil.webp', extraAtlas: 'assets/ek-mekanlar-kutu-zil.webp', icon: '◉', title: 'İki Kez Çalan Zil',
    summary: 'Son derste zil iki kez çaldı. Hangi zil dersin bittiğini, hangisi ses provasını haber veriyordu?',
    scenes: [
      {
        place: 'Okul koridoru', icon: '⌕', title: 'İlk tanığın saati', person: 'Nöbetçi öğrencinin ifadesi',
        text: 'Saat 15.12’de zil {çalınca} kapıya baktım. Dersi {bitirmek} için kimse çıkmadı. Koridorda {bekleyen} öğretmen “Henüz {çıkma}!” diye seslendi.',
        words: [
          ['çalınca', 2, '“Çalınca”, bakma eyleminin ne zaman gerçekleştiğini belirtir.'],
          ['bitirmek', 0, '“Bitirmek”, bitirme eyleminin adıdır.'],
          ['bekleyen', 1, '“Bekleyen”, öğretmeni niteler. “-en” ekiyle sıfat-fiil olmuştur.'],
          ['çıkma', 4, '“Çıkma!”, olumsuz emir bildiren çekimli fiildir.']
        ],
        clue: '15.12 · İlk zil',
        evidence: 'İlk zil saat 15.12’de duyulmuş. Nöbetçi öğretmen dersin sürdüğünü söylemiş.'
      },
      {
        place: 'Fen laboratuvarı', icon: '⚗', title: 'Ses denemesi', person: 'Teknik kulübün test formu',
        text: 'Hoparlörü {denemek} için kısa bir ses çaldık. {Kaydettiğimiz} dosyanın adı “zil provası”. Sesi {dinleyince} ayarı düzelttik. Saat 15.12’yi forma {işledik}.',
        words: [
          ['denemek', 0, '“Denemek”, deneme eyleminin adıdır. “-mek” isim-fiil ekidir.'],
          ['Kaydettiğimiz', 1, '“Kaydettiğimiz”, dosyayı niteler. “-dik” eki burada sıfat-fiil kurar.'],
          ['dinleyince', 2, '“Dinleyince”, ayarı ne zaman düzelttiklerini belirtir.'],
          ['işledik', 4, '“İşledik”, geçmiş zaman ve birinci çoğul kişi bildirir.']
        ],
        clue: '15.12 · Zil sesi provası',
        evidence: 'Test formunda 15.12’de prova kaydının laboratuvar hoparlöründen çalındığı belirtilmiş.'
      },
      {
        place: 'Öğretmenler odası', icon: '✉', title: 'Ders bitiş çizelgesi', person: 'Günün zil kaydı',
        text: 'Çizelgede {yazan} bitiş saati 15.20. Zil {çalarken} ders kaydını kapattım. Sınıfı {boşaltmak} için işaret verdim. Sistem 15.20’de bir kez zil {çaldı}.',
        words: [
          ['yazan', 1, '“Yazan”, bitiş saatini niteler. “-an” ekiyle sıfat-fiil olmuştur.'],
          ['çalarken', 2, '“Çalarken”, kaydı kapatma eyleminin zamanını belirtir.'],
          ['boşaltmak', 0, '“Boşaltmak”, boşaltma eyleminin adıdır.'],
          ['çaldı', 4, '“Çaldı”, geçmiş zamanla çekimlenmiştir ve cümlenin yüklemidir.']
        ],
        clue: '15.20 · Resmî ders bitişi',
        evidence: 'Okul zil sisteminin kaydında son ders için yalnızca 15.20’de bir zil var.'
      },
      {
        extraPanel: 2, place: 'Müzik odası', icon: '♫', title: 'Dersin son ölçüsü', person: 'Müzik öğretmeninin ifadesi',
        text: 'İlk sesi {duyunca} dersi sürdürdüm. {Çaldığımız} parçanın son ölçüsü kaldı. Parçayı {bitirmek} için yeniden işaret verdim. “Henüz çantanı {toplama}!” dedim.',
        words: [
          ['duyunca', 2, '“Duyunca”, dersi sürdürme eyleminin zamanını belirtir.'],
          ['Çaldığımız', 1, '“Çaldığımız”, parçayı niteler. “-dık” eki burada sıfat-fiil kurar.'],
          ['bitirmek', 0, '“Bitirmek”, bitirme eyleminin adıdır.'],
          ['toplama', 4, '“Toplama!”, olumsuz emir bildiren çekimli fiildir.']
        ],
        clue: 'Müzik dersi · İlk sesten sonra sürdü',
        evidence: 'Öğretmen ilk sesi duyduğunda ders devam ediyordu. İkinci sesten sonra dersi bitirip öğrencileri çıkardı.'
      },
      {
        extraPanel: 3, place: 'Teknik oda', icon: '⚙', title: 'Kontrol panelinin kaydı', person: 'Teknik görevlinin bakım defteri',
        text: 'Günlük kaydı {açarak} iki saati kontrol ettim. Sistemin {gönderdiği} tek komut 15.20’deydi. Kayıtları {karşılaştırmak} için prova formunu aldım. Sonucu deftere not {ettim}.',
        words: [
          ['açarak', 2, '“Açarak”, kontrolün nasıl yapıldığını belirtir. “-arak” zarf-fiil ekidir.'],
          ['gönderdiği', 1, '“Gönderdiği”, komutu niteler. “-dik” eki burada sıfat-fiil kurar.'],
          ['karşılaştırmak', 0, '“Karşılaştırmak”, karşılaştırma eyleminin adıdır.'],
          ['ettim', 4, '“Ettim”, geçmiş zaman ve birinci tekil kişiyle çekimlenmiştir. “Not ettim” cümlenin yüklemidir.']
        ],
        clue: 'Kontrol paneli · 15.12’de komut yok',
        evidence: 'Panelin ayrı teknik kaydı, 15.12’de okul ziline komut gitmediğini, 15.20’de ise ders bitiş komutunun verildiğini doğruladı.'
      }
    ],
    question: 'İki zilin sırası neydi?',
    verdicts: [
      '15.12’de hoparlör provası, 15.20’de ders bitiş zili.',
      '15.12’de ders bitiş zili, 15.20’de hoparlör provası.',
      'İki ses de okulun zil sisteminden gelen ders bitiş zilleriydi.'
    ],
    correct: 0,
    hint: 'Teknik kulübün test formunu müzik dersinin bitişi ve kontrol panelinin kaydıyla karşılaştır.',
    resolution: '15.12’de duyulan ses laboratuvar hoparlörünün provasıydı. Okul zil sistemi son ders için 15.20’de bir kez çaldı.'
  }
];
