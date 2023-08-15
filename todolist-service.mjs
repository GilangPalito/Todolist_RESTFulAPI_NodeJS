export class TodoListService {

    // Jadi nanti data todolist nya akan disimpan di array ini
    todolist = ["data_1", "data_2", "data_3"];

    // function utk set json nya
    getJsonTodolist(){
        return JSON.stringify({
            code : 200,
            status : "OK",
            data : this.todolist.map((value, index) => {  // untuk dapatin data array todolist
                return{
                    id: index,  // id diambil dari index array todolist
                    todo : value // todo  nyadiambil dari value array todolist
                }
            })
        })
    }

    // Function ini yg akan dipanggil utk todolist nya
    // +++++++++++++++++++++++++++++++++++++++++++++++

    // API Get / GET
    getTodoList(request, response){
        //balikin lagi detail response nya
        response.write(this.getJsonTodolist());
        response.end();
    }
    
    // API Create / POST
    createTodo(request, response) {

        // Saat menerima data, lalu di parsing body nya (karena return nya buffer),
        // lalu push data nya ke array todolist
        request.addListener("data", (data) => {
            const body = JSON.parse(data.toString());
            this.todolist.push(body.todo);

            //balikin lagi detail response nya
            response.write(this.getJsonTodolist());
            response.end();
        })
    }

    // API update / PUT
    updateTodo(request, response) {
        request.addListener("data", (data) => {
            const body = JSON.parse(data.toString());
            // Cek klo ada, jika ada id nya,  langsung update
            if (this.todolist[body.id]) {
                this.todolist[body.id] = body.todo;
            }

            //balikin lagi detail response nya
            response.write(this.getJsonTodolist());
            response.end();
        })
    }

     // API delete todo / DELETE 
     deletetodo(request, response){
        request.addListener("data", (data) => {
            
            const body = JSON.parse(data.toString());
            // Cek klo ada, jika ada id nya,  langsung update
            if (this.todolist[body.id]) {
                // klo ini, index yg akan didelete akan null, dan tidak nge geser index nya
                // delete todolist[body.id]; 

                // splice ini buat ngegeser index saat ada yg dihapus
                // 1 ini mksd nya jumlah yg akan di delete
                this.todolist.splice(body.id, 1);  
            }    
            //balikin lagi detail response nya
            response.write(this.getJsonTodolist());
            response.end();
        })
    }
}