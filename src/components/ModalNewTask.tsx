import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Select,
  Option,
  Spinner
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getListUserAction } from "../redux/actions/userActions";
import { ICreateTask } from "../interfaces";
import { useForm } from '../hooks/useForm'
import { createTaskAction } from "../redux/actions/taskActions";
import { toast } from "react-toastify";
import { resetFlagsTask } from "../redux/slices/taskReducer";

export function ModalNewTask({
  open,
  handleOpen
}) {
  const dispatch: any = useDispatch();

  const { userList = [], profile } = useSelector((state: RootState) => state.user);

  const { form, onChange, setFormValue } = useForm({
      title: '',
      completed: false,
      // user_id: 0,
      user_asigned_id: 0
  })

  const { 
    errorCreate,
    successCreate,
    loadingCreate
  } = useSelector((state: RootState) => state.task);

  useEffect(() => {
    dispatch(getListUserAction());
  }, [dispatch])

  useEffect(() => {
    if(errorCreate && errorCreate.length){
      toast('No se ha podido crear la tarea', { autoClose: 3000, type: 'error' });
      dispatch(resetFlagsTask());
      handleOpen();
      return;
    }

    if(successCreate && successCreate.length){
      toast('Tarea creada con éxito', { autoClose: 3000, type: 'success' });
      dispatch(resetFlagsTask());
      handleOpen()
      return;
    }
  }, [errorCreate, successCreate])

  const onSaveTask = () => {

    let users = [...userList];
    let asignedIndex = users.findIndex(x => x.id === form.user_asigned_id);
    console.log('asigned', asignedIndex);
    let data: ICreateTask = {
      title: form.title,
      completed: form.completed,
      user_asigned_id: form.user_asigned_id,
      user_owner: profile,
      user_asigned: users[asignedIndex]
    }
    console.log(data);
    dispatch(createTaskAction(data));
  }

  const onChangeTitle = (e: any) => {
    onChange(e.target.value, 'title');
  }

  const onSelectAsignedUser = (val: any) => {
    onChange(parseInt(val), 'user_asigned_id')
  }

  const onChangeComplete = (val: any) => {
    onChange(val.target.checked, 'completed');
  }
 
  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >

        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              New Task
            </Typography>
            
            <Typography className="-mb-2" variant="h6">
              Title
            </Typography>
            <Input label="" size="lg" onChange={onChangeTitle} />

            <Typography className="-mb-2" variant="h6">
              Assign user
            </Typography>

            <div className="w-100">
              <Select
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
                onChange={onSelectAsignedUser}
              >
                {
                  userList.map((user: any) => {
                    return (
                      <Option key={`${user.id}`} 
                              value={`${user.id}`} >{`${user.name} ${user.lastname}`}
                      </Option>
                    )
                  })
                }
              </Select>
            </div>
           
           
            <div className="-ml-2.5 -mt-3">
              <Checkbox label="Mark as complete" 
                onChange={onChangeComplete} 
                
                />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={onSaveTask} fullWidth>
              {
                loadingCreate ?  <Spinner /> : 'Save'
              }
            </Button>
            
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}