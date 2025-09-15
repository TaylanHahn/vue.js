import Task from "./Task.js";

export default {
    name: 'crud',
    componnets: {"cpw2-task": Task}, //importa a tag que será usada no template

    data(){
        return{
            tasks: [
              {
                status: false,
                description: "My First Task",
              },
              {
                status: false,
                description: "My Second Task",
              },
            ],
            newDesciption: "",
            editIndex: null,
            editDescription: "",
        };
    },
    methods:{
        // 1. CREATE
        createTask(){
            if (this.description.trim() == '') {
                alert("Digite uma descrição!");
                return;
            }

            // Isso cria a tarefa 
            this.tasks.push({
                status: false, // Inicializa o status como false
                description: this.newDesciption, // Seta a descrição digitada
            });

            this.newDesciption = '';
        },
        // 2. READ


        // 3. UPDATE
        editTask(index){
            // guardamos as variaveis no data(), para o template saber qual tarefa está no modo edição
            this.editIndex = index;
            this.editDescription = this.tasks[index].description;
            /*  > Pega a descrição atual da tarefa clicada para editar. 
                > Coloca esse valor na variável — também no data().
                > Isso serve para preencher o campo com o texto atual e permitir a altereção da descrição.*/
        },

        saveEdit(index){
            if(this.editDescription.trim() == ''){
                alert("Não é possivel salvar um campo vazio.");
                return;
            }

            this.tasks[index].description = this.editDescription; // A task na posição index tem sua propriedade description substituída pelo que foi digitado na edição (editDescription).
            this.editIndex = null; // Coloca editIndex de volta para null, sinalizando que nenhuma tarefa está sendo editada no momento. O template saberá assim se mostra o campo de edição ou não.
            this.editDescription = ""; // Limpa o campo
        },

        cancelEdit(){
            this.editIndex =  null; // Sinaliza que nenhuma tarefa está sendo editada
            this.editDescription = ""; // Limpa o campo de edição
        },
        
        // 4. DELETE
        deleteTask(index){
            this.tasks.splice(index, 1); // Remove a tarefa na posição index do array tasks
        },

        // Muda a checkbox do status da task (false or true)
        updateStatus(index, newStatus){
            this.tasks[index].status = newStatus;
        },
    }, 
    template: `
        <!-- O V-FOR percorre o array tasks -->
        <div v-for="(task, index) in tasks" :key="index" class="mb-2">

            <!-- O <cpw2-task> aqui exibe cada tarefa quando não está em edição.-->
            <cpw2-task
                v-if="editIndex !== index"
                :status="task.status"
                :description="task.description"
                @updateTaskStatus="updateStatus(index, $event)" 
            ></cpw2-task>

            <!-- o V-ELSE habilita o modo de edição -->
            <div v-else class="box">
                <input
                v-model="editDescription"
                class="input"
                type="text"
                placeholder="Editar descrição"
                />

                <div class="buttons mt-2">
                    <button @click="saveEdit(index)" class="button is-success">
                        Salvar
                    </button>
                    <button @click="cancelEdit" class="button is-light">Cancelar</button>
                </div>
            </div>

            <!-- Botões de ações disparam métodos para editar ou remover tarefas.-->
            <div class="buttons mt-2">
                
            <button @click="editTask(index)" v-if="editIndex !== index" lass="button is-info is-small">
                    Editar
                </button>

                <button @click="deleteTask(index)" class="button is-danger is-small">
                    Remover
                </button>
            </div>
        </div>
    `
} 
