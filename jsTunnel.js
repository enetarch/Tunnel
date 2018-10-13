/*    ======================================= 
    Copyright 1998 - 2019 - E Net Arch 
    This program is distributed under the terms of the GNU  
    General Public License (or the Lesser GPL). 
    ======================================= */ 

var map = [];
var mapWidth = 30;
var mapHeight = 30;
var cellWidth = 22;
var cellHeight = 22;
var tunnelWidth = 100;
var tunnelHeight = 200;
var canvas = null;
var tunnel = null;
var plyrX = 0;
var plyrY = 0;
var plyrDir = 2;

function create_map ()
{ 
	// map = new Array (100, 100);
	
	for (x = 0; x< mapWidth; x++)
		map [x] = [];
		
	for (y = 0; y< mapHeight; y++)
		for (x = 0; x< mapWidth; x++)
		{
			var df1 = Math.floor (Math.random() * 2);
			var dr2 = Math.floor (Math.random() * 2);
			var db3 = Math.floor (Math.random() * 2);
			var dl4 = Math.floor (Math.random() * 2);
			
			map [x][y] = "" + df1 + dr2 + db3 + dl4;
		}
}

function create_paths2 ()
{
	for (var t=0; t<10; t++)
	{
		var x1 = Math.floor (Math.random() * mapWidth);
		var y1 = Math.floor (Math.random() * mapHeight);

		var w = Math.floor (Math.random() * mapWidth);
		draw_path (x1,y1, x1+w, y1);

		var x2 = Math.floor (Math.random() * mapWidth);
		var y2 = Math.floor (Math.random() * mapHeight);

		var h = Math.floor (Math.random() * mapHeight);
		draw_path (x2,y2, x2, y2+h);
	}
}

function swap_coordinates (x1,y1, x2,y2)
{
	var coords = {};

	coords.x1 = Math.min (x1, x2);
	coords.x2 = Math.max (x1, x2);
	
	coords.y1 = Math.min (y1, y2);
	coords.y2 = Math.max (y1, y2);

	return (coords);
}

function create_paths ()
{
	var szDir = ["-y", "+x", "+y", "-x"]

	var t=0; 
		
	var x1 = Math.floor(Math.random() * mapWidth);
	var y1 = Math.floor(Math.random() * mapHeight);
	var n = 0;

	plyrX = x1;
	plyrY = y1;
	
	do 
	{
		var x2 = x1;
		var y2 = y1;

		var dir = Math.floor(Math.random() * 4);
		var maxm = Math.floor(Math.random() * mapWidth);

		// console.log ("[ " + t + " ] Point - (x1, y1) - [d, w] = " + 
		// 	t + " (" + x1 + ", " + y1 + ") - [" + szDir [dir] + ", " + maxm + "] ");
		
		switch (dir)
		{
			case 0 : y2 = Math.max (y1 - maxm, 0); maxm = Math.abs (y2 - y1); break;
			case 1 : x2 = Math.min (x1 + maxm, mapWidth); maxm = Math.abs (x2 - x1); break;
			case 2 : y2 = Math.min (y1 + maxm, mapHeight); maxm = Math.abs (y2 - y1); break;
			case 3 : x2 = Math.max (x1 - maxm, 0); maxm = Math.abs (x2 - x1); break;
		}
		
		var coords = swap_coordinates (x1,y1, x2,y2);
		x1 = coords.x1;
		x2 = coords.x2;
		y1 = coords.y1;
		y2 = coords.y2;

		draw_path (x1,y1, x2,y2);

		var n = Math.floor (Math.random() * maxm);
		// console.log ("n = " + n);
		
		switch (dir)
		{
			case 0 : y1 = y1 + n; break;
			case 1 : x1 = x1 + n; break;
			case 2 : y1 = y1 + n; break;
			case 3 : x1 = x1 + n; break;
		}

		t++;
	} while (t<30);
		
}

