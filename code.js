const padding = 1.1;

$.getJSON(
  "https://raw.githubusercontent.com/ajdivotf/covid-19-stats/main/files/data.json",
  function (data) {
    const dates = data.map((d) => d.date);
    const countes = data.map((d) => d.count);
    const width = countes.length * padding;
    const height = Math.max(...Object.values(countes));
    const div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", width + 10)
      .attr("height", height / 370 + 20);
    svg
      .selectAll("rect")
      .data(countes)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * padding)
      .attr("y", (d, i) => (height - d) / 370)
      .attr("width", 1)
      .attr("height", (d, i) => d / 370)
      .attr("fill", "#4E8098")
      .attr("class", "bar")
      .attr("transform", "translate(10, 9)")
      .on("mouseover", function () {})
      .on("mousemove", (d, i) => {
        div.transition().duration(200).style("opacity", 0.9);
        div
          .html(dates[countes.indexOf(i)] + "<br/>" + Math.round(i))
          .style("left", d.x - 85 + "px")
          .style("top", d.y - 80 + "px");
      })
      .on("mouseout", function () {
        div.transition().duration(500).style("opacity", 0);
      });
    let scale = d3
      .scaleLinear()
      .domain([height, 0])
      .range([0, height / 370]);
    let axis = d3.axisLeft(scale);
    svg.append("g").attr("transform", "translate(50, 9)").call(axis);
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -85)
      .attr("y", 70)
      .text("New cases")
      .attr("fill", "#a31621");
  }
);
