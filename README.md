# Klientská zóna - React aplikace

Tento projekt obsahuje klientskou zónu vytvořenou pomocí Reactu. Repozitář aplikace je dostupný na GitHubu.

- **Repozitář:**
[https://github.com/OndrejBurval/ebr-abovalve-clientzone](https://github.com/OndrejBurval/ebr-abovalve-clientzone)
- **Implementace:** [www.abovalve.myebrana.com](www.abovalve.myebrana.com)

## Popis

Klientská zóna je implementována jako samostatná React aplikace, která je specificky nakonfigurovaná tak, aby odpovídala požadavkům našeho prostředí.

Z důvodu omezení na straně serveru (starší verze Node.js) je nutné aplikaci vyvíjet lokálně. Po dokončení vývoje se aplikace zkompiluje (build) a výstupní soubor se ručně nakopíruje na server.

### Struktura a nasazení
- **Lokální vývoj:**
  Aplikaci je nutné vyvíjet lokálně a vycházet z již zmíněného repozitáře.
  Výsledný build bude dostupný ve složce build/.


- **Nasazení na server (staging):**
Výstupní JavaScript soubor je potřeba nakopírovat do cesty:
`abovalve.myebrana.com\public\custom.clientZone.js`
Tento soubor je uložen v adresáři public, protože chceme aplikaci načítat podle ID šablony a nechceme ji kompilovat s ostatními JavaScript soubory.

- **Nasazení na produkci (live):**
Na produkčním serveru je potřeba zkompilovanou aplikaci nakopírovat do následující cesty:
`abovalve.myebrana.com\customs\Web\Frontend\abovalvemyebranacom\public\custom.clientZone.js`
Při aktivování commitu na live se spustí úloha, která soubor překopíruje do public, aby byl dostupný pro klienty.

## Lokální vývoj

- Aplikace se vyvíjí jako každá jiná react appka. Jen po kompilačním buildu se soubor ručně nakopíruje na server a poté ho lze otestovat na localu.
- Je to velmi přizpůsobené našemu prostředí a jelikož naše aplikace je klasický multi-page web, tak je zde i upravený routing
  - Normálně používáme React router, ale aby react fungoval i při refreshy, je potřeba vytvořit stránky i v editoru - v těch bude vložená kostička custom kodu s classou #root.
  - Tudíž když v Reactu vytvořím stránku např /test123, tak stejnou vytvořím i v editoru a vložím tam kostičku s classou #root - je to potřeba, jinak by po refreshi stránka nebyla nalezena
- **Veškeré úpravy je také potřeba evidovat v githubu, aby tam byla nejaktuálněší verze !! Nesmí se to zvrhnout v to, že každý si to jednorázově naklonuje a pak si to upravuje lokálně, protože pak se to ztrácí a nejsou tam nejaktuálnější verze.**
- Fetchování dat je také speciální. Jelikož není ready externí authentication, tak se nedá k datům přistupovat z lokálního vývoje Reactu. Tudíž lokálně jsou připraven statické mock data, které se načítají z lokálního JSON souboru. Na serveru se pak data fetchují z API.
- Aplikace používá mutace, tudíž se nesmí zapomenout na tvorbu mutačních konstant
- Aplikace také obsahuje košík, ale jelikož produktový katalog je použity klasicky produktový, tak o obsluhu košíku se starají JS v custom/js (custom.addToBasket.js, custom.basket.js, ...)
  - Pokud si chci dát něco lokálně do košíku, použijte objednávky a možnost objednat znovu

### Good luck

### PS: Repo je veřejné, takže se snažte neukládat do něj citlivé informace
