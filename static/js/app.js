// global variable for test_id drop down
var selDataset = d3.select('#selDataset');

// using d3 to import the json file

// THIS VERSION OF THE JSON CALL IS FOR 'GO-LIVE'
// d3.json('/samples.json').then((importedData) => {

// pulls from the json file in my github repo
d3.json('https://dowripple.github.io/plotly-challenge/samples.json').then((importedData) => {

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

    d3.json('https://dowripple.github.io/plotly-challenge/samples.json').then((importedData) => {

        var data = importedData;

        // filter the data objects
        // sample info first
        var filteredSampleData = data.samples.filter(sample => sample.id === test_id );

        // doing the demographic data here, to be used later (for some reason i had to parseint)
        var filteredMetaData = data.metadata.filter(meta => parseInt(meta.id) === parseInt(test_id) );

        // pulling out the arrays we need using map
        // sample values
        var sample_values = filteredSampleData.map(row => row.sample_values);

        // get the array, not the object
        sample_values = sample_values[0];

        // slice the first rows from the sample_values object (array at )
            // thankfully the data is sorted descending order
        var top_sample_values = sample_values.slice(0,10).reverse();

        // otu_ids
        var otu_ids = filteredSampleData.map(row => row.otu_ids);
        otu_ids = otu_ids[0];

        // grab the first 10
        var top_otu_ids = otu_ids.slice(0,10).reverse();

        // aapend the text to the beginning of the id, but in a new array
        var top_otu_id_labels = [];
        for (i = 0; i < top_otu_ids.length; i++) {

            top_otu_id_labels.push('OTU '.concat(top_otu_ids[i]));

        }

        // otu_labels
        var otu_labels = filteredSampleData.map(row => row.otu_labels);
        otu_labels = otu_labels[0];

        // grab the first 10       
        var top_otu_labels = otu_labels.slice(0,10).reverse();

        // // setup the trace
        var trace1 = {
            x: top_sample_values,
            y: top_otu_id_labels,
            type: 'bar',
            orientation: 'h',
            // width: 500,
            text: top_otu_labels
        }

        // data for bar chart
        var data = [trace1]

        // layout
        var layout = {
            title: 'Top Samples'  
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
            title: 'All Samples'
        }

        // plot bubble chart on bubble div
        Plotly.newPlot('bubble',data,layout)

        // demographis data
        var panelDiv = d3.select('#sample-metadata');

        // clear the html first
        panelDiv.html('');

        // checking out the object
        // console.log(filteredMetaData);

        // Add the demographics one at a time, each one within a bootstrap row, with 4 columns on the label side, 8 on the value
        // ID
        var row = panelDiv.append('div')
            .classed('row', true)
            .html(`<div class="col-md-4">id: </div><div class="col-md-8">${filteredMetaData[0].id}</div>`);

        // ethnicity
        var row = panelDiv.append('div')
            .classed('row', true)
            .html(`<div class="col-md-4">ethnicity: </div><div class="col-md-8">${filteredMetaData[0].ethnicity}</div>`);

        // gender
        var row = panelDiv.append('div')
            .classed('row', true)            
            .html(`<div class="col-md-4">gender: </div><div class="col-md-8">${filteredMetaData[0].gender}</div>`);

        // age
        var row = panelDiv.append('div')
            .classed('row', true)            
            .html(`<div class="col-md-4">age: </div><div class="col-md-8">${filteredMetaData[0].age}</div>`);

        // location
        var row = panelDiv.append('div')
            .classed('row', true)            
            .html(`<div class="col-md-4">location: </div><div class="col-md-8">${filteredMetaData[0].location}</div>`);

        // bbtype
        var row = panelDiv.append('div')
            .classed('row', true)            
            .html(`<div class="col-md-4">bbtype: </div><div class="col-md-8">${filteredMetaData[0].bbtype}</div>`);

        // wfreq
        var row = panelDiv.append('div')
            .classed('row', true)            
            .html(`<div class="col-md-4">wfreq: </div><div class="col-md-8">${filteredMetaData[0].wfreq}</div>`);

        // store the hand washing frequency for the gauge
        var wfreq = filteredMetaData[0].wfreq;

        // console.log(wfreq)


        var traceG = {
            domain: { 
                x: [0, 1], 
                y: [0, 1] },
            value: wfreq,
            title: { 
                text: "Belly Button Washin Frequency" 
            },
            subtitle: {
                text: "Scrubs per Week"
            },
            gauge: { 
                bar: {
                    color: 'black'
                },
                axis: { 
                    
                    // limit the gauge to 9 washes per week
                    range: [0, 9],
                    tickmode: 'array',
                    tickvals: [0,1,2,3,4,5,6,7,8,9],
                    ticktext: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
                    ticks: 'outside'
                },
                steps: [
                    {
                        range: [0, 1],
                        color: 'lightyellow'
                    },
                    {
                        range: [1, 2],
                        color: 'yellow'
                    },
                    {
                        range: [2, 3],
                        color: 'gold'
                    },
                    {
                        range: [3, 4],
                        color: 'khaki'
                    },
                    {
                        range: [4, 5],
                        color: 'tan'
                    },
                    {
                        range: [5, 6],
                        color: 'lightgreen'
                    },
                    {
                        range: [6, 7],
                        color: 'green'
                    },
                    {
                        range: [7, 8],
                        color: 'darkgreen'
                    },
                    {
                        range: [8, 9],
                        color: 'lime'
                    }                    
                ] 
            },
            type: "indicator",
            mode: "gauge+number"
        }

        var data = [traceG];
        
        var layout = {
            width: 600, 
            height: 500, 
            margin: { t: 0, b: 0 } 
        };

        // chart the gauge
        Plotly.newPlot('gauge', data, layout);

        // // open the other json file (meta.json)
        // d3.json('../../meta.json').then((importedData) => {

        //     var data2 = importedData;

        //     // setup the gauge div 
        //     var gaugeDiv = d3.select('#gauge')

        //     // empty the html first
        //     gaugeDiv.html('');

        //     var test_index = 0;

        //     // loop through the IDs, if it finds the test subject, then load the gauge, 
        //         //if not, show message that there is no hand washing info for test subject
        //     Object.entries(data2.ID).forEach(([key, value]) => {

        //         // console.log(value)
        //         if (value === test_id) {

        //             // make chart here
                    
        //         }

        //     })
            
        //     if (test_index === 0) {

        //         // message that there is no info for test subject
        //         var msgDiv = gaugeDiv.append('div').classed('well', true).text(`There is no hand washing information for test subject: ${test_id}`);

        //     }

        // })
    })
}


