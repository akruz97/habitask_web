import React, { useEffect } from "react"
import { Header } from "../../components/Header"
import { useDispatch, useSelector } from "react-redux"
import { getTasksAction } from "../../redux/actions/taskActions";
import { RootState } from "../../redux/store";
import { TaskList } from "../../components/TaskList";
import { ModalNewTask } from "../../components/ModalNewTask";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";

export const TasksPage = () => {

    const dispatch: any = useDispatch();

    const { 
        limit,
        offset,
        tasks = [] 
    } = useSelector((state: RootState) => state.task);

    const [active, setActive] = React.useState(1);
 
    const getItemProps = (index) =>
        ({
        variant: active === index ? "filled" : "text",
        color: "gray",
        onClick: () => setActive(index),
        } as any);
    
    const next = () => {
        if (active === 5) return;
    
        setActive(active + 1);
    };

    useEffect(() => {
        if(active === 1){
            dispatch(getTasksAction({  
                offset:  0,
                limit: limit
            }))
            return;
        }

        let newOffset =  (active * limit) - limit;

        dispatch(getTasksAction({ 
            offset: newOffset,
            limit: limit
        }))
    }, [active]);
    
    const prev = () => {
        if (active === 1) return;
    
        setActive(active - 1);
    };
 

    const [openModal, setOpenModal] = React.useState(false);
    const handleOpen = () => setOpenModal(!openModal);

    useEffect(() => {
        dispatch(getTasksAction({offset, limit}));
    }, [dispatch])

    return (
        <React.Fragment>

            <div className="mt-5  text-left">
                    <button  
                        onClick={() => setOpenModal(true)}
                        className="btn bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 px-5 py-2.5 text-white rounded-lg" 
                        type="button" >
                        New Task
                    </button>
               </div>
            <TaskList tasks={tasks} />

            <div className="flex justify-center my-5 ">

         
            <div className="flex items-center gap-4  ">
                <Button
                    variant="text"
                    className="flex items-center gap-2"
                    onClick={prev}
                    disabled={active === 1}
                >    
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                </Button>
                <div className="flex items-center gap-2">
                    <IconButton {...getItemProps(1)}>1</IconButton>
                    <IconButton {...getItemProps(2)}>2</IconButton>
                    <IconButton {...getItemProps(3)}>3</IconButton>
                    <IconButton {...getItemProps(4)}>4</IconButton>
                    <IconButton {...getItemProps(5)}>5</IconButton>
                </div>
                <Button
                    variant="text"
                    className="flex items-center gap-2"
                    onClick={next}
                    disabled={active === 5}
                >
                    Next
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
                </div>
            </div>

            <ModalNewTask open={openModal} handleOpen={handleOpen} />
        </React.Fragment>
    )
}