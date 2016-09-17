var x, y, xold, yold, xdiff, ydiff;

document.onmousemove = direction;

function direction(loc) {
	x = event.clientX;
	y = event.clientY;
	console.log('x '+x);
	/*先做差值再赋值*/
	xdiff = x - xold;
	ydiff = y - yold
	console.log('xd '+xdiff);
	
	xold = x;
	yold = y;
	console.log('ox '+xold);
}