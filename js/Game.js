class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    player1 = createSprite(100,200, 40, 100);
    player2 = createSprite(1800,200, 40, 100);
    ball = createSprite(900, 200, 50, 50);
    ball.shapeColor="red";
    ball.debug = true;
    players = [player1, player2];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      // background("brown");
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      // //x and y position of the cars
      var x = 100 ;
      var y;

      ball.bounceOff(player1);
      ball.bounceOff(player2);

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        // x = x + 1000;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        players[index-1].x;
        players[index-1].y = y;

        if (index === player.index){
          fill("red");
          // ellipse(x, y, 60 , 60);
          players[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y =players[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
      console.log(ball.position)
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance -=10
      player.update();
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      ball.velocity.x = 5;
      ball.velocity.y = 3;
    }

    if(player.distance > 3860){
      gameState = 2;
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}
