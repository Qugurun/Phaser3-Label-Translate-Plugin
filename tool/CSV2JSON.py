# CSV To JSON
# by Qugurun

import sys
import os
import csv
import json

csv_file_path = sys.argv[1]
output_dir = os.path.dirname(csv_file_path)

def process_row(row):
    locales = {}
    key = row['key']
    for locale, translation in row.items():
        if locale != 'key':
            locales[locale] = translation
    return key, locales

with open(csv_file_path, newline='', encoding='utf-8') as csvfile:
    csvreader = csv.DictReader(csvfile)

    locales_dict = {}
    for row in csvreader:
        key, locales = process_row(row)

        for locale, translation in locales.items():
            if locale not in locales_dict:
                locales_dict[locale] = {}

            locales_dict[locale][key] = translation

    for locale, translations in locales_dict.items():
        filename = os.path.join(output_dir, f"{locale}.json")
        with open(filename, 'w', encoding='utf-8') as jsonfile:
            json.dump(translations, jsonfile, ensure_ascii=False, indent=4)