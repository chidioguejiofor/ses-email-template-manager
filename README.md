# SES Email Template Manager

The aim of this repository is simple, manage all the email templates that is created and used in your application

The main problem with AWS SES is that it doesn't give you the ability to view and edit your email templates like SendGrid. This makes creating and updating email templates a pain.

### How this project solves the problem

This project simplifies:

- createing and updating new email template based on HTML
- sending email templates using test variables to see how it looks
- previewing html template(since you can use live-server in VScode)

### Setup

To setup the project you need to set the env variables using `.env.example`.

```bash
export AWS_API_KEY=
export AWS_SECRET_KEY=
export AWS_REGION=
export SES_SOURCE=
```

Install deps with `npm install`

### Adding a new template

#### Setmp 1: Create the Folder

To add a new template, create a new folder in the email-tempaltes folder. Each you create should have a structure that looks like this:

```bash

src/email-templates/example-foldder
├── testVariables.json
├── main.html
└── main.txt
```

The `main.html` is the html that would be sent. The `main.txt` is how the email would look if the user distabled HTML while the `testVariables.json` is the sample testVariables that would be sent.

#### Setmp 2: Add folder to the config file

In `src/settings.ts` you would see a config file that maps email-templates to folder names.

The keys are the Email template name on AWS while the values are the folder that maps in this repo.

#### Setmp 3: Run interactive CLI tool

When you run `npm run dev`, you would see 2 options:

- Create or Update Template
- Send Test Email: This uses variables in the `testVariables.json` file to send a test email to any email you sepecify. You can seperate multiple emails with a comma

#### Important Notice ⚠️
All testVariables must contain `subject` with is the subject of the email. Very important!

### Interactive CLI Tool

The main idea is to make the different operations that we would like to perform easy to manage using options in CLI tool. To run this CLI tool simply run:

```bash
npm run dev
```

This would show the available options, you can run it and see how things go.
