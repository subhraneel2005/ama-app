# Anonymous AMA App

### an  app where anyone can create a personal Ask Me Anything (AMA) page and receive anonymous questions from their oomfs.
### main goal of this project is strong spam protection, abuse filtering, and safe anonymous interactions.


#### Start postgres server
` sudo -u postgres /Library/PostgreSQL/18/bin/pg_ctl -D /Library/PostgreSQL/18/data start `

#### Connect to local db
` psql -U postgres `
` \c ama_app_db`

or 

` psql -U postgres -d ama_app_db `

#### To check if any local postgres process is running or not
` pg_isready ` 

or

 ` ps aux | grep postgres `

## Content moderation design for this app
![Content Moderation Design](https://raw.githubusercontent.com/subhraneel2005/ama-app/main/public/content-moderation-desing-1.png)

## Tracking anon user activities
![Tracking anon user activities Design](https://raw.githubusercontent.com/subhraneel2005/ama-app/main/public/anon-desing.png)

## Inbox design for this app
![Inbox design](https://raw.githubusercontent.com/subhraneel2005/ama-app/main/public/inbox-design.png)

## After user asks a question to a ama
![OnClick Send design](https://raw.githubusercontent.com/subhraneel2005/ama-app/main/public/onClick-send-design.png)