import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    height: "25vh",
  },
  textDiv: {
    alignItems: 'center',
    display: 'flex',
    height: '100%'
  }
});

export default function AnswerCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.textDiv} onClick={props.postAnswer}>
          <Typography className={classes.text} variant="h4">
            {props.option}
          </Typography>
      </CardActionArea>
    </Card>
  );
}