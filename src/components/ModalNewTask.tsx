import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Select,
  Option,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getListUserAction } from "../redux/actions/userActions";
 
export function ModalNewTask({
  open,
  handleOpen
}) {
  // const [open, setOpen] = React.useState(false);
  const dispatch: any = useDispatch();

  const { userList = [] } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getListUserAction());
  }, dispatch)
 
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
              Nueva tarea
            </Typography>
            
            <Typography className="-mb-2" variant="h6">
              Title
            </Typography>
            <Input label="" size="lg" />

            <Typography className="-mb-2" variant="h6">
              Assign user
            </Typography>

            <div className="w-100">
              <Select
                // label="Asignar"
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
                onChange={(val) => console.log(val)}
              >
                {
                  userList.map((user: any) => {
                    return (
                      <Option value={user.id} >{`${user.name} ${user.lastname}`}</Option>
                    )
                  })
                }
              </Select>
            </div>
           
           
            <div className="-ml-2.5 -mt-3">
              <Checkbox label="Mark as complete" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleOpen} fullWidth>
              Guardar
            </Button>
            
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}