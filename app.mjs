// Create HTTP Server
//=========================================================
import http from "http";
import { TodoListService } from "./todolist-service.mjs"; // import Class TodoList-Service


const service = new TodoListService();
const server = http.createServer( (request, response) => {

    // ini biar response dari server nya balikan nya json
    response.setHeader("Content-Type", "application/json")

    // API GET utk data Todolist nya
    if (request.method === "GET") {
        service.getTodoList(request, response);
    }else if(request.method === "POST") {
        service.createTodo(request, response);
    }else if(request.method === "PUT") {
        service.updateTodo(request, response);
    }else if(request.method === "DELETE") {
        service.deletetodo(request, response);
    }

});

server.listen(3000);