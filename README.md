# UpTask API (MERN Backend)

UpTask API is the backend for the UpTask project and task management platform (Trello-like).  
It provides authentication, role-based access control, and project/task management using a RESTful API built with **Node.js**, **Express**, and **MongoDB**.

This API is designed to work with the UpTask frontend built in React + TypeScript.


## 🔗 Related Repositories

Frontend: https://github.com/SebastianEM98/UpTask-frontend


## 🚀 Features

- User authentication with **JWT**  
- Role-based authorization (**project owners & collaborators**)  
- Project and task CRUD operations  
- Secure password hashing with **bcrypt**  
- Token-based session management  
- MongoDB database with **Mongoose**  
- RESTful API architecture  
- Protected routes with middleware  
- Environment-based configuration  


## 🛠️ Technologies Used

- **Node.js**  
- **Express.js**  
- **MongoDB**  
- **Mongoose**  
- **JWT** (authentication)  
- **bcrypt** (password hashing)  
- **Resend** (email verification & password recovery)
- **dotenv** (environment variables)  
- **cors**  
- **nodemon** (development)  


## 📦 Installation

```bash
git clone http://github.com/SebastianEM98/UpTask-backend
cd UpTask-backend
npm install
npm run dev
```


## 🔑 Environment Variables

Create a file named:

```text
.env
```

Add the following:

```text
NODE_ENV=development
DATABASE_URL=your_mongodb_connection
FRONTEND_URL=http://localhost:5173
RESEND_API_KEY=re_xxxxxxxxx
JWT_SECRET=your_jwt_secret
```

> NODE_ENV=development is used to enable development features such as testing the API with Postman and relaxed CORS rules.
> In production, this value should be set to `production`.


Replace the values with your own configuration.


## ⚙️ Project Structure

```text
src/
  config/
  controllers/
  emails/
  helpers/
  middlewares/
  models/
  routes/
  utils/
```


## 📄 License

This project is licensed under the MIT License.