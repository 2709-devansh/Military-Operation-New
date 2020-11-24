function spawnEnemies(){
    if(frameCount%120 === 0){
        var enemy = createSprite(1350, random(40, 150), 20, 20);
        enemy.addImage(enemyImg);
        enemy.scale = 0.6;
        createEnemyBullet(enemy.x, enemy.y);
        //enemy.shapeColor = "lightGrey";
        enemy.velocityX = -6;
        enemy.lifetime = 200;
        planeGroup.add(enemy);
    }
  }

  function createEnemyBullet(x, y){
   if(frameCount%10 == 0){   
    bullet2 = createSprite(100, 20, 15, 4);
    bullet2.velocityX = -15;
    bullet2.lifetime = 100;
    bullet2.x = x;
    bullet2.y = y;
    bulletSound.play();
    enemybulletGroup.add(bullet2);
   } 
  }