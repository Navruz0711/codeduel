const fs = require('fs');

let katas = JSON.parse(fs.readFileSync('data/kata.json', 'utf8'));

// Filter out dummy loop items
katas = katas.filter(k => !k.id.startsWith('py_') && !k.id.startsWith('auto-kata-'));

// Deduplicate
const seen = new Set();
const clean = [];
for (const k of katas) {
  if (!seen.has(k.id)) {
    seen.add(k.id);
    clean.push(k);
  }
}

const RICH_DESCS = {
  "say-hello": `### 🎯 Masala Maqsadi:
Foydalanuvchining ismini qabul qilib, unga samimiy salomlashuvchi xabarni shakllantiruvchi \`sayHello\` funksiyasini yozing.

### 📥 Kiruvchi Parametrlar:
- \`name\` *(String)*: Foydalanuvchining ismi (masalan: \`"John"\`, \`"Ali"\`).

### 📤 Qaytariladigan Natija:
- *(String)*: \`"Hello, <name>"\` ko'rinishidagi to'liq salomlashish matni.

### 💡 Misollar:
\`\`\`javascript
sayHello("John") // "Hello, John"
sayHello("Ali")  // "Hello, Ali"
\`\`\`

### ⚠️ Eslatma:
Vergul va probel joylashuviga e'tibor bering: \`"Hello, "\` va undan so'ng ism kelishi shart.`,

  "add-two-numbers": `### 🎯 Masala Maqsadi:
Berilgan ikkita sonning arifmetik yig'indisini hisoblab beruvchi \`add\` funksiyasini yozing.

### 📥 Kiruvchi Parametrlar:
- \`a\` *(Number)*: Birinchi butun yoki o'nlik son.
- \`b\` *(Number)*: Ikkinchi butun yoki o'nlik son.

### 📤 Qaytariladigan Natija:
- *(Number)*: \`a\` va \`b\` sonlarining matematik yig'indisi.

### 💡 Misollar:
\`\`\`javascript
add(2, 3)   // 5
add(-5, 10) // 5
add(0, 0)   // 0
\`\`\`

### ⚠️ Eslatma:
Funksiya manfiy sonlar bilan ham to'g'ri ishlashi lozim.`,

  "find-max": `### 🎯 Masala Maqsadi:
Berilgan sonlar massividan qiymat jihatidan eng katta (maksimal) bo'lgan elementni aniqlang.

### 📥 Kiruvchi Parametrlar:
- \`arr\` *(Array of Numbers)*: Butun yoki o'nlik sonlar ro'yxati.

### 📤 Qaytariladigan Natija:
- *(Number)*: Massiv ichidagi eng katta son.

### 💡 Misollar:
\`\`\`javascript
findMax([1, 5, 3, 9, 2]) // 9
findMax([-10, -5, -20])  // -5
findMax([42])            // 42
\`\`\`

### ⚠️ Eslatma:
Massivdagi barcha sonlar manfiy bo'lishi mumkinligini hisobga oling (boshlang'ich qiymat sifatida 0 olmang).`,

  "reverse-string": `### 🎯 Masala Maqsadi:
Berilgan matn (satr) dagi barcha belgilarni teskari tartibda joylashtirib, yangi matn hosil qiling.

### 📥 Kiruvchi Parametrlar:
- \`str\` *(String)*: Ixtiyoriy uzunlikdagi matn.

### 📤 Qaytariladigan Natija:
- *(String)*: Belgilari oxiridan boshiga qarab o'girilgan teskari matn.

### 💡 Misollar:
\`\`\`javascript
solution("world") // "dlrow"
solution("word")  // "drow"
solution("12345") // "54321"
\`\`\`

### ⚠️ Eslatma:
Bo'sh matn (\`""\`) kiritilganda bo'sh matn qaytarilishi kerak.`,

  "multiply-two": `### 🎯 Masala Maqsadi:
Ikkita sonni qabul qilib, ularning ko'paytmasini qaytaruvchi oddiy va tezkor funksiya yozing.

### 📥 Kiruvchi Parametrlar:
- \`a\` *(Number)*: Birinchi ko'paytuvchi.
- \`b\` *(Number)*: Ikkinchi ko'paytuvchi.

### 📤 Qaytariladigan Natija:
- *(Number)*: \`a * b\` ko'paytmasi.

### 💡 Misollar:
\`\`\`javascript
multiply(2, 3)  // 6
multiply(-2, 4) // -8
multiply(0, 99) // 0
\`\`\``,

  "is-even": `### 🎯 Masala Maqsadi:
Berilgan butun sonning juft yoki toq ekanligini aniqlang. Son juft bo'lsa \`true\`, aks holda \`false\` qaytaring.

### 📥 Kiruvchi Parametrlar:
- \`n\` *(Number)*: Tekshirilishi kerak bo'lgan butun son.

### 📤 Qaytariladigan Natija:
- *(Boolean)*: Son 2 ga qoldiqsiz bo'linsa \`true\`, bo'linmasa \`false\`.

### 💡 Misollar:
\`\`\`javascript
isEven(4)  // true
isEven(7)  // false
isEven(0)  // true
isEven(-2) // true
\`\`\`

### ⚠️ Eslatma:
0 soni juft son hisoblanadi. Manfiy juft sonlar ham \`true\` qaytarishi kerak.`,

  "is-odd": `### 🎯 Masala Maqsadi:
Berilgan butun sonning toq ekanligini tekshiruvchi funksiya yozing.

### 📥 Kiruvchi Parametrlar:
- \`n\` *(Number)*: Tekshiriluvchi butun son.

### 📤 Qaytariladigan Natija:
- *(Boolean)*: Son toq bo'lsa \`true\`, juft bo'lsa \`false\`.

### 💡 Misollar:
\`\`\`javascript
isOdd(5)  // true
isOdd(8)  // false
isOdd(-3) // true
\`\`\``,

  "number-to-string": `### 🎯 Masala Maqsadi:
Berilgan raqamli (Number) qiymatni satr (String) ko'rinishiga o'tkazuvchi funksiya yozing.

### 📥 Kiruvchi Parametrlar:
- \`num\` *(Number)*: Butun yoki manfiy son.

### 📤 Qaytariladigan Natija:
- *(String)*: Sonning matnli ifodasi.

### 💡 Misollar:
\`\`\`javascript
numberToString(123)  // "123"
numberToString(999)  // "999"
numberToString(-100) // "-100"
\`\`\``,

  "hello-world-func": `### 🎯 Masala Maqsadi:
Dasturlash olamidagi an'anaviy ilk qadam: chaqirilganda har doim \`"hello world!"\` satrini qaytaruvchi \`greet\` funksiyasini yozing.

### 📤 Qaytariladigan Natija:
- *(String)*: Kichik harflar bilan aniq \`"hello world!"\` matni.

### 💡 Misollar:
\`\`\`javascript
greet() // "hello world!"
\`\`\``,

  "make-upper": `### 🎯 Masala Maqsadi:
Berilgan matndagi barcha harflarni katta (uppercase) harflarga o'tkazib qaytaring.

### 📥 Kiruvchi Parametrlar:
- \`str\` *(String)*: Matn.

### 📤 Qaytariladigan Natija:
- *(String)*: Barcha harflari bosh harfga aylantirilgan matn.

### 💡 Misollar:
\`\`\`javascript
makeUpperCase("hello")      // "HELLO"
makeUpperCase("CodeDuel")   // "CODEDUEL"
\`\`\``,

  "make-lower": `### 🎯 Masala Maqsadi:
Berilgan matndagi barcha harflarni kichik (lowercase) harflarga o'tkazuvchi funksiya yozing.

### 📥 Kiruvchi Parametrlar:
- \`str\` *(String)*: Matn.

### 📤 Qaytariladigan Natija:
- *(String)*: To'liq kichik harflardan iborat yangi matn.

### 💡 Misollar:
\`\`\`javascript
makeLowerCase("HELLO")    // "hello"
makeLowerCase("VaLaYkUm") // "valaykum"
\`\`\``,

  "get-char": `### 🎯 Masala Maqsadi:
Kompyuter xotirasidagi ASCII raqamli kodi berilgan. Ushbu kodga mos keluvchi belgini (simvolni) toping.

### 📥 Kiruvchi Parametrlar:
- \`c\` *(Number)*: ASCII raqamli kodi (masalan, 55, 65, 97).

### 📤 Qaytariladigan Natija:
- *(String)*: Ushbu ASCII kodga mos yagona simvol.

### 💡 Misollar:
\`\`\`javascript
getChar(55) // "7"
getChar(65) // "A"
getChar(97) // "a"
\`\`\``,

  "find-remainder": `### 🎯 Masala Maqsadi:
Berilgan ikkita butun sonning kattasini kichigiga bo'lgandagi qoldiqni hisoblang.

### 📥 Kiruvchi Parametrlar:
- \`a\` *(Number)*: Birinchi butun son.
- \`b\` *(Number)*: Ikkinchi butun son.

### 📤 Qaytariladigan Natija:
- *(Number)*: Kattasini kichigiga bo'lgandagi qoldiq.

### 💡 Misollar:
\`\`\`javascript
remainder(17, 5)  // 2  (17 % 5 = 2)
remainder(13, 72) // 7  (72 % 13 = 7)
\`\`\``,

  "area-of-square": `### 🎯 Masala Maqsadi:
Kvadratning bitta tomoni uzunligi \`a\` berilgan. Geometriya qoidalariga ko'ra uning yuzini hisoblang.

### 📥 Kiruvchi Parametrlar:
- \`a\` *(Number)*: Kvadrat tomonining uzunligi.

### 📤 Qaytariladigan Natija:
- *(Number)*: Kvadrat yuzi (\`a * a\`).

### 💡 Misollar:
\`\`\`javascript
areaOfSquare(4) // 16
areaOfSquare(5) // 25
areaOfSquare(10) // 100
\`\`\``,

  "perimeter-of-rectangle": `### 🎯 Masala Maqsadi:
To'g'ri to'rtburchakning bo'yi \`l\` va eni \`w\` berilgan. Uning umumiy perimetrini hisoblang.

### 📥 Kiruvchi Parametrlar:
- \`l\` *(Number)*: Uzunligi.
- \`w\` *(Number)*: Kengligi.

### 📤 Qaytariladigan Natija:
- *(Number)*: Perimetr (\`2 * (l + w)\`).

### 💡 Misollar:
\`\`\`javascript
perimeter(6, 10) // 32
perimeter(20, 10) // 60
\`\`\``,

  "is-uppercase": `### 🎯 Masala Maqsadi:
Berilgan matn to'liq bosh (katta) harflardan iborat ekanligini tekshiring.

### 📥 Kiruvchi Parametrlar:
- \`str\` *(String)*: Tekshiriluvchi matn.

### 📤 Qaytariladigan Natija:
- *(Boolean)*: Agar satrdagi barcha harflar katta bo'lsa \`true\`, kamida bitta kichik harf bo'lsa \`false\`.

### 💡 Misollar:
\`\`\`javascript
isUpperCase("HELLO") // true
isUpperCase("Hello") // false
isUpperCase("CODING") // true
\`\`\``,

  "first-element": `### 🎯 Masala Maqsadi:
Massivning eng birinchi elementini ajratib olib qaytaruvchi funksiya yozing.

### 📥 Kiruvchi Parametrlar:
- \`arr\` *(Array)*: Elementlar ro'yxati.

### 📤 Qaytariladigan Natija:
- *(Any)*: Massivning \`0\`-indeksidagi elementi.

### 💡 Misollar:
\`\`\`javascript
getFirst([1, 2, 3])       // 1
getFirst(["olma", "anor"]) // "olma"
\`\`\``,

  "last-element": `### 🎯 Masala Maqsadi:
Massivning eng oxirgi elementini topib qaytaruvchi funksiya yozing.

### 📥 Kiruvchi Parametrlar:
- \`arr\` *(Array)*: Elementlar ro'yxati.

### 📤 Qaytariladigan Natija:
- *(Any)*: Massivning oxirgi elementi.

### 💡 Misollar:
\`\`\`javascript
getLast([1, 2, 3, 4]) // 4
getLast(["a", "b"])   // "b"
\`\`\``,

  "concat-arrays": `### 🎯 Masala Maqsadi:
Berilgan ikkita massivni birlashtirib, bitta yaxlit ketma-ketlik hosil qiling.

### 📥 Kiruvchi Parametrlar:
- \`arr1\` *(Array)*: Birinchi massiv.
- \`arr2\` *(Array)*: Ikkinchi massiv.

### 📤 Qaytariladigan Natija:
- *(Array)*: Birinchi massiv ortidan ikkinchisi ulab qo'yilgan yangi massiv.

### 💡 Misollar:
\`\`\`javascript
concatArrays([1, 2], [3, 4]) // [1, 2, 3, 4]
concatArrays(["a"], ["b", "c"]) // ["a", "b", "c"]
\`\`\``,

  "basic-math": `### 🎯 Masala Maqsadi:
Kalkulyator mantig'i: berilgan arifmetik amal belgisi (\`+\`, \`-\`, \`*\`, \`/\`) va ikkita son ustida hisob-kitobni amalga oshiring.

### 📥 Kiruvchi Parametrlar:
- \`operation\` *(String)*: Amal belgisi (\`"+"\`, \`"-"\`, \`"*"\`, \`"/"\`).
- \`value1\` *(Number)*: Birinchi operand.
- \`value2\` *(Number)*: Ikkinchi operand.

### 📤 Qaytariladigan Natija:
- *(Number)*: Amallash natijasi.

### 💡 Misollar:
\`\`\`javascript
basicOp("+", 4, 7) // 11
basicOp("-", 15, 18) // -3
basicOp("*", 5, 5) // 25
basicOp("/", 49, 7) // 7
\`\`\``,

  "find-smallest-integer": `### 🎯 Masala Maqsadi:
Berilgan butun sonlar massividan eng kichik (minimum) qiymatga ega bo'lgan sonni toping.

### 📥 Kiruvchi Parametrlar:
- \`args\` *(Array of Numbers)*: Butun sonlar ro'yxati.

### 📤 Qaytariladigan Natija:
- *(Number)*: Massivdagi eng kichik son.

### 💡 Misollar:
\`\`\`javascript
findSmallestInt([34, 15, 88, 2]) // 2
findSmallestInt([34, -345, -1, 100]) // -345
\`\`\``,

  "century-from-year": `### 🎯 Masala Maqsadi:
Berilgan yildan uning qaysi asrga tegishli ekanligini hisoblang. Tarixiy qoidaga ko'ra, 1-asr 1-yildan 100-yilgacha, 2-asr esa 101-yildan 200-yilgacha davom etadi.

### 📥 Kiruvchi Parametrlar:
- \`year\` *(Number)*: Musbat butun yil soni (masalan: 1905, 2000, 2026).

### 📤 Qaytariladigan Natija:
- *(Number)*: Asr raqami.

### 💡 Misollar:
\`\`\`javascript
century(1705) // 18
century(1900) // 19
century(2000) // 20
century(2026) // 21
\`\`\``
};

let updated = 0;
for (const k of clean) {
  if (RICH_DESCS[k.id]) {
    k.description = RICH_DESCS[k.id];
    updated++;
  } else if (!k.description.includes('### 🎯 Masala Maqsadi')) {
    const lines = k.description.split('\n\n');
    const summary = lines[0].trim();
    const rest = lines.slice(1).join('\n\n').trim();
    k.description = `### 🎯 Masala Maqsadi:
${summary}

${rest ? `### 📋 Qo'shimcha Qoidalar va Misollar:\n${rest}` : ''}`;
    updated++;
  }
}

console.log('Enriched descriptions for:', updated, 'katas');
fs.writeFileSync('data/kata.json', JSON.stringify(clean, null, 2), 'utf8');
console.log('Successfully saved', clean.length, 'clean katas with rich descriptions!');
