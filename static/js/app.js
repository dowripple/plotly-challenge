// global variable for test_id drop down
var selDataset = d3.select('#selDataset');

// using d3 to import the json file
d3.json('../../samples.json').then((importedData) => {

    var data = importedData;

    // get unique list of test ids
    var test_ids = data.names

    // loop through array, adding 1 option per row
    for (var i=0; i < test_ids.length; ++i) {
        
        // add an option to the select
        var option = selDataset.append('option').text(test_ids[i]);

    }

    // for now just get the value from the select box
    var test_id = selDataset.node().value;

    // filter the data object
    var filteredData = data.samples.filter(sample => sample.id === test_id )

    // pulling out the arrays we need using map
    // sample values
    var sample_values = filteredData.map(row => row.sample_values).splice(0, 10);
    // sample_values = sample_values.splice(0, 10);

    // sample_values.forEach(function(d) {
    //     d = parseInt(d);
    // });

    // otu_ids
    var otu_ids = filteredData.map(row => row.otu_ids);
    // otu_labels
    var otu_labels = filteredData.map(row => row.otu_labels);

    // console.log(otu_ids);

    console.log(sample_values);
    
    // // setup the trace
    var trace = {
        x: otu_ids,
        y: sample_values,
        type: 'bar',
        text: otu_labels
    }

    var data = [trace]

    var layout = {
      title: 'Top 10 Samples'  
    }

    // Plotly.newPlot("bar", data, layout);

    // check values
    // console.log(sample_values);



});