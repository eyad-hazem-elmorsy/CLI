import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';

const program = new Command();

program
  .name('GitHub-APIs')
  .description('CLI to get the repositories of a single user')
  .version('1.0.0');

program
.command('get')
.description('get a repo')
.action(() => {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'username',
            message: 'Enter the username:\n'
        }
        ])
        .then((answer) => {
            const url = 'https://api.github.com/users/' + answer.username + '/repos';
            console.log(url);
            fetch(url).then((ret) => {
                return ret.json();
            }).then((ret) => {
                const repos = ret.map(repo => repo.name);
                if (!fs.existsSync('./repos/')) fs.mkdir('./repos/', (err) => {
                    if (!err) console.log('Folder created');
                });
                fs.writeFile('./repos/' + answer.username + '.json', JSON.stringify(repos), 'utf8', () => {
                    console.log("Repo has been added");
                })
            })
        })
});

program.parse(process.argv);