import Card from "@mui/material/Card";
// import CardActions from '@mui/material/CardActions'
import CardContent from "@mui/material/CardContent";
// import Button from '@mui/material/Button'
import Typography from "@mui/material/Typography";
import { TaskBasicInfo } from "../../slices/taskSlice";

interface TaskItemProps {
  task: TaskBasicInfo;
}

export default function TaskItem({ task }: TaskItemProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {task.id}
        </Typography>
        <Typography variant="h5" component="div">
          {task.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Task Priority TODO Add
        </Typography>
        <Typography variant="body2">
          Task Description TODO Add
          <br />
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
