var Node = function(data){
	this.data = data;

};

var Edge = function(source, destination){
	this.source = source;
	this.destination = destination;
};

var DiGraph = function(){
	this.nodes = []; //array of all nodes
	this.edges = []; //array of all edges
};

DiGraph.prototype.addNode = function(node){
	this.nodes.push(node);
};

DiGraph.prototype.addEdge = function(edge){
	this.edges.push({source: edge.source, destination: edge.destination});
};

DiGraph.prototype.childrenOf = function(node){
	var childrenNodes = [];
	for (var i=0; i<this.edges.length; i++){
		if (this.edges[i].source.data == node.data)
			childrenNodes.push(this.edges[i].destination);
	}
	return childrenNodes;
}

var findShortestPath_Dijkstra = function(graph, source, target){
	var dist = [];
	var visited = [];
	var previous = [];

	for (var i=0; i<graph.nodes.length; i++){
		node = graph.nodes[i].data;
		visited[node] = false; //array of datas of all nodes
		dist[node] = undefined; //array of datas of all nodes
		previous[node] = undefined;
	}
	dist[source.data] = 0;

	var queue = []; //array of nodes; store next possible visiting nodes
	queue.push(source);
	while(queue.length > 0){
		var min_dist = dist[queue[0].data];
		var next_visited = queue[0];
		for (var i=0; i<queue.lenght; i++){
			if (dist[queue[i].data] < min_dist){
				min_dist = dist[queue[i].data];
				next_visited = queue[i];
			}

		}
		visited[next_visited.data] = true;
		var next_visit_idx = queue.indexOf(next_visited);
		queue.splice(next_visit_idx,1);

		var visiting_nodes = graph.childrenOf(next_visited);
		for (var i=0; i<visiting_nodes.length; i++){
			var alt = dist[next_visited.data] + 1;
			if (dist[visiting_nodes[i].data] == undefined){
				dist[visiting_nodes[i].data] = alt;
				previous[visiting_nodes[i].data] = next_visited.data;
				if (visited[visiting_nodes[i].data] == false)
					queue.push(visiting_nodes[i]);
			}

			if (alt < dist[visiting_nodes[i].data]){
				dist[visiting_nodes[i].data] = alt;
				previous[visiting_nodes[i].data] = next_visited.data;
				if (visited[visiting_nodes[i].data] == false)
					queue.push(visiting_nodes[i]);

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

var printPath = function(path){
	console.log("[");
	var result = "";
	for (var i=0; i<path.length; i++){
		result = result + "->" + path[i].data;
	}
	console.log(result);
	console.log("]");
};

var testPath = function(){ //creating a graph for testing purpose
	var g = new DiGraph();
	var nodes = [];
	for (var i=0; i<6; i++){
		new_node = new Node(i);
		g.addNode(new_node);
		nodes.push(new_node);
	}

	g.addEdge(new Edge(nodes[0],nodes[1]));
	g.addEdge(new Edge(nodes[1],nodes[2]));
	g.addEdge(new Edge(nodes[2],nodes[3]));
	g.addEdge(new Edge(nodes[2],nodes[4]));
	g.addEdge(new Edge(nodes[3],nodes[4]));
	g.addEdge(new Edge(nodes[3],nodes[5]));
	g.addEdge(new Edge(nodes[0],nodes[2]));
	g.addEdge(new Edge(nodes[1],nodes[0]));
	g.addEdge(new Edge(nodes[3],nodes[1]));
	g.addEdge(new Edge(nodes[4],nodes[0]));
	g.addEdge(new Edge(nodes[1],nodes[5]));

	//console.log(g.edges[1]);
    //var path = findPath_DFS(g, nodes[0], nodes[5], []);

    //var short_path = [];
    //findShortestPath_DFS(g, nodes[0], nodes[5], short_path, []);

    console.log("output");
    findShortestPath_Dijkstra(g, nodes[0], nodes[5]);
    //printPath(short_path);

};

testPath();