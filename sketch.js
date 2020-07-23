var training;

var learning_rate = 0.1;

var final0 = 0;
var final1 = 0;
var final2 = 0;
var final_linear0 = 0;
var final_linear1 = 0;
var final_linear2 = 0;

var counter = 0;
var counter_linear = 0;


function setup() {
  var canvas = createCanvas(600, 600);
  canvas.parent('#canvascontainer');
  canvas.mousePressed(addPoints);
  training = [];
}

function addPoints() {

  var theta0 = 0;
  var theta1 = 0;
  var theta2 = 0;
  var theta_linear0 = 0;
  var theta_linear1 = 0;

  // Add a data point
  training.push(createVector(mouseX / width, mouseY / height));
  console.log("point addded");

  var temp0 = 0;
  var temp1 = 0;
  var temp2 = 0;
  var temp_linear0 = 0;
  var temp_linear1 = 0;

  var temp_sum_theta0 = 0;
  var temp_sum_theta1 = 0;
  var temp_sum_theta2 = 0;
  var temp_sum_theta_linear0 = 0;
  var temp_sum_theta_linear1 = 0;

  var learning_rate = 0.2;

  untilConvergence(theta0, theta1, theta2, learning_rate, training);

  untilConvergence_linear(theta_linear0, theta_linear1, learning_rate, training);

  function untilConvergence_linear(theta_linear0, theta_linear1, learning_rate, training){
      var temp_linear0 = 0;
      var temp_linear1 = 0;
      var se_final_linear = 0;

      if (training.length<2) {
        return theta_linear0, theta_linear1;
      }

      else{
        var temp_sum_theta_linear0 = 0;
        var temp_sum_theta_linear1 = 0;
        var se_sum_linear = 0;
        for (var i = 0; i < training.length; i++) {
          var x = training[i].x;
          var y = training[i].y;
          temp_sum_theta_linear0 += (theta_linear0+theta_linear1*x - y);
          temp_sum_theta_linear1 += (theta_linear0+theta_linear1*x - y)*x;
          se_sum_linear += (theta_linear0+theta_linear1*x - y)*(theta_linear0+theta_linear1*x - y);
          document.getElementById("xi").innerHTML = x;
          document.getElementById("yi").innerHTML = y;
        }

        temp_linear0 = theta_linear0 - learning_rate/training.length*temp_sum_theta_linear0;
        temp_linear1 = theta_linear1 - learning_rate/training.length*temp_sum_theta_linear1;

        if (abs(temp_linear0-theta_linear0)<0.00001) {
          if (abs(temp_linear1-theta_linear1)<0.00001){
            theta_linear0=temp_linear0;
            theta_linear1=temp_linear1;
            se_final_linear = sqrt(se_sum_linear/training.length);
            document.getElementById("theta_linear0").innerHTML = (1-temp_linear0);
            document.getElementById("theta_linear1").innerHTML = (-temp_linear1);
            document.getElementById("reg_line").innerHTML = (1-temp_linear0)+"+"+(-temp_linear1)+"x";
            document.getElementById("se_l").innerHTML = se_final_linear;
            counter_linear +=1;
            final_linear0 = temp_linear0;
            final_linear1 = temp_linear1;
            //console.log("Standard error linear: "+se_final_linear);
          }

          else{
            theta_linear0 = temp_linear0;
            theta_linear1 = temp_linear1;
            untilConvergence_linear(theta_linear0, theta_linear1, learning_rate, training);
          }
        }

        else{
          theta_linear1 = temp_linear1;
          theta_linear0 = temp_linear0;
          untilConvergence_linear(theta_linear0, theta_linear1, learning_rate, training);
        }
      }
    }
  

  function untilConvergence(theta0, theta1, theta2, learning_rate, training){
    var temp0 = 0;
    var temp1 = 0;
    var temp2 = 0;

    if (training.length<2) {
      return theta0, theta1, theta2;
    }

    else{

      //console.log("taking theta0: "+theta0);
      //console.log("taking theta1: "+theta1);
      //console.log("taking theta2: "+theta2);

      var temp_sum_theta0 = 0;
      var temp_sum_theta1 = 0;
      var temp_sum_theta2 = 0;
      var se_sum = 0;
      for (var i = 0; i < training.length; i++) {
        var x = training[i].x;
        var y = training[i].y;
        temp_sum_theta0 += (theta0 + theta1*x + theta2*x*x - y);
        temp_sum_theta1 += (theta0 + theta1*x + theta2*x*x - y)*x;
        temp_sum_theta2 += (theta0 + theta1*x + theta2*x*x - y)*x*x;
        se_sum += (theta0 + theta1*x + theta2*x*x - y)*(theta0 + theta1*x + theta2*x*x - y);
        document.getElementById("xi").innerHTML = x;
        document.getElementById("yi").innerHTML = y;
      }

      temp0 = theta0 - learning_rate/training.length*temp_sum_theta0;
      temp1 = theta1 - learning_rate/training.length*temp_sum_theta1;
      temp2 = theta2 - learning_rate/training.length*temp_sum_theta2;

      if (abs(temp0-theta0)<0.0004) {
        if (abs(temp1-theta1)<0.0004){
          if (abs(temp2-theta2)<0.0004){
            theta0=temp0;
            theta1=temp1;
            theta2=temp2;
            counter +=1;
            final0 = temp0;
            final1 = temp1;
            final2 = temp2;
            se_final = sqrt(se_sum/training.length);
            document.getElementById("theta0").innerHTML = (final0);
            document.getElementById("theta1").innerHTML = (final1);
            document.getElementById("theta2").innerHTML = (final2);
            document.getElementById("reg_par").innerHTML = (final2+"x^2 + "+(final1)+"x"+" + "+(final0));
            document.getElementById("se_q").innerHTML = se_final;
          }

          else{
            theta0 = temp0;
            theta1 = temp1;
            theta2 = temp2;
            untilConvergence(theta0, theta1, theta2, learning_rate, training);
          }
        }


        else{
          theta0 = temp0;
          theta1 = temp1;
          theta2 = temp2;
          untilConvergence(theta0, theta1, theta2, learning_rate, training);
        }
      }

      else{
        theta1 = temp1;
        theta0 = temp0;
        theta2 = temp2;
        untilConvergence(theta0, theta1, theta2, learning_rate, training);
      }
    }
  }
}

function drawParabola(){
  var s1 = 1;
  stroke(0);
  fill(0);
  for (var i = 0; i < 1; i+=0.005) {
    ellipse(i * width, (final0+final1*i+final2*i*i) * height, 2, 2);
  }
}

function draw() {
  background(200);
  drawPoints();
  drawParabola();
  if (counter_linear>0) {
      line(0, final_linear0*height, 1*width, (final_linear0+final_linear1)*height);
  }

  //if (counter>0) {
      //line(0, final0*height, 1*width, (final0+final1)*height);
  //}
}    

function drawPoints() {
  stroke(0);
  fill(0);
  for (var i = 0; i < training.length; i++) {
    ellipse(training[i].x * width, training[i].y * height, 4, 4);
  }
}