function draw_path (x1,y1, x2,y2)
{
	// console.log ("Path - (x1, y1) - (x2, y2) = [" + x1 + ", " + y1 + "] - [" + x2 + ", " + y2 + "]");

	if (
		((x2 - x1) == 0) &&
		((y2 - y1) == 0) 
		)
	return;
	
	if (
		((x2 - x1) != 0) &&
		((y2 - y1) != 0) 
		)
	return;

	var mx1 = (x1*cellWidth)-1; 
	var my1 = (y1*cellHeight)-1; 
	var mx2 = ((x2-x1+1)*cellWidth)+1; 
	var my2 = ((y2-y1+1)*cellHeight)+1;

	var ctx = canvas.getContext("2d");
	// ctx.fillStyle = "#FF0000";
	// ctx.fillRect (mx1, my1, mx2, my2);
	// console.log ("Block (x1, y1) - (x2, y2) = [" + mx1 + ", " + my1 + "] - [" + mx2 + ", " + my2 + "]");

	var maxm =  (x2 - x1) + (y2 - y1);
	var dir = ((x2 - x1) != 0);
	
	
	for (var t=0; t< maxm; t++)
	{
		if (dir)
		{
			var x = x1 +t;
			var y = y1;
			if (x >= mapWidth)
				return;
		}
		else
		{
			var x = x1;
			var y = y1 +t;
			if (y >= mapHeight)
				return;
		}

		var name = map [x][y];
		
		var pic = [];
		pic [0] = name [0];
		pic [1] = name [1];
		pic [2] = name [2];
		pic [3] = name [3];

		if (dir)
		{
			pic[1] = 1;
			pic[3] = 1;
		}
		else
		{
			pic[0] = 1;
			pic[2] = 1;
		}
		
		name = "" + pic [0] + pic [1] + pic [2] + pic [3];
		map [x][y] = name;
	}
}

function plant_treasures ()
{
}

function plant_bombs ()
{
}


// =====================================================================

function draw_map ()
{
	var ctx = canvas.getContext("2d");
	for (y = 0; y< mapHeight; y++)
		for (x = 0; x< mapWidth; x++)
		{			
			var name = map [x][y];
			// console.log ("name = " + name);
			var img = $("#hall" + name)[0];
			// ctx.scale(2,2);
			ctx.drawImage (img, x*cellWidth, y*cellHeight, cellWidth-2, cellHeight-2);
		}
}

function reset_map ()
{
	var name = map [plyrX][plyrY];
	// console.log ("name = " + name);
	var img = $("#hall" + name)[0];
	var ctx = canvas.getContext("2d");
	ctx.drawImage (img, plyrX*cellWidth, plyrY*cellHeight, cellWidth-2, cellHeight-2);
}

function update_map ()
{
	var x = plyrX * cellWidth ;
	var y = plyrY * cellHeight ;

	var cx = x + Math.floor (cellWidth / 2);
	var cy = 7 + Math.floor (cellHeight / 2);
	
	// change this to a triangle .. so that you can see what direction
	// you're moving
	
	
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "#00DDDD";
	ctx.beginPath();
	// ctx.arc (cx,cy, 5, 0,2*Math.PI);

	switch (plyrDir)
	{
		case 0 : // up
		{ 
			ctx.moveTo (x+(5 * cellWidth / 10), y+(2 * cellHeight / 10)); 
			ctx.lineTo (x+(8 * cellWidth / 10), y+(8 * cellHeight / 10));
			ctx.lineTo (x+(2 * cellWidth / 10), y+(8 * cellHeight / 10));
			ctx.lineTo (x+(5 * cellWidth / 10), y+(2 * cellHeight / 10));
		} break;
		
		case 1 : // left
		{ 
			ctx.moveTo (x+(2 * cellWidth / 10), y+(2 * cellHeight / 10)); 
			ctx.lineTo (x+(8 * cellWidth / 10), y+(5 * cellHeight / 10));
			ctx.lineTo (x+(2 * cellWidth / 10), y+(8 * cellHeight / 10));
			ctx.lineTo (x+(2 * cellWidth / 10), y+(2 * cellHeight / 10));
		} break;

		case 2 : // down
		{ 
			ctx.moveTo (x+(2 * cellWidth / 10), y+(2 * cellHeight / 10)); 
			ctx.lineTo (x+(8 * cellWidth / 10), y+(2 * cellHeight / 10));
			ctx.lineTo (x+(5 * cellWidth / 10), y+(8 * cellHeight / 10));
			ctx.lineTo (x+(2 * cellWidth / 10), y+(2 * cellHeight / 10));
		} break;

		case 3 : // right
		{ 
			ctx.moveTo (x+(8 * cellWidth / 10), y+(2 * cellHeight / 10)); 
			ctx.lineTo (x+(8 * cellWidth / 10), y+(8 * cellHeight / 10));
			ctx.lineTo (x+(2 * cellWidth / 10), y+(5 * cellHeight / 10));
			ctx.lineTo (x+(8 * cellWidth / 10), y+(2 * cellHeight / 10));
		} break;
	}

	ctx.stroke ();	
	ctx.fill();	
}


