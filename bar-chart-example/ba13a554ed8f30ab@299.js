export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["alphabet.csv",new URL("./files/09f63bb9ff086fef80717e2ea8c974f918a996d2bfa3d8773d3ae12753942c002d0dfab833d7bee1e0c9cd358cd3578c1cd0f9435595e76901508adc3964bbdc",import.meta.url)],["bookmorewomenSmall.csv",new URL("./files/65a8c619e85a9a80d43bdd82f6e7a58b8a42f2f0e5ad0f0186d52f7717e8552ee6657a07f603519fa34861fc0c509fe67b83dba99cdbecf37f8ba2639c0199c6",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Bar Chart`
)});
  main.variable(observer("chart")).define("chart", ["d3","width","height","color","data","x","y","xAxis","yAxis"], function(d3,width,height,color,data,x,y,xAxis,yAxis)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  svg.append("g")
      .attr("fill", color)
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.value))
      .attr("height", d => y(0) - y(d.value))
      .attr("width", x.bandwidth());

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`**Importing Data**`
)});
  main.variable(observer("data2")).define("data2", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("alphabet.csv").text(), ({letter, frequency}) => ({name: letter, value: +frequency})).sort((a, b) => d3.descending(a.value, b.value)), {format: "%", y: "↑ Frequency"})
)});
  main.variable(observer("data")).define("data", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
Object.assign(d3.csvParse(await FileAttachment("bookmorewomenSmall.csv").text()), {format: "%"})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**Setting the Axis Scale**`
)});
  main.variable(observer("x")).define("x", ["d3","data","margin","width"], function(d3,data,margin,width){return(
d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1)
)});
  main.variable(observer("y")).define("y", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear()
    .domain([0, 1]).nice()
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**Labeling the Axies**`
)});
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x","data"], function(height,margin,d3,x,data){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(i => data[i].name).tickSizeOuter(0))
)});
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y","data"], function(margin,d3,y,data){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, data.format))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(data.y))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`**Attributes of the chart**`
)});
  main.variable(observer("color")).define("color", function(){return(
"steelblue"
)});
  main.variable(observer("height")).define("height", function(){return(
500
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 30, right: 0, bottom: 30, left: 40}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
