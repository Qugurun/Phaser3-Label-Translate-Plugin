/**
 * Plugin for label translate in Phaser 3.80.x.
 * Version: 0.0.4
 * Author: Qugurun
 * License: MIT

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

 */

export class LabelTranslatePlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        const plugin = this;

        this.translation = {};
        this.config = []
        this.current = null;

        const prototypeText = Phaser.GameObjects.GameObjectFactory.prototype.text;
        Phaser.GameObjects.GameObjectFactory.prototype.label = function (x, y, text, style) {
            const object = prototypeText.call(this, x, y, text, style);

            if (!this.scene.__textObjects) {
                this.scene.__textObjects = [];
            }
            this.scene.__textObjects.push(object);
            let __text = "";

            if (Array.isArray(text)) {
                for (const item of text) {
                    __text += "\n" + item;
                }
            } else {
                __text = text;
            }

            object.__settings = {
                text: __text,
                fontSize: object.style.fontSize,
                isFitWidth: false,
                fitWidthValue: 0,
            }

            object.getFitWidthEnabled = function () {
                return this.__settings.isFitWidth;
            }

            object.setFitWidthEnabled = function (value) {
                if (typeof value == "boolean") {
                    this.__settings.isFitWidth = value;

                    if (!value) {
                        this.setFontSize(this.__settings.fontSize);
                    }
                    return this;
                }
            }

            object.getFitWidth = function () {
                return this.__settings.isFitWidth;
            }

            object.setFitWidth = function (value) {

                if (typeof value == "number") {

                    this.__settings.isFitWidth = true;
                    this.__settings.fitWidthValue = value;

                    this.setFontSize(this.__settings.fontSize);

                    const totalWidth = this.width;

                    if (totalWidth > value) {
                        const currentSize = parseInt(this.style.fontSize);
                        const newSize = (currentSize * value) / totalWidth;
                        this.setFontSize(newSize);
                    }
                }
                return this;
            }

            object.setTextKey = function (value) {
                let __text = "";

                if (Array.isArray(value)) {
                    for (const item of value) {
                        __text += "\n" + item;
                    }
                } else {
                    __text = value;
                }

                this.__settings.text = __text;

                this.setText(plugin.getTranslate(__text));

                if (this.__settings.isFitWidth) {
                    this.setFitWidth(this.__settings.fitWidthValue);
                }
            }

            object.setTextKey(text)

            return object;
        }
    }

    init(params) {
        this.current = params.current;
        this.path = params.path;
    }

    getTranslate(key) {
        let result = key;

        const inputString = key;
        const regex = /\{[^{}]+\}/g;
        const matches = inputString.match(regex);

        if (matches) {
            matches.forEach(match => {
                const matchedKey = match
                if (match in this.translation) {
                    const replacement = this.translation[match];
                    result = result.replace(match, replacement);
                }
            });
        }

        return result;
    }

    __setTextKey() {
        this.game.scene.scenes.forEach(function (sceneObject) {
            if (sceneObject.__textObjects) {
                for (const textObject of sceneObject.__textObjects) {
                    textObject.setTextKey(textObject.__settings.text);
                }
            }
        });
    }

    getLanguage() {
        return this.current;
    }

    setLanguage(value) {
        this.current = value;

        let scene = this.game.scene.scenes[0];

        if (scene.cache.json.get(value) == undefined) {
            scene.load.json(value, this.path + value + ".json");
            scene.load.on('complete', () => {
                this.translation = scene.cache.json.get(value);
                this.__setTextKey();
            }, scene);
            scene.load.start()
        } else {
            this.translation = scene.cache.json.get(value);
            this.__setTextKey();
        }
    }
}
