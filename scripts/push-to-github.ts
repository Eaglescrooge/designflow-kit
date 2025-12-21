// Script to push DesignFlow Kit to GitHub
import { getUncachableGitHubClient } from '../server/github';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const REPO_NAME = 'designflow-kit';
const REPO_DESCRIPTION = 'Open-source UX/Product Design Toolkit - A comprehensive design workflow solution from research to handover';

async function pushToGitHub() {
  try {
    console.log('Getting GitHub client...');
    const octokit = await getUncachableGitHubClient();
    
    // Get authenticated user
    const { data: user } = await octokit.users.getAuthenticated();
    console.log(`Authenticated as: ${user.login}`);
    
    // Check if repo already exists
    let repoExists = false;
    try {
      await octokit.repos.get({
        owner: user.login,
        repo: REPO_NAME
      });
      repoExists = true;
      console.log(`Repository ${REPO_NAME} already exists`);
    } catch (error: any) {
      if (error.status !== 404) {
        throw error;
      }
    }
    
    // Create repository if it doesn't exist
    if (!repoExists) {
      console.log(`Creating repository: ${REPO_NAME}...`);
      await octokit.repos.createForAuthenticatedUser({
        name: REPO_NAME,
        description: REPO_DESCRIPTION,
        private: false,
        has_issues: true,
        has_projects: true,
        has_wiki: false,
        auto_init: false
      });
      console.log('Repository created successfully!');
    }
    
    // Configure git remote
    const remoteUrl = `https://github.com/${user.login}/${REPO_NAME}.git`;
    
    // Get access token for push
    const token = await getAccessToken();
    const authRemoteUrl = `https://${token}@github.com/${user.login}/${REPO_NAME}.git`;
    
    console.log('Configuring git remote...');
    
    // Remove existing remote if exists
    try {
      execSync('git remote remove github', { stdio: 'pipe' });
    } catch {}
    
    // Add new remote with auth
    execSync(`git remote add github "${authRemoteUrl}"`, { stdio: 'pipe' });
    
    // Push to GitHub
    console.log('Pushing to GitHub...');
    execSync('git push -u github main --force', { stdio: 'inherit' });
    
    console.log('\n✅ Successfully pushed to GitHub!');
    console.log(`\n🔗 Repository URL: https://github.com/${user.login}/${REPO_NAME}`);
    
    // Clean up - remove remote with token
    execSync('git remote remove github', { stdio: 'pipe' });
    
  } catch (error) {
    console.error('Error pushing to GitHub:', error);
    process.exit(1);
  }
}

// Helper to get access token for git push
async function getAccessToken() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found');
  }

  const response = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  );
  
  const data = await response.json();
  const connectionSettings = data.items?.[0];
  return connectionSettings?.settings?.access_token || connectionSettings?.settings?.oauth?.credentials?.access_token;
}

pushToGitHub();
