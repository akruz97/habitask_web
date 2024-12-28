import React from "react"
import { ITaskList } from "../interfaces"
import moment from "moment"


export const TaskList = ({ tasks = [] } : ITaskList) => {
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
                    User Create
                </th>
                <th scope="col" className="px-6 py-3">
                    User Asigned
                </th>
                <th scope="col" className="px-6 py-3">
                    Completed
                </th>
                <th scope="col" className="px-6 py-3">
                    Date Created
                </th>
                <th scope="col" className="px-6 py-3">
                    Date Completed
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
    
            {
                tasks.map((item: any) => {
                    return (
                        <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                             <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.title}
                            </th>
                            <td className="px-6 py-4">
                            {item.UserTask.user_id}
                            </td>
                            <td className="px-6 py-4">
                                {item.UserTask.user_asigned}
                            </td>
                            <td className="px-6 py-4">
                                {item.completed ? 'Completed' : 'Pending'}
                            </td>
                            <td className="px-6 py-4">
                                {moment(item.created).format('YYYY-MM-DD')}
                            </td>
                            <td className="px-6 py-4">
                                {item?.date_completed ? moment(item?.date_completed).format('YYYY-MM-DD') : 'Empty'}
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
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