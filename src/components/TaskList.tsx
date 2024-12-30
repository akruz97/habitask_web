import React, { useEffect } from "react"
import { ITaskList } from "../interfaces"
import moment from "moment"
import { TaskProps } from "../redux/slices/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { resetFlagsTask } from "../redux/slices/taskReducer";
import { toast } from "react-toastify";
import { deleteTaskAction, markAsCompleteTaskAction } from "../redux/actions/taskActions";


export const TaskList = ({ tasks = [] } : ITaskList) => {

    const { 
        errorDelete,
        successDelete,
        errorMarkComplete,
        successMarkComplete
    } = useSelector((state: RootState) => state.task);

    const dispatch: any = useDispatch();

    useEffect(() => {
        if(errorDelete && errorDelete.length){
            toast(errorDelete, { type: 'error' })
            dispatch(resetFlagsTask());
            return;
        }

        if(successDelete && successDelete.length){
            toast(successDelete, { type: 'success' })
            dispatch(resetFlagsTask());
            return;
        }

        if(errorMarkComplete && errorMarkComplete.length){
            toast(errorMarkComplete, { type: 'error' })
            dispatch(resetFlagsTask());
            return;
        }

        if(successMarkComplete && successMarkComplete.length){
            toast(successMarkComplete, { type: 'success' })
            dispatch(resetFlagsTask());
            return;
        }
    }, [errorDelete, 
        successDelete, 
        errorMarkComplete, 
        successMarkComplete])


    const onDelete = (taskId: number) => {
        dispatch(deleteTaskAction(taskId));
    }

    const onMarkAsComplete = (taskId: number) => {
        dispatch(markAsCompleteTaskAction(taskId));
    }

    return (
        <React.Fragment >
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                 <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                        Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            User Owner
                        </th>
                        <th scope="col" className="px-6 py-3">
                            User Asigned
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date Created
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date Completed
                        </th>
                        <th scope="col" className="px-6 py-3">
                           ACTION
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
    
            {
                tasks.map((task: TaskProps) => {
                    return (
                        <tr key={task.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                             <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {task.title}
                            </th>
                            <td className="px-6 py-4">
                            {`${task.user_owner.name} ${task.user_owner.lastname}`}
                            </td>
                            <td className="px-6 py-4">
                            {`${task.user_asigned.name} ${task.user_asigned.lastname}`}
                            </td>
                            <td className="px-6 py-4">
                                {task.completed ? 'Completed' : 'Pending'}
                            </td>
                            <td className="px-6 py-4">
                                {moment(task.created).format('YYYY-MM-DD')}
                            </td>
                            <td className="px-6 py-4">
                                {task?.date_completed ? moment(task?.date_completed).format('YYYY-MM-DD') : 'Empty'}
                            </td>
                            <td className="px-6 py-4">
                                {
                                    task.completed ? '-------' : <button 
                                    onClick={() => onMarkAsComplete(task.id)}
                                    type="button" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Mark as completed</button>
                                }
                            </td>
                            <td className="px-6 py-4">
                                <button type="button" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                            </td>
                            <td className="px-6 py-4">
                                <button type="button" 
                                onClick={() => onDelete(task.id)}
                                className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                            </td>
                        </tr>
                    )
                })
               }
        </tbody>
    </table>
</div>
        </React.Fragment>
    )
}