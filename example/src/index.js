import 'phaser';
import { LabelTranslatePlugin } from './plugins/label_translate_plugin';

const config = {
    language: "en",
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    },
    plugins: {
        global: [{
            key: "LabelTranslatePlugin",
            plugin: LabelTranslatePlugin,
            start: true,
            mapping: "translate",
            data: {
                path: "assets/locale/"
            }
        }]
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.json(config.language, "assets/locale/" + config.language + ".json");
}

function create() {
    this.translate.setLanguage(config.language);

    //----------------------------------------
    // current language
    const label1 = this.add.label(config.width / 2, config.height / 4, "{language}", { fontSize: "25px" }).setOrigin(0.5);

    //----------------------------------------
    // example text
    const label2 = this.add.label(config.width / 2, config.height / 2, "{text}", { fontSize: "50px" }).setOrigin(0.5);
    label2.setFitWidth(config.width - 20);

    //----------------------------------------
    // button
    const allLanguages = ["en", "it", "fr", "tr", "ru"];
    let languagePosition = allLanguages.indexOf(config.language);

    const button = this.add.container(config.width / 2, config.height - config.height / 4);
    button.rect = this.add.rectangle(0, 0, 200, 50, 0x7ED22A).setOrigin(0.5);
    button.label = this.add.label(0, 0, "{button}", { fontSize: "25px" }).setOrigin(0.5);
    button.label.setFitWidth(button.rect.width - 20);

    button.setSize(button.rect.width, button.rect.height);
    button.setInteractive();

    button.on('pointerdown', function() {
        this.setScale(0.95)

    });

    button.on('pointerup', function() {
        button.setScale(1.0)
        if (languagePosition < allLanguages.length - 1) {
            languagePosition++;
        } else {
            languagePosition = 0;
        }

        this.translate.setLanguage(allLanguages[languagePosition]);
    }, this);

    button.on('pointerout', function() {
        this.setScale(1.0)
    });

    button.add([button.rect, button.label]);

    //----------------------------------------
    console.log(this.translate.getLanguage());
}