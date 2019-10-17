const core = require('@actions/core');
const github = require('@actions/github');

async function run () {
  const token = core.getInput('repo-token', {required: true});
  const pullRequest = github.context.payload.pull_request;

  if (!pullRequest) {
    console.log('Could not locate pull request in context, exiting.');
    return;
  }

  console.log(pullRequest.body);
  return;
}
