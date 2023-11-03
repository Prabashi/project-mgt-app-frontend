import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DashboardTasksPanelByStatus from "./DashboardTasksPanelByStatus";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import { TaskBasicInfo } from "../../slices/taskSlice";
import { Status } from "../../constants";

type DashboardUserPanelProps = {
  assignee: { id: string; email: string };
  tasks: TaskBasicInfo[];
};

export default function ({ assignee, tasks }: DashboardUserPanelProps) {
  return (
    <Box
      sx={{
        // width: '100%',
        // backgroundColor: '#d5f5f0',
        p: 2,
        paddingLeft: 5,
        paddingRight: 5,
      }}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{assignee.email}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={12}>
            <Grid item xs={3}>
              <DashboardTasksPanelByStatus
                status={Status.ToDo}
                tasks={tasks.filter((task) => task.status === Status.ToDo)}
              />
            </Grid>
            <Grid item xs={3}>
              <DashboardTasksPanelByStatus
                status={Status.InProgress}
                tasks={tasks.filter(
                  (task) => task.status === Status.InProgress
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <DashboardTasksPanelByStatus
                status={Status.InQA}
                tasks={tasks.filter((task) => task.status === Status.InQA)}
              />
            </Grid>
            <Grid item xs={3}>
              <DashboardTasksPanelByStatus
                status={Status.Done}
                tasks={tasks.filter((task) => task.status === Status.Done)}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
