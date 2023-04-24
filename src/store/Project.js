import {createStore} from 'vuex'
import {reactive, toRaw} from "vue";
const ProjectModule ={
    state: {
        Projects:[],
        currentId:-1,
    },
    mutations: {
        addProject(state, project){
            state.Projects.push(JSON.parse(JSON.stringify(project)))
        },
        removeProject(state, index){
            state.Projects.splice(index,1)
        },
        setCurrent(state, id){
            state.currentId = toRaw(id)
        },
        updateCurrent(state, props){
            state.Projects.splice(props.index, 1, JSON.parse(JSON.stringify(props.project)))
        },
    },
    actions: {

    },
    getters: {
        get_currentProject(state){
            const projects = state.Projects
            for(let project of projects){
                if(project.id===state.currentId){
                    return project
                }
            }
        },
        get_currentIndex(state){
            let index = 0
            for(let project of state.Projects){
                if(project.id===state.currentId){
                    return index
                }
                index++
            }
        },
    }
}
export default ProjectModule