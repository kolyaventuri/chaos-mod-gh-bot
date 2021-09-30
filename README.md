# Chaos Mod Repo bot
_Issue bot for the [GTA V Chaos Mod](https://github.com/gta-chaos-mod/ChaosModV)_

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
---

# Overview
Handles posting issue comments to inform users of when their effect / feature / bug report might have an issue, or does not follow a template.
ex:
![image](https://user-images.githubusercontent.com/972446/132110453-fdc76886-927d-4709-9693-967d1b837511.png)


# Stack
- Framework
  - [Serverless](https://aws.amazon.com/lambda/)
- Testing
  - [AVA](https://github.com/avajs/ava) (test runner)
  - [XO](https://github.com/xojs/xo) (code linting) 

# How to use
1) `npm i` to get the dependencies installed
2) Run the local build with `npm run serve`! (alternatively `serve:watch` will run with nodemon)

# Deploying
1) Set your **profile**, **role**, **aws id**, and **github token** in a `.env` file (note: `role` is minus the environment. See step 3)
2) Generate a valid IAM policy with `npm run generate-policy -- --stage={{STAGE}}` where `{{STAGE}}` is your deployment stage, typically `production` or `dev` (default `dev`)
3) Attach your policy to your chosen role, with suffix. For example, if you set your role to `chaos-mod` in the `.env`, your IAM role should be `chaos-mod-production` for production.
3) Run `npm run deploy` to deploy to a dev stage, or `npm run deploy:production` to deploy to production.

# Q + A
### Why AVA? Why not Jest?
- Personal preference. I find Jest clunky in comparison, but it has its merits. Feel free to swap it out.
### Why use such a strict linter?
- I like clean code, and personally it forces me to write more readable code. The style is automagically enforced by Prettier anyways.
