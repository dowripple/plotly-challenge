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

    // console.log(filteredData)

    // pulling out the arrays we need using map
    // sample values
    var sample_values = filteredData.map(row => row.sample_values) //.splice(0, 10);

    // slice the first rows from the sample_values object (array at )
        // thankfully the data is sorted descending order
    sample_values = sample_values[0].slice(0,10);

    // otu_ids
    var otu_ids = filteredData.map(row => row.otu_ids);

    // grab the first 10
    otu_ids = otu_ids[0].slice(0,10);

    console.log(otu_ids);

    // otu_labels
    var otu_labels = filteredData.map(row => row.otu_labels);

    // grab the first 10
    otu_labels = otu_labels[0].slice(0,10);

   
    
    // // setup the trace
    var trace1 = {
        x: sample_values,
        y: otu_ids,
        type: 'bar',
        orientation: 'h',
        width: 500,
        text: otu_labels
    }

    var data = [trace1]

    var layout = {
      title: 'Top 10 Samples'  
    }

    Plotly.newPlot("bar", data, layout);

    // check values
    // console.log(sample_values);



});