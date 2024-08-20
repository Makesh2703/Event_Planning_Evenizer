#!/bin/bash

# Generate key flow
if [ ! -f ~/.ssh/id_rsa ]; then
    echo "Generating new key..."
    ssh-keygen -f ~/.ssh/id_rsa -q -N ""
fi
echo "------------------"
cat ~/.ssh/id_rsa.pub
echo "------------------"
echo "Please add this key to your GitHub account"
echo "See this link 'https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account' on how to do so"
read -p "Press enter to continue once you've added the key to your GitHub profile..."


# Initialise git flow
echo "Enter your github username: "
read username
echo "Enter your repo name: "
read repo

# Set git credentials
git config --global user.name username
git config --global user.email wecp-dummy@gmail.com

# Setup workspace
git init
git remote remove origin  # Remove old origin if exists else next command fails
git remote add origin "git@github.com:${username}/${repo}.git"
git add .
git commit -m "wecp initial commit"
git branch -M main
# Check if the 'main' branch exists in the remote repository
if git ls-remote --exit-code --heads origin main; then
    # Remote branch called main exists
    echo "Remote branch main already exists, pulling it"
    git pull origin main --allow-unrelated-histories    
else
    # Remote branch named main doesn't exist
    echo "Remote branch main doesn't exist, creating one"
    git push origin main
fi
echo "------------------"
echo "Linked to github established"
echo "You can now push/pull your code to remote."
echo "------------------"