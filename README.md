# Software Engineering Project - Group 12

## About the project

We've been tasked by Squid Loyalty to come up with some new charts for their business dashboard. This repo hosts the front end and back ends for the new charts we're adding to their existing dashboard.

## Working on features and charts using issues and branches

Whenever we start on a new feature or chart, go through these steps:

*  For charts:
    *  Create an issue called "API Specification: \<chart name\>
    *  After you and your pair have decided on a format to serve and receive the data between the front and back end, make an issue for the front end "Chart: \<chart name\>" and an issue for the back end route "Back end route: \<chart name\>"
    *  Finally, you can start working on both sides of the chart on different branches. Branches for the front end of charts should be called `<issue number>-chart-<chart name>` and similarly for the back end `<issue number>-backend-<chart name>`
*  For other features:
    *  Create an issue called after your feature, then after the issue has been finalized (and assuming some code needs to be written to resolve it) start working on the feature on a new branch called `<issue number>-<feature name>`

## Github instructions

### For Windows

1. Download the git client from [here](https://git-scm.com/downloads)
2. Install the git client
3. Open either command prompt, or gitbash
4. Navigate to your documents or wherever you want to store the repository (Using cd in your terminal)
5. Run the following command to clone the repo ➡ `git clone https://github.com/MystikHub/sweng-12.git`
6. You've now got the repo down! 🎆
7. Navigate into the directory with the following command `cd sweng-12`
8. Run the `git pull` command to get the most up to date code.

### For Linux

1. Download git in your terminal with `sudo apt-get git` (Or similar, depends on your distribution)
2. Navigate to your documents or wherever you want to store the repository (Using cd in your terminal)
3. Run the following command to clone the repo ➡ `git clone https://github.com/MystikHub/sweng-12.git`
4. You've now got the repo down! 🎆
5. Navigate into the directory with the following command `cd sweng-12`
6. Run the `git pull` command to get the most up to date code.

### For Mac

1. Open your terminal (iTerm usually)
2. Run the following command `git --version`
3. If git isn't installed you will be prompted to install it
4. Navigate to your documents or wherever you want to store the repository (Using cd in your terminal)
5. Run the following command to clone the repo ➡ `git clone https://github.com/MystikHub/sweng-12.git`
6. You've now got the repo down! 🎆
7. Navigate into the directory with the following command `cd sweng-12`
8. Run the `git pull` command to get the most up to date code.


### Instruction for using VSCode as your Terminal and Editor
1. Download Visual Studio Code from [here](https://code.visualstudio.com/download)
2. Install it and run through the installation prompts
3. Once you've finished with basic setup navigate to "Source Control" in the sidebar and clone the repository using the repository's URL ➡ `https://github.com/MystikHub/sweng-12.git`
4. It'll prompt to open up the directory at the bottom right. Enter and open the terminal by using `Ctrl + '` or opening View > Terminal in the topbar.
5. Run the `git config user.email "<yourGitHubEmail>"` and the `git config user.name "<yourGitHubUserName>"` replacing your Github username and email.
6. Run the `git pull` command to get the most up to date code.

## Your first commit

Now that the repo is downloaded, it's time to commit a change.

1. Edit the README.md file, and add your name under the Contributors header. 

### Non-VSCode Instructions

2. In your terminal, navigate into the Sweng-11 folder.
3. Run `git pull`. It's important to do this **before every commit** to make sure you have the most up to date copy of the source.
4. Run `git add README.md` to add your changes to your commit. You can add multiple files per commit, but for now we only have the README.md
5. Run `git commit -m "<YOUR_NAME>'s first commit"` to commit the changes and to add a message. These messages should quickly describe any changes you've made in that commit
6. Run `git push` to push your changes to github!

### VSCode Instructions

2. Run `git pull` in the terminal. It's important to do this **before every commit** to make sure you have the most up to date copy of the source.
4. Either run `git add README.md` or use the GUI to add it in "Source Control" in order to add your changes to your commit. You can add multiple files per commit, but for now we only have the README.md
5. Run `git commit -m "<YOUR_NAME>'s first commit"` like above or use the message entry box to add the commit message `<YOUR_NAME>'s first commit`. These messages should quickly describe any changes you've made in that commit
6. Run `git push` to push your changes to github!

## Git help

The following links are handy if you need any git based help, or feel free to just ask!

- [Github CheatSheet 👩‍💻](https://dev.to/usmslm102/git-cheat-sheet-4f5a)
- [Learn git concepts](https://dev.to/unseenwizzard/learn-git-concepts-not-commands-4gjc)
- [Using VSCode and Git](https://code.visualstudio.com/docs/editor/github)

## Contributors
Imoesi Idogho
Stefan Hutanu
Sean Murphy
James Fenlon
Xiaowei Yang
