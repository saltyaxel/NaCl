import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
const classNames = require('classnames');

const useStyles = makeStyles({
  card: {
    height: "25vh",
  },
  textDiv: {
    alignItems: 'center',
    display: 'flex',
    height: '100%'
  },
  text: {
    wordWrap: "anywhere",
    margin: "0.5rem"
  },
  orange: {
    backgroundColor: 'rgba(242, 80, 34, 0.5)'
  },
  green: {
    backgroundColor: "rgba(127, 186, 0, 0.5)"
  },
  blue: {
    backgroundColor: "rgba(0, 164, 239, 0.5)"
  },
  yellow: {
    backgroundColor: "rgba(255, 185, 0, 0.5)"
  }
});

export default function AnswerCard(props) {
  const classes = useStyles();

  return (
    <Card className={classNames(classes.card, classes[props.color])}>
      <CardActionArea className={classes.textDiv} onClick={props.postAnswer}>
          <Typography className={classes.text} variant="h4">
            {props.option}
          </Typography>
      </CardActionArea>
    </Card>
  );
}