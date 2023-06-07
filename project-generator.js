#!/usr/bin/env node

const fs = require("fs");
const { exec } = require("child_process");

const projectName = process.argv[2];
const gitRemote = process.argv[3];

function projectGenerator(cb) {
	fs.mkdir(`./${projectName}`, { recursive: true }, (err, path) => {
		if (err) cb(err);
		fs.writeFile(`${projectName}/index.js`, "", (err) => {
			if (err) cb(err);
			fs.mkdir(`${path}/spec`, { recursive: true }, (err, specPath) => {
				if (err) cb(err);
				fs.writeFile(`${specPath}/index.test.js`, "", (err) => {
					if (err) cb(err);
					fs.writeFile(`${projectName}/.gitignore`, "node_modules", (err) => {
						if (err) cb(err);
						fs.writeFile(
							`${projectName}/README.md`,
							`# ${projectName}`,
							(err) => {
								if (err) cb(err);
								exec(`cd ./${path} && npm init -y`, (err, stderr, stdout) => {
									if (err) cb(err);
									if (stderr) cb(stderr);
									exec(
										`cd ./${path} && npm i jest -D`,
										(err, stderr, stdout) => {
											if (err) cb(err);
											if (stderr) cb(stderr);
											const filepath = `${path}/package.json`;
											fs.readFile(filepath, (err, buffer) => {
												if (err) cb(err);
												const data = JSON.parse(buffer);
												data.scripts.test = "jest";
												fs.writeFile(
													filepath,
													JSON.stringify(data, null, 2),
													(err) => {
														if (err) cb(err);
														exec(
															`cd ${path} && git init && git add . && git commit -m "initial commit"`,
															(err, stderr, stdout) => {
																if (err) cb(err);
																if (stderr) cb(stderr);
																exec(
																	`cd ${path} && git remote add ${projectName} ${gitRemote} && git remote -v && git push ${gitRemote} main`,
																	(err, stderr, stdout) => {
																		if (err) cb(err);
																		if (stderr) cb(stderr);
																		cb(null, stdout);
																	}
																);
															}
														);
													}
												);
											});
										}
									);
								});
							}
						);
					});
				});
			});
		});
	});
}

projectGenerator((err) => {
	if (err) console.log(err);
});

module.exports = projectGenerator;
