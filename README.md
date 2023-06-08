# project-generator

A node script that will create a folder with a given name and populate it with all files/folders necessary to start a coding project.

## Includes:
- {projectName} folder
- index.js file
- .gitignore file (ignores node_modules by default)
- a README.md file - with the project name as a header
- /spec folder - index.test.js file

## Initialises:
- npm
- jest - amends package.json appropriately
- git

## Git Setup:
- commits folder to git - with "initial commit"
- sets a git remote based on given url
- pushes changes to git repository

## Usage:
- npm install -g project-generator-1.0.0.tgz (to make the code available globally)
- generate projectName gitRemote
