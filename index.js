const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git/promise'); // Use simple-git/promise for async/await support
const random = require('random');
// const FILE_PATH = 'D:/flask_tute/first_api/GitHub_Graph/data.json';
const FILE_PATH = 'D://flask_tute//first_api//staging//data.json';


// Adjust baseDir to the correct path of your local repository
const git = simpleGit({
  baseDir: 'D://flask_tute//first_api//staging',
  binary: 'git',
  maxConcurrentProcesses: 6,
});

const makeCommit = async (n) => {
  for (let i = 0; i < n; i++) {
    const startDate = moment('2022-01-01');
    const endDate = moment('2023-12-31');
    const differenceInDays = endDate.diff(startDate, 'days');
    const randomDaysToAdd = random.int(0, differenceInDays);
    const DATE = startDate.add(randomDaysToAdd, 'days').format();

    const data = { date: DATE };
    console.log(DATE);

    // Write data to JSON file
    await jsonfile.writeFile(FILE_PATH, data);

    // Stage, commit, and push changes
    await git.add(FILE_PATH);
    await git.commit(DATE, FILE_PATH, { '--date': DATE });
  }

  // Push changes to the remote repository after all commits are made
  try {
    await git.push(['-u', 'origin', 'master']);
    console.log('Pushed changes to remote repository');
  } catch (err) {
    console.error('Error pushing to remote:', err);
  }
};

makeCommit(100).catch(console.error);
