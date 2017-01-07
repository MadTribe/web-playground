var $ = require('jquery');
(function(){

  function Graph(ctx, minX, minY, maxX, maxY){
      this.minX = minX;
      this.minY = minY;
      this.maxX = maxX;
      this.maxY = maxY;
      this.graphWidth = maxX - minX;
      this.graphHeight = maxY - minY;
      this.ctx = ctx;
  };

  Graph.prototype.pointToContext = function( x, y){
      var ret = {
          x:0,
          y:0
      };



      if (x < this.minX || x > this.maxX || y < this.minY || y > this.maxY){
          return ret;
      }


      var cwidth = this.ctx.canvas.width;
      var cheight = this.ctx.canvas.height;

      var screenXunit = cwidth / this.graphWidth;
      var screenYunit = cheight / this.graphHeight;

      ret.x = (x - this.minX) * screenXunit;
      ret.y = (y - this.minY) * screenYunit;

      return ret;
  };

  Graph.prototype.clear = function( x, y){
    this.ctx.clearRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height);
  }


    Graph.prototype.plotDot = function(x, y){
          var point = this.pointToContext(x,y);
          this.ctx.fillRect (point.x, point.y, 2, 2);
   };


   function drawSin(graph, freqs, offset){

       var y =0;
       var inc = graph.graphWidth / (2 * graph.ctx.canvas.width);
       for (var x = graph.minX; x < graph.maxX; x+= inc){
           freqs.forEach(function(freq){
             y += Math.sin((freq * x + offset) * (2 * Math.PI));x
           })

           graph.plotDot(x,y);
           y = 0;
       }
   }

/////////////////////////////////////////////////////////////////
  function ChordDisplay(graphp){
      this.graph=graphp;
      this.freqs=[];
      this.clear = true;
  }


  ChordDisplay.prototype.animate = function () {



    var offset = 0;
    var self = this;
    var frame = function(){
        if (self.clear){
          self.graph.clear();
        }
        drawSin(self.graph, self.freqs, offset);
        offset += .01;
        window.requestAnimationFrame(frame);
    }

    frame();
  };




  function animateSin(graph, freqs, clear){

      var offset = 0;

      var frame = function(){
          if (clear){
            graph.clear();
          }
          drawSin(graph, freqs, offset);
          offset += .01;
          window.requestAnimationFrame(frame);
      }

      frame();
  }


  var chordDisplay = null;

  function drawCanvas(canvas){
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = "rgb(200,0,0)";
       var graph = new Graph(ctx, 0, -4, .09, 4);

    //  animateSin(graph, [220, 369.9944227116344, 293.6647679174076, 82.4068892282175], false);

      console.log(ctx);

      chordDisplay = new ChordDisplay(graph);

      chordDisplay.animate();
/*

E |   |   |   |
A |   |   |   |
D | D#| E | F |
G | G#| @A| A#|  440
B | C | C#|@D |  587.330
E | F |@F#| G |  737.989



*/




  };


  var notes = ['A','A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
  var strings = [7,12, 17, 22,26,31];


  function frequency(pianoKey){
      var n = pianoKey;
      return Math.pow(2, (n - 49)/12 ) * 440;
  }




  function drawGuitar(){

    var html = '<table class="frets">';

    var body = '';

    for (var string=0; string < 6 ; string++){
       body += '<tr>';

       for (var fret=0 ; fret < 10; fret++){
         var label = '-';
         var freq = 1;
         if (string < strings.length){
            var fret0 = strings[string];
            label = notes[(fret0 + fret)%notes.length];
            var equivPianoKey = fret0 + fret + 13;
            freq = frequency(equivPianoKey);
         }

         body += '<td class="fret" data-freq="' + freq + '">' + label + '</td>';


       }
       body += '</tr>';
    }
    body += '</tr>';

    html += body;

    html += '</table>';

    $('.guitar').html(html);
  }

  var elem = document.getElementsByClassName("note-graph")[0];

  drawCanvas(elem);
  drawGuitar();
  $('.fret').click(function(){
    if ($(this).hasClass('selected')){
        $(this).removeClass('selected')

        // Find and remove item from an array
        var i = chordDisplay.freqs.indexOf(Number(this.dataset.freq));
        if(i != -1) {
        	 chordDisplay.freqs.splice(i, 1);
        }

    } else {
      chordDisplay.freqs.push(Number(this.dataset.freq));
      $(this).addClass('selected');
    }


  })

  $('.add').click(function(){
    chordDisplay.clear = !chordDisplay.clear;

  });

})()
