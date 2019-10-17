const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const regexJira = RegExp(/^[\w\d]{1,6}-\d+\s.+/);
  const regexCw = RegExp(/^\d{6}\s.+/);
  
  const token = core.getInput('repo-token', {required: true});
  const pullRequest = github.context.payload.pull_request;
  
  if (!pullRequest) {
    console.log('Could not locate pull request in context, exiting.');
    return;
  }
  
  const client = new github.GitHub(token);
  const response = await client.pulls.get({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    pull_number: pullRequest.number
  });
  
  const title = response.data.title;
  if (!(regexJira.test(title) || regexCw.test(title))) {
    core.setFailed('PR title "'+title+'" does not match the required format.');
  }
  
  return;
}

run();
