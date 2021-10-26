#!/usr/bin/env node

const CSVFileValidator = require('csv-file-validator');
const { readFileSync } = require('fs');
const chalk = require('chalk');

async function main(){
  let errored = false;
  const file = readFileSync('./gnosis-safe-address-book.csv', 'utf-8');

  const config = {
    isHeaderNameOptional: true,
    headers: [{
      name: 'address',
      inputName: 'address',
      required: true,
      requiredError: function (headerName, rowNumber, columnNumber) {
          return `${headerName} is required in the ${rowNumber} row / ${columnNumber} column`
      },
    },
    {
      name: 'name',
      inputName: 'name',
      required: true,
      requiredError: function (headerName, rowNumber, columnNumber) {
          return `${headerName} is required in the ${rowNumber} row / ${columnNumber} column`
      }
    },
    {
      name: 'chainId',
      inputName: 'chainId',
      required: true,
      requiredError: function (headerName, rowNumber, columnNumber) {
          return `${headerName} is required in the ${rowNumber} row / ${columnNumber} column`
      }
    }]
  };

  const result = await CSVFileValidator(file, config)

  for (const error of result.inValidMessages) {
    errored = true;
    console.log(chalk.red(`Error: ${error}`));
  }

  if (errored){
    console.log();
    console.log('CSV validation failed');
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .then((error) => {
    console.log(error)
    process.exit(1)
  })