function draw_map2 ()
{
	var ctx = canvas.getContext("2d");

	ctx.lineWidth = 1;
	
	for (y = 0; y< 100; y++)
	{
		ctx.moveTo (0, y*cellHeight);
		ctx.lineTo (mapWidth*cellWidth, y*cellHeight);
		ctx.stroke ();	
	}
	
	for (x = 0; x< 100; x++)
	{
		ctx.moveTo (x*cellWidth,0);
		ctx.lineTo (x*cellWidth, mapWidth*cellHeight);
		ctx.stroke ();	
	}
}

// =====================================================================

function draw_tunnel ()
{
	var name = map [plyrX] [plyrY];
	var name2 = "0000";
	
	switch (plyrDir)
	{
		case 0 : // up
			if (plyrY != 0)
				name2 = map [plyrX] [plyrY-1];
			break;
			
		case 1 : // right
			if (plyrX != mapWidth -1)
				name2 = map [plyrX+1] [plyrY];
			break;

		case 2 : // down
			if (plyrY != mapHeight -1)
				name2 = map [plyrX] [plyrY+1];
			break;

		case 3 : // left
			if (plyrX != 0)
				name2 = map [plyrX-1] [plyrY];
			break;
	}
	
	var ctx = tunnel.getContext("2d");
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect (000, 000, tunnelWidth, tunnelHeight);

	draw_hall();

	var f = ((plyrDir + 0) % 4)
	var r = ((plyrDir + 1) % 4)
	var b = ((plyrDir + 2) % 4)
	var l = ((plyrDir + 3) % 4)
	
	if ((name[f] == 1) && (name2[b] == 1)) 
	{ draw_forward (); }
	else
	{ draw_blocked (); }
	
	if (name[r] == 1) draw_right ();
	if (name[b] == 1) draw_backward ();
	if (name[l] == 1) draw_left ();
}

function draw_hall ()
{
	var ctx = tunnel.getContext("2d");
	
	ctx.lineWidth = 1;	
	ctx.strokeStyle = "#000000";

	ctx.beginPath();
	ctx.rect (25, 50, 50, 100);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.moveTo (0, 0);
	ctx.lineTo (25, 50);
	ctx.stroke ();	
	
	ctx.beginPath();
	ctx.moveTo (100, 0);
	ctx.lineTo (75, 50);
	ctx.stroke ();	

	ctx.beginPath();
	ctx.moveTo (0, 200);
	ctx.lineTo (25, 150);
	ctx.stroke ();	

	ctx.beginPath();
	ctx.moveTo (100, 200);
	ctx.lineTo (75, 150);
	ctx.stroke ();	
}


function draw_blocked ()
{
	var ctx = tunnel.getContext("2d");
	ctx.fillStyle = "#000000";
	ctx.fillRect (25, 50, 50, 100);
}

function draw_forward ()
{
	var ctx = tunnel.getContext("2d");
	// ctx.fillStyle = "#AAAAAA";
	// ctx.fillRect (25, 50, 50, 100);
}

function draw_left ()
{
	var ctx = tunnel.getContext("2d");
	ctx.fillStyle = "#FF0000";
	// ctx.fillRect (0, 0, 150, 75);

	ctx.lineWidth = 1;	
	ctx.strokeStyle = "#000000";

	ctx.beginPath();
	ctx.moveTo (8, 13);
	ctx.lineTo (8, 187);
	ctx.stroke ();	

	ctx.beginPath();
	ctx.moveTo (8, 37);
	ctx.lineTo (17, 37);
	ctx.lineTo (17, 163);
	ctx.lineTo (8, 163);
	ctx.stroke ();	
}

