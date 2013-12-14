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

var findPath_DFS = function(graph, start, end, path){
	if (start.data == end.data)
		return path;

	var temp_path = [];
	if (path.length > 0){
		for (var i=0; i<path.length; i++)
			temp_path.push(path[i]);
	}

	temp_path.push(start);
	//printPath(temp_path);
	var possibleNodes = graph.childrenOf(start);
	for (var i=0; i<possibleNodes.length; i++){
		//printPath(temp_path);
		//console.log("node: "+possibleNodes[i].data);
		if (temp_path.indexOf(possibleNodes[i]) == -1){
			if (possibleNodes[i].data == end.data){
				temp_path.push(possibleNodes[i]);
				//console.log("finally");
				//printPath(temp_path);
				return temp_path;
			}else {
				var new_path = findPath_DFS(graph, possibleNodes[i], end, temp_path);
				if (new_path != undefined)
					return new_path;
				//return new_path;
			}
		}
	}
	//return new_path;
}

var findShortestPath_DFS = function(graph, start, end, shortest_path, path){
	if (start.data == end.data)
		return path;

	var temp_path = [];
	if (path.length > 0){
		for (var i=0; i<path.length; i++)
			temp_path.push(path[i]);
	}

	temp_path.push(start);
	//printPath(temp_path);
	var possibleNodes = graph.childrenOf(start);
	for (var i=0; i<possibleNodes.length; i++){
		//printPath(temp_path);
		//console.log("node: "+possibleNodes[i].data);
		if (temp_path.indexOf(possibleNodes[i]) == -1){
			if (possibleNodes[i].data == end.data){
				temp_path.push(possibleNodes[i]);
				//console.log("finally");
				//printPath(temp_path);
				return temp_path;
			}else {
				var new_path = findShortestPath_DFS(graph, possibleNodes[i], end, shortest_path, temp_path);
				if (new_path != undefined){
					printPath(new_path);
					if (shortest_path.length == 0){
						for(var i=0; i<new_path.length; i++){
							shortest_path.push(new_path[i]);
						}
					}else if(new_path.length < shortest_path.length){
						for (var i=0; i<shortest_path.length; i++)
							shortest_path[i] = new_path[i];

						shortest_path.splice(new_path.length, shortest_path.length-new_path.length);

					}

				}
					//return new_path;
				//return new_path;
			}
		}
	}
	//return new_path;
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

    var short_path = [];
    findShortestPath_DFS(g, nodes[0], nodes[5], short_path, []);

    console.log("output");

    printPath(short_path);

};

testPath();

