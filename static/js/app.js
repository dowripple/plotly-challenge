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


    //selDataset.on('change', optionChanged())
    // for now just get the value from the select box
    var test_id = selDataset.node().value;
     
    // initialize based on the current value in drop down
    optionChanged(test_id);

});

// function that will refresh each component based on the drop down value
function optionChanged(test_id) {

    d3.json('../../samples.json').then((importedData) => {

        var data = importedData;

        // filter the data objects
        // sample info first
        var filteredSampleData = data.samples.filter(sample => sample.id === test_id );

        // doing the demographic data here, to be used later (for some reason i had to parseint)
        var filteredMetaData = data.metadata.filter(meta => parseInt(meta.id) === parseInt(test_id) );

        // pulling out the arrays we need using map
        // sample values
        var sample_values = filteredSampleData.map(row => row.sample_values);

        // slice the first rows from the sample_values object (array at )
            // thankfully the data is sorted descending order
        sample_values = sample_values[0].slice(0,10).reverse();

        // otu_ids
        var otu_ids = filteredSampleData.map(row => row.otu_ids);

        // grab the first 10
        otu_ids = otu_ids[0].slice(0,10).reverse();

        // aapend the text to the beginning of the id, but in a new array
        var otu_id_labels = [];
        for (i = 0; i < otu_ids.length; i++) {

            otu_id_labels.push('OTU '.concat(otu_ids[i]));

        }

        // otu_labels
        var otu_labels = filteredSampleData.map(row => row.otu_labels);

        // grab the first 10
        otu_labels = otu_labels[0].slice(0,10).reverse();

        // // setup the trace
        var trace1 = {
            x: sample_values,
            y: otu_id_labels,
            type: 'bar',
            orientation: 'h',
            // width: 500,
            text: otu_labels
        }

        // data for bar chart
        var data = [trace1]

        // layout
        var layout = {
            title: 'Top 10 Samples'  
        }

        // plot chart
        Plotly.newPlot("bar", data, layout);

        // bubble chartm (we already have the series)
        var traceB = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids
            },
            text: otu_labels

        }

        var data = [traceB];

        var layout = {
            title: 'Bubble Stuff'
        }

        // plot bubble chart on bubble div
        Plotly.newPlot('bubble',data,layout)

        // demographis data
        var panelDiv = d3.select('#sample-metadata');

        // add a new div
        var demoTable = panelDiv.append('table').classed('table table-striped', true);

        // var demoTbody = demoTable.append('tbody')
        var row = demoTable.append('tr').html(`<td>id:</td><td>${filteredMetaData[0].id}</td>`);       
        var row = demoTable.append('tr').html(`<td>ethnicity:</td><td>${filteredMetaData[0].ethnicity}</td>`);
        var row = demoTable.append('tr').html(`<td>gender:</td><td>${filteredMetaData[0].gender}</td>`);    
        var row = demoTable.append('tr').html(`<td>age:</td><td>${filteredMetaData[0].age}</td>`);    
        var row = demoTable.append('tr').html(`<td>location:</td><td>${filteredMetaData[0].location}</td>`);
        var row = demoTable.append('tr').html(`<td>bbtype:</td><td>${filteredMetaData[0].bbtype}</td>`);     
        var row = demoTable.append('tr').html(`<td>wfreq:</td><td>${filteredMetaData[0].wfreq}</td>`);

        //come back and use d3 for CSV

        // open the other json file (meta.json)
        d3.json('../../meta.json').then((importedData) => {

            var data2 = importedData;

            console.log(test_id);
            
            // consozle.log(typeof(test_id))
        
            var test_index = Object.entries(data2.ID).forEach(([key, value]) => {

                // console.log(value)
                if (value === test_id) {

                    return key;
                    // console.log(key)

                }

            })
            

            // console.log(test_index);

            // var meta_ids = data2.ID.map(meta =>  meta);

            // console.log(meta_ids);

            // // find the index of the value we need, based on ID
            // var test_index = data2.ID.map(function(d,i) {

            //     if (d === test_id) {
            //         return i
            //     };

            // });

            // console.log.apply(test_index)

            // filter 2nd data set for the same test_id
            // var filteredData2 = data2.filter(meta => meta.id === test_id );

            // console.log(filteredData2);


        })
    })
}