function draw_right ()
{
	var ctx = tunnel.getContext("2d");
	ctx.fillStyle = "#FF0000";
	// ctx.fillRect (0, 0, 150, 75);

	ctx.lineWidth = 1;	
	ctx.strokeStyle = "#000000";

	ctx.beginPath();
	ctx.moveTo (93, 13);
	ctx.lineTo (92, 187);
	ctx.stroke ();	

	ctx.beginPath();
	ctx.moveTo (92, 37);
	ctx.lineTo (83, 37);
	ctx.lineTo (83, 163);
	ctx.lineTo (92, 163);
	ctx.stroke ();	
}

function draw_backward () {}

// =====================================================================

function valid_move (dir)
{
	var name = map [plyrX][plyrY];
	var name2 = "";

	switch ((plyrDir + dir) % 4)
	{
		case 0 : // up
			if (plyrY == 0)
				return (false);
			
			name2 = map [plyrX][plyrY-1];
			break;

		case 1 : // right
			if (plyrX == mapWidth -1)
				return (false);

			name2 = map [plyrX+1][plyrY];
			break;

		case 2 : // down
			if (plyrY == mapHeight -1)
				return (false);

			name2 = map [plyrX][plyrY+1];
			break;

		case 3 : // left
			if (plyrX == 0)
				return (false);

			name2 = map [plyrX-1][plyrY];
			break;
	}
	
	var f = ((plyrDir + 0) % 4)
	// var r = ((plyrDir + 1) % 4)
	var b = ((plyrDir + 2) % 4)
	// var l = ((plyrDir + 3) % 4)
	
	switch (dir)
	{ 
		case 0 : // forward
			return ((name[f] == 1) && (name2[b] == 1)); 
			break;
		
		case 2 : // backward
			return ((name[b] == 1) && (name2[f] == 1)); 
			break;
	}
}

function move (event)
{
	// abstract all the calculations for the move
	// test that the move is valid
	// save the calculations 
	
	event.stopPropagation();
	event.preventDefault();
	
	reset_map();
	
	var pX = plyrX;
	var pY = plyrY;
	var dir = 0;
	
	switch (event.keyCode)
	{
		case 37 : plyrDir --; break; // left
		case 39 : plyrDir ++; break; // right

		case 38 : // up
			dir = 0;
			switch (plyrDir)
			{ 
				case 0 : pY --; break; 
				case 1 : pX ++; break; 
				case 2 : pY ++; break; 
				case 3 : pX --; break; 
			} break;

		case 40 : // down
			dir = 2
			switch (plyrDir)
			{ 
				case 0 : pY ++; break; 
				case 1 : pX --; break; 
				case 2 : pY --; break; 
				case 3 : pX ++; break; 
			} break;
	}
	
	plyrDir = (4 + plyrDir) % 4;
	pX = Math.max (0, Math.min (pX, mapWidth-1));
	pY = Math.max (0, Math.min (pY, mapHeight-1));
	
	var tf = valid_move (dir);
	plyrX = (tf) ? pX : plyrX;
	plyrY = (tf) ? pY : plyrY;
	
	draw_tunnel ();
	update_map ();
	var name = map [plyrX][plyrY];
	$("#coords").html ("[" + plyrX + ", " + plyrY + "] " + name + " " + plyrDir);
}

function init ()
{
	canvas = $("#map #myMap")[0];
	canvas.width  = mapWidth * cellWidth;
	canvas.height = mapHeight * cellHeight;
	
	create_map();
	// draw_map2 ();
	create_paths();
	console.log (map);
	draw_map ();

	tunnel = $("#tunnel #myTunnel")[0];
	tunnel.width  = tunnelWidth;
	tunnel.height = tunnelHeight;
	
	draw_tunnel ();
	update_map ();
	var name = map [plyrX][plyrY];
	$("#coords").html ("[" + plyrX + ", " + plyrY + "] " + name);
	$(window).keydown (move)

}

$().ready (function ()
{
	init();
});	
