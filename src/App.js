import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles"
import { Drawer, Container, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";

import Homeview from './components/Homeview';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Calendarview from './components/Calendarview';
import RunIcon from '@material-ui/icons/DirectionsRunSharp';
import TrainingIcon from '@material-ui/icons/FitnessCenterSharp';
import CalendarIcon from '@material-ui/icons/InsertInvitationSharp';
import HomeIcon from '@material-ui/icons/HomeSharp';

const useStyles = makeStyles(() => ({
  drawerPaper: { width: 'inherit'},
  link: {
    textDecoration: 'none',
    color: "grey"
  }
}))

function App() {

  const classes = useStyles();
  
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Drawer
              style={{ width: '215px'}}
              variant="persistent"
              anchor="left"
              open={true}
              classes={{ paper: classes.drawerPaper }}
            >
          <List>
            <Link to="/" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon/>
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
            </Link>
            <Link to="/customers" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <RunIcon />
                </ListItemIcon>
                <ListItemText primary={"Customers"} />
              </ListItem>
            </Link>
            <Link to="/trainings" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <TrainingIcon />
                </ListItemIcon>
                <ListItemText primary={"Trainings"} />
              </ListItem>
            </Link>
            <Link to="/calendar" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <CalendarIcon />
                </ListItemIcon>
                <ListItemText primary={"Calendar"} />
              </ListItem>
            </Link>
          </List>
        </Drawer>

        <Switch>
          <Route exact path="/" component={Homeview} >
            <Container>
                <Homeview />
            </Container>
          </Route>
          <Route path="/customers" component={Customerlist} >
            <Container>
                <Customerlist/>
            </Container>
          </Route>
          <Route path="/trainings" component={Traininglist} >
            <Container>
              <Traininglist/>
            </Container>
          </Route>
          <Route path="/calendar" component={Calendarview} >
            <Container>
              <Calendarview/>
            </Container>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
