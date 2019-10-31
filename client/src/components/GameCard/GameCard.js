import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import SaltImage from '../../assets/salt-shaker.jpg'
import TupacImage from '../../assets/2pac.jpg'
import MMAImage from '../../assets/mma.jpg'
import ReactImage from '../../assets/react.png'

const useStyles = makeStyles({
  card: {
  },
  media: {
    height: "25vh",
  },
});

export default function GameCard(props) {
  const classes = useStyles();

  let image = SaltImage
  if(props.image === "MMA") {
    image = MMAImage
  }
  if(props.image === "2Pac") {
    image = TupacImage
  }
  if(props.image === "React") {
    image = ReactImage
  }

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={props.startGame}>
        <CardMedia
          className={classes.media}
          image={image}
          title={props.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.header}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}