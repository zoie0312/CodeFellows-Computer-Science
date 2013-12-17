var Node = function(data){
	this.data = data;

};

var Edge = function(from, to, weight){
	this.source = from;
	this.dest = to;
	this.weight = weight;
};

var DiGraph = function(){
	this.nodes = []; //array of all nodes
	this.edges = []; //array of all edges
};

DiGraph.prototype.addNode = function(node){
	this.nodes.push(node);
};

DiGraph.prototype.addEdge = function(edge){
	this.edges.push({source: edge.source, dest: edge.dest, weight: edge.weight});
};

DiGraph.prototype.childrenOf = function(node){
	var childrenNodes = [];
	for (var i=0; i<this.edges.length; i++){
		if (this.edges[i].source.data == node.data)
			childrenNodes.push(this.edges[i].dest);
	}
	return childrenNodes;
};

DiGraph.prototype.edgeWeight = function(source, dest){
	var weight;
	for (var i=0; i<this.edges.length; i++){
		if (this.edges[i].source.data == source.data)
			if (this.edges[i].dest.data == dest.data)
				weight = this.edges[i].weight;
	}
	return weight;
};

// both source and target are nodes in graph
var findShortestPath_Dijkstra = function(graph, source, target){
	var dist = []; //array of shortest distance of each node from source
	var visited = []; //array of the fact that if a node has been visted
	var previous = []; //the previous node on the shortest path from source to a specific node

	for (var i=0; i<graph.nodes.length; i++){
		node = graph.nodes[i].data;
		visited[node] = false; //array of datas of all nodes
		dist[node] = 10000000; //array of datas of all nodes
		previous[node] = undefined;
	}
	dist[source.data] = 0;

	//array of nodes; store next possible visiting nodes
	//from those nodes which have been visited
	var queue = [];

	queue.push(source);
	while(queue.length > 0){
		// find out next node with shortest distance; "visit" it and remove it from queue
		var min_dist = dist[queue[0].data]; //minimum distance from all possible next steps
		var this_visited = queue[0];
		for (var i=0; i<queue.lenght; i++){
			if (dist[queue[i].data] < min_dist){
				min_dist = dist[queue[i].data];
				this_visited = queue[i];
			}

		}
		visited[this_visited.data] = true;
		var this_visit_idx = queue.indexOf(this_visited);
		queue.splice(this_visit_idx,1);

		//update dist, minimum distance of all visting nodes from source
		//put all new possible next nodes from this_visited into queue
		var visiting_nodes = graph.childrenOf(this_visited);
		for (var i=0; i<visiting_nodes.length; i++){
			var temp_dist = dist[this_visited.data] + graph.edgeWeight(this_visited, visiting_nodes[i]); //distance from this_visited to next visiting node
			if (visited[visiting_nodes[i].data] == false && queue.indexOf(visiting_nodes[i]) == -1)
				queue.push(visiting_nodes[i]);

			if (temp_dist < dist[visiting_nodes[i].data]){
				dist[visiting_nodes[i].data] = temp_dist;
				previous[visiting_nodes[i].data] = this_visited.data;
			}

		}

	}
	var shortest_path = [];
	var temp = previous[target.data];
	shortest_path.push(target.data);
	while(temp != undefined){
		shortest_path.push(temp);
		temp = previous[temp];
	}
	//shortest_path.push(source.data);
	shortest_path.reverse();
	console.log("shortest path from "+source.data+" to "+target.data+" =");
	console.log(shortest_path);

	//console.log(previous);

};

// a helper function to print out path
var printPath = function(path){
	console.log("[");
	var result = "";
	for (var i=0; i<path.length; i++){
		result = result + "->" + path[i].data;
	}
	console.log(result);
	console.log("]");
};

/***************test cases*****************/
var testPath = function(){ //create a graph for testing purpose
	var g = new DiGraph();
	var nodes = [];
	for (var i=0; i<8; i++){
		new_node = new Node(i);
		g.addNode(new_node);
		nodes.push(new_node);
	}

	g.edges.push(new Edge(nodes[0], nodes[1], 2));
	g.edges.push(new Edge(nodes[0], nodes[2], 5));
	g.edges.push(new Edge(nodes[0], nodes[3], 4));
	g.edges.push(new Edge(nodes[1], nodes[2], 2));
	g.edges.push(new Edge(nodes[2], nodes[3], 1));
	g.edges.push(new Edge(nodes[1], nodes[4], 7));
	g.edges.push(new Edge(nodes[1], nodes[6], 12));
	g.edges.push(new Edge(nodes[2], nodes[4], 4));
	g.edges.push(new Edge(nodes[2], nodes[5], 3));
	g.edges.push(new Edge(nodes[3], nodes[5], 4));
	g.edges.push(new Edge(nodes[5], nodes[4], 1));
	g.edges.push(new Edge(nodes[4], nodes[7], 5));
	g.edges.push(new Edge(nodes[5], nodes[7], 7));
	g.edges.push(new Edge(nodes[6], nodes[7], 3));

	console.log("output");
    findShortestPath_Dijkstra(g, nodes[0], nodes[7]);
    //printPath(short_path);

};

testPath();