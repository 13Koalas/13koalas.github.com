# Fiilimsi Dedektifi — Sahte İpuçları

8. sınıf düzeyinde, beş olay dosyalı Türkçe dedektiflik oyunu. Her dosyada beş mekân bulunur. Normal modda dosya başına 20 işaretli kelime incelenir. Zor modda oyuncu metindeki fiilimsileri bulur ve türlerini seçer. Her mekânda isteğe bağlı bir ipucu, çözülmemiş bir fiilimsiyi işaretler. Açıklamalı cevaplar, kalıcı isim ve çekimli fiil tuzakları, kanıt defteri ve final bulmacası içerir.

Açılış ekranından Fiilimsi Dedektifi ve Fiilimsi Avcısı arasında seçim yapılır. Her iki oyun da aynı arayüzde açılır ve internet bağlantısı olmadan oynanabilir.

## Çalıştırma

İndirilen arşivi açtıktan sonra `index.html` dosyasını güncel bir tarayıcıda açın. Kaynak depoda bu dosya `dist/` dizinindedir. Kurulum veya sunucu gerekmez. İlerleme localStorage ile tarayıcıda tutulur; dosya üzerinden çalıştırmada tarayıcı ayarlarına bağlı olarak kalıcı kayıt kısıtlanabilir. Web üzerinden barındırma önerilir.

## Başka sunucuda yayımlama

`dist/` içindeki dosyaları herhangi bir statik web sunucusuna yükleyin. PHP, Node.js, veri tabanı veya API anahtarı gerekmez. Geliştirme bilgisayarı açık kalmak zorunda değildir.

## Düzenleme

Olaylar, sorular ve açıklamalar `dist/cases.js` dosyasındadır. Her olayın ilerlemesi zorluk düzeyine göre ayrı saklanır. Normal mod önceki sürümün kayıtlarını kullanır.

## Kontrol

`node --check dist/cases.js` ve `node --check dist/app.js`

İlk sürüm Chromium tarayıcısında baştan sona oynanarak kontrol edildi: 20 cevap, yanlış cevap düzeltme, kilit açma, final, puan ve yeniden yüklemede kayıt. macOS Safari ve Windows Edge üzerinde ayrı cihaz testi yapılmadı.

Görseller bu oyun için oluşturulmuştur. İsteğe bağlı web yazı tipleri yüklenemezse sistem yazı tipleri kullanılır; iki oyun da internetsiz çalışır.
