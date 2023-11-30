##  SERVERLESS TODO APP  (AWS)



## Architecture Diagramm

![image](https://github.com/Tim275/Serverless-TODO-APP-Frontend/assets/117520669/9a55bd08-e35d-4220-8ad3-788ee4769411)



## Front-END-Feautures:

1.  All of the CRUD operations has been handled properly as the async actions
2.  Added tasks also saved into the local storage of the client’s browser

## BACK-END-Feautures:

### Lambdas

1. addTodo: This Lambda function is used to create a new todo item in the DynamoDB table.
2. deleteTodo: This Lambda function is used to delete a specific todo item from the DynamoDB table based on its `id`.
3. fetchTodo: This Lambda function is used to retrieve a specific todo item from the DynamoDB table based on its `id`.
3. fetchTodos: This Lambda function is used to retrieve all todo items for a specific user from the DynamoDB table.
4. updateCompleted.js: This Lambda function is used to update the 'completed' status of a specific todo item in the DynamoDB table.
5. editTodo.js: This Lambda function is used to update the details of a specific todo item in the DynamoDB table.
6. updateComplete: This Lambda function is used to update the 'completed status of a specific todo item in the DanymoDB table.



### DynamoDb

serves persistent storage for the todo items in this app.

### View the app (Hosted on Netlify):

soon on amplify


### Tools:

React.js, Tailwind CSS, AWS Cloud, NodeJs

### Thanks for visiting this repo, take care!
