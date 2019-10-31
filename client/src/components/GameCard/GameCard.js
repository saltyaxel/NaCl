import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import saltImage from '../../assets/salt-shaker.jpg'

const useStyles = makeStyles({
  card: {
  },
  media: {
    height: 300,
  },
});

export default function GameCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={saltImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Game about NaCl (salt)
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Test your knowledge in what you know about sodium chloride or as we know it salt.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="large" color="primary">
          Play
        </Button>
      </CardActions>
    </Card>
  );
}