# `firestore-single-import-export`

A simple CLI tool to export/import a single collection from firestore.

## Install

`npm i -g firestore-single-import-export`

## Usage

```
Usage: firestore-single-import-export [options] [command]

Options:
  -h, --help         display help for command

Commands:
  export [options]   Exports a collection to an output JSON file
  restore [options]  Restores a collection from an output JSON file
  help [command]     display help for command
```


## Export
```
Usage: firestore-single-import-export export [options]

Exports a collection to an output JSON file

Options:
  --collectionPath <collection_path>          The firestore path to the collection
  --serviceAccountPath <serviceAccount_path>  The local path to the serviceAccount.json file
  --savePath <save_path>                      The local path to the output .json file
  -h, --help                                  display help for command
```

## Restore
```
Usage: firestore-single-import-export restore [options]

Restores a collection from an output JSON file

Options:
  --serviceAccountPath <serviceAccount_path>  The local path to the serviceAccount.json file
  --restorePath <restore_path>                The local path to the output .json file
  -h, --help                                  display help for command


```