# Label Translate Plugin for Phaser 3.80.x

The plugin adds automatic translation for text elements based on `{keys}` from their presence in translation` *.json` files.

![priview.gif](https://github.com/Qugurun/Phaser3-Label-Translate-Plugin/blob/main/preview.gif)

Example:
```js
const label = this.add.label(0,0, "{key}", {fontSize: "50px"});
```

---
## Installation

Place and connect the file labeltranslateplugin.js:
```js
import { TextTranslatePlugin } from "./plugin/labeltranslateplugin";
```

Add to the configuration:

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

Specify the path to the translation folder in the path parameter.

Important! The path must end with a "/" slash.

---
## Getting Started

Preload the starting language in the preload scene method

```js
preload(){
  this.load.json("en", "assets/locale/en.json");
}
```

Set the language and create the text by specifying the key:
setLanguage affects the entire game.

```js
create(){
  this.translate.setLanguage("en");
  const label = this.add.label(0,0, "{key}", {fontSize: "50px"});
}
```

Change the language. 

```js
this.translate.setLanguage("fr");
```

Note: It is not necessary to preload all languages, although it is possible.
When calling the language change method, if the translation file has not been loaded before, it will be loaded automatically and all available text in the game created through this.add.label will be "translated" to the specified language.

You can also get the "translation" of the text. The text will return in the current language:

```js
console.log(this.translate.getTranslate("{myKey}"));
```

You can find out the current set language:

```js
console.log(this.translate.getLanguage());
```

You can specify multiple keys:

```js
const label = this.add.label(0,0, "{key1} {key2}", {fontSize: "50px"});
```

---
## Text Object Methods

Setting a new key.

```js
label.setTextKey("{myNewKey}");
```

Setting the maximum width of the text block in px.

```js
label.setFitWidth(200);
```

Turn off or on the previously set setFitWidth

```js
label.setFitWidthEnabled(false);
```

Returns true/false depending on whether setFitWidth(number) is set.

```js
console.log(label.getFitWidthEnabled());
```

---
## Translation Files

Translation files have the following format: 
The file name is the language for which the file is responsible. "ru.json".

```json
{
  "{settings}": "Settings",
  "{game}": "Game",
  "{exit}": "Exit"
}
```

## CSV

Translation files can be obtained from a `*.csv` file by dragging it to the` CSV2JSON.py` script, and translation files in `*.json` format will appear next to the file.

![CSV2JSON.gif](https://github.com/Qugurun/Phaser3-Label-Translate-Plugin/blob/main/CSV2JSON.gif)

Python must be installed to successfully process the CSV file.

The CSV file looks like this:
The name of the first column is important to be key, the names of the other columns are language identifiers and final names for translation files.

| key        | ru        | en       |
| ---------- | --------- | -------- |
| {settings} | Settings  | Settings |
| {game}     | Game      | Game     |
| {exit}     | Exit      | Exit     |

Example CSV file:

[Example Table](https://docs.google.com/spreadsheets/d/11lQEBhEIqXbmaXeNp7G18mlrq2J0pNZCpmwcyrIc_wk/edit?usp=sharing)

You can try to get an automatic translation using Google Sheets by entering the formula:

To prevent words from "jumping case".

Capitalizes the first letter of each word.
`=PROPER(GOOGLETRANSLATE(A1, "en", "ru"))`

Converts the characters of a given string to lowercase.
`=LOWER(GOOGLETRANSLATE(A1, "en", "ru"))`

Converts the characters of a given string to uppercase.
`=UPPER(GOOGLETRANSLATE(A1, "en", "ru"))`
