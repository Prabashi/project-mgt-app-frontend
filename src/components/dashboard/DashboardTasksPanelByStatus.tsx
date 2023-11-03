import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TaskItem from "./TaskItem";
import { Typography } from "@mui/material";
import { TaskBasicInfo } from "../../slices/taskSlice";

type DashboardTasksPanelByStatusProps = {
  status: string;
  tasks: TaskBasicInfo[];
};

export default function DashboardTasksPanelByStatus({
  status,
  tasks,
}: DashboardTasksPanelByStatusProps) {
  return (
    <Box
      sx={{
        // width: '100%',
        backgroundColor: "#d5f5f0",
        p: 2,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6">{status}</Typography>
      <Stack spacing={3}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </Stack>
    </Box>
  );
}
