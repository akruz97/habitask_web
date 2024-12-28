import React, { useEffect } from "react"
import { Header } from "../../components/Header"
import { useDispatch, useSelector } from "react-redux"
import { getTasksAction } from "../../redux/actions/taskActions";
import { RootState } from "../../redux/store";
import { TaskList } from "../../components/TaskList";
import { ModalNewTask } from "../../components/ModalNewTask";


export const TasksPage = () => {

    const dispatch: any = useDispatch();

    const { tasks = [] } = useSelector((state: RootState) => state.task);

    const [openModal, setOpenModal] = React.useState(false);
    const handleOpen = () => setOpenModal(!openModal);

    useEffect(() => {
        dispatch(getTasksAction());
    }, [dispatch])

    return (
        <React.Fragment>
            <Header />
            <div className="mt-5  text-left">
                    <button  
                        onClick={() => setOpenModal(true)}
                        className="btn bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 px-5 py-2.5 text-white rounded-lg" 
                        type="button" >
                        New Task
                    </button>
               </div>
            <div className="page">Task Page</div>
            <TaskList tasks={tasks} />

            <ModalNewTask open={openModal} handleOpen={handleOpen} />
        </React.Fragment>
    )
}