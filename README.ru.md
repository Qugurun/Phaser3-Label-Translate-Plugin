[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/Qugurun/Phaser3-Label-Translate-Plugin/blob/main/README.md)
[![ru](https://img.shields.io/badge/lang-ru-green.svg)](https://github.com/Qugurun/Phaser3-Label-Translate-Plugin/blob/main/README.ru.md)

# Label Translate Plugin for Phaser 3.80.x

Плагин добавляет автоматический перевод для текстовых элементов по {ключам} из их наличия в файлах `*.json` перевода.

![priview.gif](https://github.com/Qugurun/Phaser3-Label-Translate-Plugin/blob/main/preview.gif)

Пример:
```js
const label = this.add.label(0,0, "{key}", {fontSize: "50px"});
```

---
## Установка

Разместите и подключите файл label_translate_plugin.js`:
```js
import { TextTranslatePlugin } from "./plugin/label_translate_plugin";
```

Добавьте в конфигурацию:

```js
plugins: {
	global: [
		{
			key: "LabelTranslatePlugin",
			plugin: LabelTranslatePlugin,
			start: true,
			mapping: "translate",
			data: {
				path: "assets/locale/"
			}
		}
	]
}
```

Укажите в параметре `path` путь до папки с файлами перевода. 

*Важно! На конце пути должна быть  "`/`"косая черта.* *

---
## Начало работы

Предварительно загрузите стартовый язык в методе сцены `preload`

```js
preload(){
	this.load.json("en", "assets/locale/en.json");
}
```

Установите язык и создайте текст указав ключ для текста:
`setLanguage` влияет на всю игру.

```js
create(){
	this.translate.setLanguage("en");
	const label = this.add.label(0,0, "{key}", {fontSize: "50px"});
}
```

Поменяйте язык. 
 
```js
this.translate.setLanguage("fr");
```

*Заметьте, предварительно загружать все языки не обязательно, хоть и можно.*
При вызове метода смены языка, если файл перевода ранее не был загружен, он сам загрузится и весь доступный текст в игре созданный через `this.add.label` "переведётся" на указанный язык.

Так-же можно получить "перевод" текста. Текст вернётся на текущем языке:

```js
console.log(this.translate.getTranslate("{myKey}"));
```

Можно узнать текущий установленный язык:

```js
console.log(this.translate.getLanguage());
```

Можно указывать несколько ключей:

```js
const label = this.add.label(0,0, "{key1} {key2}", {fontSize: "50px"});
```

---
## Методы текстового объекта

Установка нового ключа.

```js
label.setTextKey("{myNewKey}");
```


Установка максимальной ширины текстового блока  в px.

```js
label.setFitWidth(200);
```

Выключить или включить ранее установленный `setFitWidth`

```js
label.setFitWidthEnabled(false);
```


Вернёт `true/false` в зависимости был ли установлен `setFitWidth(number)`

```js
console.log(label.getFitWidthEnabled());
```

---
## Файлы перевода

Файлы перевода имеют данный вид: 
Имя файла - язык за который отвечает данный файл. "ru.json".

```json
{
	"{settings}": "Настройки",
    "{game}": "Игра",
    "{exit}": "Выход"
}
```

## CSV

Файлы перевода можно получить из `*.csv` файла, перетащив его на скрипт `CSV2JSON.py` и рядом с файлом  появятся файлы перевода в формате `*.json`.

![CSV2JSON.gif](https://github.com/Qugurun/Phaser3-Label-Translate-Plugin/blob/main/CSV2JSON.gif)

*Для успешной обработки файла CSV должен быть установлен Python.* *

CSV файл имеет такой вид:
Название первого столбца важно чтобы был именно `key`, названия остальных столбцов являются идентификаторами языка и итоговыми именами для файлов перевода.

| key        | ru        | en       |
| ---------- | --------- | -------- |
| {settings} | Настройки | Settings |
| {game}     | Игра      | Game     |
| {exit}     | Выход     | Exit     |
Пример файла CSV:

[Пример таблицы](https://docs.google.com/spreadsheets/d/11lQEBhEIqXbmaXeNp7G18mlrq2J0pNZCpmwcyrIc_wk/edit?usp=sharing)

Вы можете попытаться получить автоматический перевод через гугл таблицы, введя формулу:

Чтобы слова "не гуляли регистром".  
  
Преобразует первые буквы всех слов в заглавные.  
`=PROPER(GOOGLETRANSLATE(A1;"en";"ru"))`
  
Преобразует символы заданной строки в нижний регистр.  
`=LOWER(GOOGLETRANSLATE(A1;"en";"ru"))` 
  
Преобразует символы заданной строки в верхний регистр.  
`=UPPER(GOOGLETRANSLATE(A1;"en";"ru"))`