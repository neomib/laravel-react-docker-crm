# CRM Manager - React, Laravel, MySQL, Docker, NGINX
A basic CRM boilerplate to start directly coding on React, Laravel and MySQL with Docker Compose. 

Features:
- Responsive design
- User authentication (signup, signin)
- Contacts manager: contact details + activity log

<img width="1814" height="925" alt="Screenshot from 2026-02-20 01-25-12" src="https://github.com/user-attachments/assets/fb452b84-30ab-4e00-9b4b-50bfb1b1673d" />
<img width="1837" height="905" alt="Screenshot from 2026-02-20 01-23-30" src="https://github.com/user-attachments/assets/0e29b01f-17b9-4f38-9b8f-f1e1690f55ad" />
<img width="1832" height="905" alt="Screenshot from 2026-02-20 01-31-21" src="https://github.com/user-attachments/assets/bbe8fc53-980a-4405-a859-005349ba5934" />
<img width="395" height="743" alt="Screenshot from 2026-02-20 01-40-55" src="https://github.com/user-attachments/assets/991510ca-8b5f-4c51-b125-c8f8dc030aac" />



## Frontend
- NodeJS lts
- React 19.0.0
- Vite
- Typescript
- Redux

## Backend
- PHP 8.4 
- Laravel 12


## MySQL 

MySQL Version: 5.7.x

## Using the Project

Clone the repository

```
git clone https://github.com/neomib/laravel-react-docker-crm
```

CD into the cloned folder

```
cd laravel-react-docker-crm
```

Run the setup script 
- Make sure you have 'docker-compose' installed
- Make sure to wait until all containers are up (including react) before opening the url in the browser

```
./setup.sh
```

Open the url in the browser

```
http://localhost:8080/
```

### To-Do:
1. Implement table pagination
2. Add Redis
3. Add nice Dashboard features like number of contacts
