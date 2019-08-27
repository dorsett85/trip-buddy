import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Login from './Login';
import Register from './Register';

interface LandingModalContentProps {}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;
  return (
    <Typography component='div' role='tabpanel' hidden={value !== index}>
      <Box p={3}>{children}</Box>
    </Typography>
  );
};

const LandingModalContent: React.FC<LandingModalContentProps> = props => {
  const [value, setValue] = React.useState(0);

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h4' align='center' paragraph>Trip Buddy</Typography>
        <Typography align='center' paragraph>Plan your perfect trip</Typography>
        <AppBar position='static' color='default'>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
          >
            <Tab label='Login' />
            <Tab label='Register' />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Login />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Register />
        </TabPanel>
      </CardContent>
    </Card>
  );
};

export default LandingModalContent;
