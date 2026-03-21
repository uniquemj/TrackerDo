<!-- Project Name -->
# Trackdo

<!-- Problem It solves. -->
## Project Overview
We find hard to track our task and hard to manage and organize task. So this project is focused on helping to resolve that issue. (This project will include other feature as well which I will be updating in future.)

<!-- Target User -->
## Main Motive
This project is for those people who want to keep track of their things and organize their things.

## Feature List

### Authentication
- Login
- Register
### Todo
- Create Todo
- Read Todo
- Update Todo
- Delete Todo
### Category
- CRUD Category


## Tech Stack
- **Backend**: Express, NodeJs
- **DB**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod
- **Frontend** : ReactJS

## Database Design

### Entities
- User
- Task
- Category

### Fields for each table
#### User
- user_id
- first_name
- last_name
- email
- password
- created_at
#### Todo
- t_id
- title
- description
- ***category***
- created_at
- due_date
- status


### Relation Definition
- One-to-Many: (user -> todo)
- One-to-Many: (category -> Todo)

### Schema Design
![image-schema]('/images/schema.png')

## API Planning
### Auth
- `POST /auth/login` - User Login
```js
Request Login

{
    email: string,
    password: string
}
```
- `POST /auth/signup` - User Register
```js
Request Register
{
    first_name: string,
    last_name: string,
    email: string,
    password: string
}
```
- `GET /user/me` - User Profile

### Task
- `POST /tasks` - Create Task
``` js
Request Create Task
{
    title: string,
    description: string,
    status: string,
    due_date: Date,
    category: string
}
```
- `GET /tasks` - Get All Tasks
-  `GET /tasks/:id` - Get Task By Id
- `PUT /tasks/:id` - Update Task
```js
Request Update Task
{
    id: string,
    data: {}
}
```
- `DELETE /tasks/:id` - DELETE Task
```js
Request Delete Task
{
    id: string
}
```

### Response
```js
Response Payload
{
    success: boolean,
    data: T | T[],
    error: T
}
```
