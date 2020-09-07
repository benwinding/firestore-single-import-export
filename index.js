const commander = require("commander");
const fs = require("fs");
const firestoreService = require("firestore-export-import");

commander
  .command("export")
  .description("Exports a collection to an output JSON file")
  .requiredOption(
    "--collectionPath <collection_path>",
    "The firestore path to the collection"
  )
  .requiredOption(
    "--serviceAccountPath <serviceAccount_path>",
    "The local path to the serviceAccount.json file"
  )
  .requiredOption(
    "--savePath <save_path>",
    "The local path to the output .json file"
  )
  .action(async (options) => {
    // Initiate Firebase App
    const serviceAccountPath = options.serviceAccountPath;
    const collectionPath = options.collectionPath;
    const savePath = options.savePath;
    const collectionPathNormalised = collectionPath.startsWith("/")
      ? collectionPath.slice(1)
      : collectionPath;
    const isCollection = collectionPathNormalised.split("/").length % 2 === 1;
    if (!isCollection) {
      console.error('Collection must have even number of "/" slashes');
      return;
    }
    let serviceAccount;
    try {
      serviceAccount = require(serviceAccountPath);      
      firestoreService.initializeApp(serviceAccount);
      const data = await firestoreService.backup(collectionPath);
      fs.writeFileSync(savePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error.toString());
      return;
    }
    console.log('DONE!')
  });

commander
  .command("restore")
  .description("Restores a collection from an output JSON file")
  .requiredOption(
    "--serviceAccountPath <serviceAccount_path>",
    "The local path to the serviceAccount.json file"
  )
  .requiredOption(
    "--restorePath <restore_path>",
    "The local path to the output .json file"
  )
  .action(async (options) => {
    // Initiate Firebase App
    const serviceAccountPath = options.serviceAccountPath;
    const restorePath = options.restorePath;
    let serviceAccount;
    try {
      serviceAccount = require(serviceAccountPath);      
      firestoreService.initializeApp(serviceAccount);
      await firestoreService.restore(restorePath);
    } catch (error) {
      console.error(error.toString());
      return;
    }
    console.log('DONE!')
  });

commander.parse(process.argv);
